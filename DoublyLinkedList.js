class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setToHead(node) {
    if (node === this.head) {
      return;
    }

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else if (this.head === this.tail) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      if (node === this.tail) {
        this.removeTail();
      }

      node.removeBindings();
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  removeTail() {
    if (this.tail === null) {
      return;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }
}

class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  removeBindings() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
    this.prev = null;
    this.next = null;
  }
}
