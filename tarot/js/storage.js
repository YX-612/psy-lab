/**
 * 本地存储 — 占卜历史
 */
const STORAGE_KEY = 'mystic_tarot_history';
const MAX_HISTORY = 50;

const TarotStorage = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save(record) {
    const history = this.getAll();
    history.unshift({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toISOString(),
      ...record
    });
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    return history;
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },

  formatDate(iso) {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
};

if (typeof module !== 'undefined') module.exports = { TarotStorage };
