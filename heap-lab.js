class BinaryHeap {
  constructor() {
    this.heap = []; // [10, 5, 6, 2, 3], this.heap[0] = 10
  }

  // Index helpers
  _parentIdx(i) { return Math.floor((i - 1) / 2); }
  _leftIdx(i)   { return 2 * i + 1; }
  _rightIdx(i)  { return 2 * i + 2; }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Insert a value and bubble up to restore heap property
  push(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parentIndex = this._parentIdx(i); // 4
      if (this.heap[parentIndex] > this.heap[i]) { // if (10 > 20)
        this._swap(parentIndex, i);
        i = parentIndex;
      } else {
        break;
      }
    }
  }

  // Remove and return the root (minimum), then restore heap property
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._sinkDown(0);
    return minValue;
  }

  _sinkDown(i) {

    //i = 0
    const length = this.heap.length;
    while (true) {
      const leftIndex  = this._leftIdx(i);
      const rightIndex = this._rightIdx(i);
      let smallestIndex = i;

      if (leftIndex < length && this.heap[leftIndex] < this.heap[smallestIndex]) {
        smallestIndex = leftIndex;
      }
      if (rightIndex < length && this.heap[rightIndex] < this.heap[smallestIndex]) {
        smallestIndex = rightIndex;
      }

      if (smallestIndex !== i) {
        this._swap(i, smallestIndex);
        i = smallestIndex;
      } else {
        break;
      }
    }
  }

  // Return the root without removing it
  peek() {
    return (this.heap.length > 0) ? this.heap[0] : null;
  }

  size() { return this.heap.length; }
}

// Priority Queue backed by BinaryHeap

class PriorityQueue {
  constructor() {
    this._heap = new BinaryHeap();
  }

  enqueue(value) { this._heap.push(value); }
  dequeue()      { return this._heap.pop(); }
  peek()         { return this._heap.peek(); }
  size()         { return this._heap.size(); }
}

//==========VS==========//


// JS Naive Sorted Array Queue

class SortedArrayQueue {
  constructor() {
    this._data = [];
  }

  // Insert and keep array sorted (ascending — smallest first)
  enqueue(value) {
    this._data.push(value);
    this._data.sort((a, b) => a - b);
  }

  // Remove from the front (smallest element)
  dequeue() {
    return this._data.length > 0 ? this._data.shift() : null;
  }

  peek() {
    return this._data.length > 0 ? this._data[0] : null;
  }

  size() { return this._data.length; }
}


// ============================================================
// Performance Comparison

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function benchmark(label, QueueClass, n) {
  const q = new QueueClass();

  console.time(`${label} - enqueue ${n}`);
  for (let i = 0; i < n; i++) {
    q.enqueue(randomInt(1_000_000));
  }
  console.timeEnd(`${label} - enqueue ${n}`);

  console.time(`${label} - dequeue ${n}`);
  while (q.size() > 0) {
    q.dequeue();
  }
  console.timeEnd(`${label} - dequeue ${n}`);
}

const sizes = [1000, 5000, 10000];

console.log("=".repeat(55));
console.log(" Binary Heap vs Sorted Array — Performance Benchmark");
console.log("=".repeat(55));

for (const n of sizes) {
  console.log(`\n--- n = ${n} ---`);
  benchmark("  PriorityQueue (Heap)  ", PriorityQueue,     n);
  benchmark("  SortedArrayQueue      ", SortedArrayQueue,  n);
}

console.log("\n" + "=".repeat(55));
console.log(" Complexity reminder:");
console.log("   BinaryHeap  push/pop : O(log n)");
console.log("   SortedArray enqueue  : O(n log n)  [sort]");
console.log("   SortedArray dequeue  : O(n)         [shift]");
console.log("=".repeat(55));
