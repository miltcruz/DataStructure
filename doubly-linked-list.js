/*
    Create a Node structure that stores a value, a reference to the next node, and a reference to the previous node.
Create a DoublyLinkedList class that keeps track of the head, tail, and length of the list.
Implement a method to add a value to the front of the list.
Implement a method to add a value to the end of the list.
Implement a method to remove a value from the front of the list.
Implement a method to remove a value from the end of the list.
*/

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    prepend(value) {
        const newNode = new Node(value); // newNode = { value: value, next: null, prev: null }
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }   else {  
            newNode.next = this.head; // this.head = { value: value, next: null, prev: newNode }
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    append(value) {
        const newNode = new Node(value); // newNode = { value: value, next: null, prev: null }
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode; // this.tail = { value: value, next: null, prev: null }
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }   

    insertAt(index, value) {
        if (index < 0 || index > this.length) {
            throw new Error("Index out of bounds");
        }
        if (index === 0) {
            this.prepend(value);
            return;
        }
        if (index === this.length) {
            this.append(value);
            return;
        }
        const newNode = new Node(value); // newNode = { value: value, next: null, prev: null }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next; // current = { value: value, next: { value: value, next: null, prev: null }, prev: { value: value, next: null, prev: null }
            console.log('current', current);
        }
        newNode.prev = current.prev; //current.prev = { value: value, next: { value: value, next: null, prev: null }, prev: { value: value, next: null, prev: null } }
        newNode.next = current; // current = { value: value, next: { value: value, next: null, prev: null }, prev: { value: value, next: null, prev: null } }
        console.log('current.prev.next', current.prev.next);
        current.prev.next = newNode;
        current.prev = newNode;
        console.log('current.prev', current.prev);
        this.length++;
    }

    removeFront() {
        if (!this.head) return null;
        const value = this.head.value;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }   
        this.length--;
        return value;
    }

    removeEnd() {
        if (!this.tail) return null;
        const value = this.tail.value;
        this.tail = this.tail.prev;

        if (this.tail) {
            this.tail.next = null;
        } else {
            this.head = null;
        }
        this.length--;
        return value;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    find(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }

            current = current.next;
        }       
        return null;
    }
}

export default DoublyLinkedList;