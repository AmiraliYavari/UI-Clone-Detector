import OpenAI from 'openai';

/**
 * Each provider exposes an OpenAI-compatible chat.completions.create() client.
 * Only the baseURL, apiKey and default vision model differ between them.
 */
export const PROVIDERS = {
  openai: {
    label: 'OpenAI (GPT-4o)',
    apiKeyEnv: 'OPENAI_API_KEY',
    baseURL: undefined, // default OpenAI endpoint
    model: 'gpt-4o',
  },
  zai: {
    label: 'Z.AI (GLM-4.6V)',
    apiKeyEnv: 'ZAI_API_KEY',
    baseURL: 'https://api.z.ai/api/paas/v4',
    model: 'glm-4.6v',
  },
  anthropic: {
    label: 'Anthropic (Claude Sonnet)',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
    // Anthropic's OpenAI-compatible surface
    baseURL: 'https://api.anthropic.com/v1',
    model: 'claude-sonnet-4-6',
  },
  gemini: {
  label: 'Google Gemini',
  apiKeyEnv: 'GEMINI_API_KEY',
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  model: 'gemini-2.0-flash',
  },
};

export function availableProviders() {
  return Object.entries(PROVIDERS)
    .filter(([, cfg]) => !!process.env[cfg.apiKeyEnv])
    .map(([id, cfg]) => ({ id, label: cfg.label, model: cfg.model }));
}

export function getClient(providerId) {
  const cfg = PROVIDERS[providerId];
  if (!cfg) throw new Error(`Unknown provider: ${providerId}`);
  const apiKey = process.env[cfg.apiKeyEnv];
  if (!apiKey) throw new Error(`${cfg.label} is not configured — missing ${cfg.apiKeyEnv} in .env`);
  return {
    client: new OpenAI({ apiKey, baseURL: cfg.baseURL }),
    model: cfg.model,
    label: cfg.label,
  };
}