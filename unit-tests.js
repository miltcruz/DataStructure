/*
Write minimal “unit-like” tests with console.assert that cover happy paths and a couple of edge cases:
Stack: push multiple items, check size, peek, LIFO order with pop, and empty behavior.
Queue: enqueue until full, verify isFull, then dequeue to verify FIFO order, wrap-around behavior, and empty behavior.
Include a few negative checks (for example, dequeueing from an empty queue returns undefined or a clear sentinel).
Create a small naïve queue demo using a plain array with push and shift to contrast with your ring buffer queue. Use it only for the benchmark in the next step.
Benchmark array push vs. unshift for a large n to visualize O(1) vs. O(n):
Choose a large n (for example, 100000).
Measure with console.time("push") and console.timeEnd("push") while pushing n items into an empty array.
Measure with console.time("unshift") and console.timeEnd("unshift") while unshifting n items into an empty array.
Log brief notes explaining why unshift is typically slower for large n.
In the end, print a short summary to the console describing:
Which operations in your stack and queue are expected to be O(1).
Why the ring buffer avoids the cost of shift and unshift.
Your measured times for push vs. unshift on your machine.
Run the code in VS Code Terminal, and verify that all console.assert checks pass and that benchmark timings are printed.
*/

import Stack from "./stack.js";
import Queue from "./queue.js";

// Stack tests
const stack = new Stack();
stack.push(1);  
stack.push(2);
stack.push(3);
console.log("Stack.", stack);
console.assert(stack.size() === 3, "Stack size should be 3");
console.assert(stack.peek() === 3, "Top item should be 3");
console.assert(stack.pop() === 3, "Popped item should be 3");
console.assert(stack.pop() === 2, "Popped item should be 2");
console.assert(stack.pop() === 1, "Popped item should be 1");
console.assert(stack.isEmpty(), "Stack should be empty");
try {
    stack.pop();
} catch (e) {
    console.assert(e.message === "Stack is empty", "Popping from empty stack should throw error");
}   

// Queue tests
const queue = new Queue(3);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log("Queue.", queue);
console.log("Queue front.", queue.front());
console.assert(queue.isFull(), "Queue should be full");
console.assert(queue.dequeue() === 1, "Dequeued item should be 1");
console.assert(queue.dequeue() === 2, "Dequeued item should be 2");
console.assert(queue.dequeue() === 3, "Dequeued item should be 3");
console.assert(queue.isEmpty(), "Queue should be empty");
try {
    queue.dequeue();
} catch (e) {
    console.assert(e.message === "Queue is empty", "Dequeuing from empty queue should throw error");
}

// Naïve queue demo
const naiveQueue = [];
naiveQueue.push(1);
naiveQueue.push(2);
naiveQueue.push(3);
console.assert(naiveQueue.shift() === 1, "Shifted item should be 1");
console.assert(naiveQueue.shift() === 2, "Shifted item should be 2");
console.assert(naiveQueue.shift() === 3, "Shifted item should be 3");

// Benchmark push vs. unshift
const n = 100000;
const pushArray = [];
console.time("push");

for (let i = 0; i < n; i++) {
    pushArray.push(i);
}   
console.timeEnd("push");

console.time("unshift");    

const unshiftArray = [];
for (let i = 0; i < n; i++) {
    unshiftArray.unshift(i);
}

console.timeEnd("unshift");
console.log("Unshift is typically slower for large n because it requires shifting all existing elements in the array to accommodate the new item at the front, resulting in O(n) time complexity, while push simply adds to the end of the array in O(1) time.");
console.log("Summary:");
console.log("Stack operations push, pop, peek, size, and isEmpty are expected to be O(1).");
console.log("Queue operations enqueue, dequeue, front, size, isEmpty, and isFull are expected to be O(1).");
console.log("The ring buffer avoids the cost of shift and unshift by using circular indexing to manage the head and tail positions without needing to move elements in the array.");
