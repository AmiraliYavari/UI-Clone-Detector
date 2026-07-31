import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { availableProviders, getClient, PROVIDERS } from './providers.js';

const app = express();
const PORT = process.env.PORT || 8787;
const ORIGINS = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',');
const DEFAULT_PROVIDER = process.env.DEFAULT_PROVIDER || 'openai';

app.use(cors({ origin: ORIGINS }));
app.use(express.json({ limit: '15mb' })); // screenshots as base64 can be a few MB

const configured = availableProviders();
if (configured.length === 0) {
  console.warn('[warn] No provider API keys are set. Copy .env.example to .env and add at least one key.');
} else {
  console.log('[info] Available providers:', configured.map((p) => p.id).join(', '));
}

const SYSTEM_PROMPT = `You are an expert frontend engineer specialized in pixel-accurate UI cloning.
You will be given a screenshot of a UI (often GitHub-style).
Analyze it carefully: layout structure, spacing, colors (as hex), typography, icons, borders, states.
Then produce a SINGLE self-contained React function component named App (no imports, JSX is fine — it will be compiled client-side with Babel standalone) that recreates the UI as closely as possible. All CSS must be returned separately as raw CSS (no <style> tag), targeting plain class selectors used in the JSX. Do not use Tailwind or any external UI library. Use system-ui / -apple-system font stacks.

Respond ONLY with a raw JSON object (no markdown fences, no prose before or after) with this exact shape:
{
  "analysis": "short paragraph in Persian describing what you see: layout, colors, components, spacing patterns",
  "jsx": "the full JSX source of the React function component as a single string, starting with 'function App() {' and ending with '}'",
  "css": "all CSS rules as a single raw string (no <style> tags)"
}
The jsx field must NOT include a <style> tag. Keep class names in jsx consistent with selectors in css. Ensure jsx is valid and compiles with Babel standalone.`;

// Lets the frontend build a provider picker, showing only providers that actually have a key configured
app.get('/api/providers', (_req, res) => {
  res.json({ providers: availableProviders(), default: DEFAULT_PROVIDER });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { imageBase64, mediaType, provider } = req.body || {};
    if (!imageBase64 || !mediaType) {
      return res.status(400).json({ error: 'imageBase64 and mediaType are required' });
    }

    const providerId = provider && PROVIDERS[provider] ? provider : DEFAULT_PROVIDER;
    const { client, model, label } = getClient(providerId);

    const completion = await client.chat.completions.create({
      model,
      max_tokens: 8000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mediaType};base64,${imageBase64}` },
            },
            {
              type: 'text',
              text: 'این اسکرین‌شات رو تحلیل کن و طبق فرمت JSON خواسته‌شده، کد UI معادلش رو تولید کن.',
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error(`No text response from ${label}`);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      throw new Error(`${label} did not return valid JSON`);
    }

    res.json({ ...parsed, provider: providerId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`UI Cloner backend running on http://localhost:${PORT}`);
});