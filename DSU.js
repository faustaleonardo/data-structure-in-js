class DSU {
  constructor(n) {
    this.parent = new Array(n).fill();
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }

    return this.parent[x];
  }

  union(x, y) {
    this.parent[this.find(x)] = this.parent[this.find(y)];
  }
}
