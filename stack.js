/*
Implement a Stack class with the following methods:
push(item) — add to the top
pop() — remove and return the top item
peek() — return the top item without removing it
size() — return the number of items
isEmpty() — return true if empty, otherwise false
Use an internal array and only push/pop for core operation
*/

export default class Stack {   
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}