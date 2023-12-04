class FenwickTree {
  constructor(size) {
    this.size = size;
    this.bit = new Array(size + 1).fill(0);
  }

  // Updates the value at the specified index by adding 'delta'
  update(index, delta) {
    index++; // Convert 0-based index to 1-based index
    while (index <= this.size) {
      this.bit[index] += delta;
      index += index & -index; // Move to the next higher set bit
    }
  }

  // Returns the sum of elements in the range [1, index]
  query(index) {
    index++; // Convert 0-based index to 1-based index
    let sum = 0;
    while (index > 0) {
      sum += this.bit[index];
      index -= index & -index; // Move to the parent
    }
    return sum;
  }

  // Builds the Fenwick Tree based on the input array
  build(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.update(i, arr[i]);
    }
  }
}
