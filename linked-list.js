/*
Implement the following methods in your SinglyLinkedList:
prepend(value) – add a value to the front of the list
append(value) – add a value to the end of the list
insertAt(index, value) – insert a value at a specific position
removeAt(index) – remove a value at a specific position
find(predicate or value) – locate a node in the list
*/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }   
    prepend(value) {
        const newNode = new Node(value);  // newNode = { value: value, next: null }
        // newNode.next = null;
        newNode.next = this.head;
        // this.head = { value: value, next: null }
        this.head = newNode;
        this.size++;
    }
    append(value) {
        const newNode = new Node(value); // newNode = { value: value, next: null }
        if (!this.head) {
            // this.head = { value: value, next: null }
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode; // current.next = { value: value, next: null }
        }
        this.size++;
    }   
    insertAt(index, value) {
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }
        if (index === 0) {
            this.prepend(value);
            return;
        }   
        const newNode = new Node(value);  // newNode = { value: value, next: null }
        let current = this.head; // return { value: value, next: null }
        let previous = null;
        let currentIndex = 0;
        while (currentIndex < index) {
            previous = current;
            current = current.next; // return { value: value, next: null }
            currentIndex++;
        }
        previous.next = newNode;
        newNode.next = current;
        this.size++;
    }
    removeAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        if (index === 0) {
            this.head = this.head.next;
        }   else {
            let current = this.head;
            let previous = null;
            let currentIndex = 0;   
            while (currentIndex < index) {
                previous = current;
                current = current.next;
                currentIndex++;
            }
            previous.next = current.next;
        }
        this.size--;
    }   
    find(predicate) {
        let current = this.head;
        while (current) {
            if (typeof predicate === 'function' ? predicate(current.value) : current.value === predicate) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}