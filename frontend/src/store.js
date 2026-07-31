const KEY = 'ui-cloner-history';

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveToHistory(entry) {
  const list = getHistory();
  const withId = { ...entry, id: crypto.randomUUID(), createdAt: Date.now() };
  const next = [withId, ...list].slice(0, 20); // cap history
  localStorage.setItem(KEY, JSON.stringify(next));
  return withId;
}

export function getById(id) {
  return getHistory().find((e) => e.id === id) || null;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
