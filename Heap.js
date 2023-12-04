// const maxHeap = new Heap((a, b) => {
//   return a.passRatio > b.passRatio;
// });

class Heap {
  constructor(fn) {
    this.store = [];
    this.fn = fn;
  }

  peek() {
    return this.store[0];
  }

  getLength() {
    return this.store.length;
  }

  remove() {
    if (this.getLength() < 2) {
      return this.store.pop();
    }
    const result = this.store[0];
    this.store[0] = this.store.pop();
    this.siftDown(0);
    return result;
  }

  insert(val) {
    this.store.push(val);
    this.siftUp(this.getLength() - 1);
  }

  siftUp(child) {
    while (child) {
      const parent = Math.floor((child - 1) / 2);

      if (this.shouldSwap(child, parent)) {
        [this.store[child], this.store[parent]] = [
          this.store[parent],
          this.store[child],
        ];
        child = parent;
      } else {
        return child;
      }
    }
  }

  siftDown(parent) {
    while (true) {
      let [child, child2] = [1, 2]
        .map((x) => parent * 2 + x)
        .filter((x) => x < this.getLength());
      if (this.shouldSwap(child2, child)) {
        child = child2;
      }

      if (this.shouldSwap(child, parent)) {
        [this.store[child], this.store[parent]] = [
          this.store[parent],
          this.store[child],
        ];
        parent = child;
      } else {
        return parent;
      }
    }
  }

  shouldSwap(child, parent) {
    return child && this.fn(this.store[child], this.store[parent]);
  }
}
