const fs = require("fs");
const path = require("path");
const os = require("os");

const CONFIG_DIR = path.join(os.homedir(), ".payflow");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");
const CACHE_FILE = path.join(CONFIG_DIR, "cache.json");

function ensureDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

function getConfig() {
  ensureDir();
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function saveConfig(config) {
  ensureDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({ ...getConfig(), ...config, updatedAt: new Date().toISOString() }, null, 2));
}

function getCache(key) {
  ensureDir();
  try {
    const cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    const entry = cache[key];
    if (entry && entry.expiresAt > Date.now()) {
      return entry.data;
    }
  } catch {}
  return null;
}

function setCache(key, data, ttlMs = 300000) {
  ensureDir();
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8")); } catch {}
  cache[key] = { data, expiresAt: Date.now() + ttlMs };
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

module.exports = { getConfig, saveConfig, getCache, setCache, CONFIG_DIR };
