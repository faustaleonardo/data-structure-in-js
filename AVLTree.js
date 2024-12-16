class AVLTreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.size = 1; // number of nodes in tree rooted at this node
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }
  search(val, node = this.root) {
    if (!node) return null;
    if (node.val === val) return node;
    if (val < node.val) {
      return this.search(val, node.left);
    } else {
      return this.search(val, node.right);
    }
  }
  insert(val) {
    return (this.root = this._insert(val, this.root));
  }
  _insert(val, node) {
    if (!node) return new AVLTreeNode(val);
    if (val < node.val) {
      node.left = this._insert(val, node.left);
    } else {
      node.right = this._insert(val, node.right);
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }
  remove(val, node = this.root) {
    // To ensure we don't delete all occurances of `val`, pass in the reference of one occurance.
    // To delete all nodes with value `val`, remove the check for `nodeToRemove` in _remove.
    const nodeToRemove = this.search(val, node);
    return (this.root = this._remove(val, nodeToRemove, node));
  }
  // Four scenarios for deletion:
  // 1. node to delete has no children - just delete it
  // 2. node to delete only has a left child - replace it with the left child
  // 3. node to delete only has a right child - replace it with the right child
  // 4. node to delete has both left and right children - replace it with the next smallest node that is larger (use in order traversal to find the leftmost node in the right child)
  _remove(val, nodeToRemove, node) {
    if (!node) return null;
    if (val < node.val) {
      node.left = this._remove(val, nodeToRemove, node.left);
    } else if (val > node.val) {
      node.right = this._remove(val, nodeToRemove, node.right);
    } else if (val === node.val && node === nodeToRemove) {
      if (!node.left && !node.right) return null;
      if (!node.right) return node.left;
      if (!node.left) return node.right;

      // has both left and right children
      // inorder traversal on the right child to get the leftmost node
      // replace the node value with the leftmost node value and remove the leftmost node from the right subtree
      const leftmostNode = this._getLeftmost(node.right);
      node.val = leftmostNode.val;

      node.right = this._remove(
        leftmostNode.val,
        this.search(leftmostNode.val, node.right),
        node.right
      );
    } else {
      return node;
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }
  countGreater(val, node = this.root) {
    if (!node) return 0;

    if (node.val > val) {
      return 1 + this.getSize(node.right) + this.countGreater(val, node.left);
    } else {
      return this.countGreater(val, node.right);
    }
  }
  _getLeftmost(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  _getHeight(node = this.root) {
    return node ? node.height : 0;
  }
  getSize(node = this.root) {
    return node ? node.size : 0;
  }
  _getBalance(node = this.root) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }
  _leftRotation(node) {
    let rightNode = node.right;
    let rightNodeLeftChild = rightNode.left;
    rightNode.left = node;
    node.right = rightNodeLeftChild;

    // node is now below rightNode and needs to be updated first
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    rightNode.height =
      1 +
      Math.max(
        this._getHeight(rightNode.left),
        this._getHeight(rightNode.right)
      );

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    rightNode.size =
      1 + this.getSize(rightNode.left) + this.getSize(rightNode.right);

    return rightNode; // right node is the new root
  }
  _rightRotation(node) {
    let leftNode = node.left;
    let leftNodeRightChild = leftNode.right;
    leftNode.right = node;
    node.left = leftNodeRightChild;

    // node is now below leftNode and needs to be updated first
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    leftNode.height =
      1 +
      Math.max(this._getHeight(leftNode.left), this._getHeight(leftNode.right));

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    leftNode.size =
      1 + this.getSize(leftNode.left) + this.getSize(leftNode.right);

    return leftNode; // left node is the new root
  }
  _rebalance(node) {
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) {
      // left left
      return this._rightRotation(node);
    } else if (balance > 1 && this._getBalance(node.left) < 0) {
      // left right
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) <= 0) {
      // right right
      return this._leftRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) > 0) {
      // right left
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }
    return node;
  }
}
