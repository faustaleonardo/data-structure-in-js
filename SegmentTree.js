class SegmentTree {
  constructor(arr) {
    this.arr = arr;
    this.tree = new Array(4 * arr.length); // Assuming a complete binary tree, 4 times the array length should be sufficient
    this.build(1, 0, arr.length - 1);
  }

  build(node, start, end) {
    if (start === end) {
      this.tree[node] = this.arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node;
      const rightChild = 2 * node + 1;

      this.build(leftChild, start, mid);
      this.build(rightChild, mid + 1, end);

      // Modify this line based on the specific use case (sum, min, max, etc.)
      this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }
  }

  update(index, value) {
    this._update(1, 0, this.arr.length - 1, index, value);
  }

  _update(node, start, end, index, value) {
    if (start === end) {
      this.arr[index] = value;
      this.tree[node] = value;
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node;
      const rightChild = 2 * node + 1;

      if (index >= start && index <= mid) {
        this._update(leftChild, start, mid, index, value);
      } else {
        this._update(rightChild, mid + 1, end, index, value);
      }

      // Modify this line based on the specific use case (sum, min, max, etc.)
      this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }
  }

  query(left, right) {
    return this._query(1, 0, this.arr.length - 1, left, right);
  }

  _query(node, start, end, left, right) {
    if (right < start || left > end) {
      return 0; // Modify this line based on the specific use case (0 for sum, Infinity for min, -Infinity for max, etc.)
    } else if (left <= start && right >= end) {
      return this.tree[node];
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node;
      const rightChild = 2 * node + 1;

      const leftSum = this._query(leftChild, start, mid, left, right);
      const rightSum = this._query(rightChild, mid + 1, end, left, right);

      // Modify this line based on the specific use case (sum, min, max, etc.)
      return leftSum + rightSum;
    }
  }
}
