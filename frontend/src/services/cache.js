const cache = new Map();

export function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  const [value, expiresAt] = entry;
  if (Date.now() > expiresAt) {
    cache.delete(key);
    return null;
  }
  return value;
}

export function setCached(key, value, ttl = 1000 * 60 * 3) {
  cache.set(key, [value, Date.now() + ttl]);
}

export function clearCache(key) {
  if (key) cache.delete(key);
  else cache.clear();
}
