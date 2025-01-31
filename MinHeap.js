class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  getLength() {
    return this.heap.length;
  }

  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let i = firstParentIdx; i >= 0; i--) {
      this.siftDown(array, i, array.length - 1);
    }
    return array;
  }

  peek() {
    return this.heap[0];
  }

  siftUp(array, startIdx) {
    let idx = startIdx !== undefined ? startIdx : array.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0) {
      if (array[idx] < array[parentIdx]) {
        this.swap(array, idx, parentIdx);
        idx = parentIdx;
        parentIdx = Math.floor((idx - 1) / 2);
      } else {
        break;
      }
    }
  }

  insert(num) {
    this.heap.push(num);
    this.siftUp(this.heap, this.heap.length - 1);
  }

  siftDown(array, idx, endIdx) {
    let leftChildIdx = idx * 2 + 1;
    while (leftChildIdx <= endIdx) {
      let idxToSwap = leftChildIdx;
      let rightChildIdx = idx * 2 + 2;
      if (
        rightChildIdx <= endIdx &&
        array[rightChildIdx] < array[leftChildIdx]
      ) {
        idxToSwap = rightChildIdx;
      }
      if (array[idxToSwap] < array[idx]) {
        this.swap(array, idxToSwap, idx);
        idx = idxToSwap;
        leftChildIdx = idx * 2 + 1;
      } else {
        break;
      }
    }
  }

  remove() {
    const valueToRemove = this.heap[0];
    this.swap(this.heap, 0, this.heap.length - 1);
    this.heap.pop();
    this.siftDown(this.heap, 0, this.heap.length - 1);
    return valueToRemove;
  }

  delete(value) {
    const index = this.heap.indexOf(value);
    if (index === -1) return false;

    const lastIdx = this.heap.length - 1;
    this.swap(this.heap, index, lastIdx);
    this.heap.pop();

    if (index < this.heap.length) {
      this.siftUp(this.heap, index);
      this.siftDown(this.heap, index, this.heap.length - 1);
    }

    return true;
  }

  swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
