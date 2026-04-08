/*Implement a Queue using a ring buffer:
Constructor accepts a positive integer capacity.
Maintain head, tail, count, and an internal array of fixed length capacity.
enqueue(item) — add at tail and wrap with modulo arithmetic.
dequeue() — remove from head and wrap with modulo arithmetic.
front(), size(), isEmpty(), isFull()
Do not use shift or unshift in the queue; use the circular indexing logic.
 */

export default class Queue {
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("Capacity must be a positive integer");
        }
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }

    enqueue(item) {
        if (this.isFull()) {
            throw new Error("Queue is full");
        }
        this.items[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }   
        const item = this.items[this.head];
        this.head = (this.head + 1) % this.capacity;
        this.count--;
        return item;
    }   

    front() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[this.head];
    }

    size() {
        return this.count;
    }

    isEmpty() { 
        return this.count === 0;
    }

    isFull() {
        return this.count === this.capacity;
    }       
}