class HashTable {
  constructor(size = 53) {
    this.buckets = new Array(size);
    this.size = size;
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * (i + 1)) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    const bucket = this.buckets[index];
    const existing = bucket.find(pair => pair[0] === key);
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return null;
    const pair = bucket.find(pair => pair[0] === key);
    return pair ? pair[1] : null;
  }

  has(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;
    return bucket.some(pair => pair[0] === key);
  }

  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;
    const pairIndex = bucket.findIndex(pair => pair[0] === key);
    if (pairIndex === -1) return false;
    bucket.splice(pairIndex, 1);
    return true;
  }
}
