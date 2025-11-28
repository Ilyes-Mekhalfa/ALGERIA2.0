const blacklisted = new Map();

// Add token to blacklist with expiry timestamp (in seconds)
export function addToBlacklist(token, ttlSeconds) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  blacklisted.set(token, expiresAt);
}

export function isBlacklisted(token) {
  if (!token) return false;
  const expiresAt = blacklisted.get(token);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    blacklisted.delete(token);
    return false;
  }
  return true;
}

// Periodic cleanup to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [token, expiresAt] of blacklisted) {
    if (now > expiresAt) blacklisted.delete(token);
  }
}, 60 * 1000).unref();

export default { addToBlacklist, isBlacklisted };
