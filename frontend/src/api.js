const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787';

export async function analyzeScreenshot({ base64, mediaType }) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: base64, mediaType }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}
