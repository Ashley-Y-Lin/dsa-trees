"use strict";

/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  /** sameParent(): takes as input two nodes, returns boolean for whether they
   * have the same parent
   */
  sameParent(node1, node2) {
    let toVisitStack = [this];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current.left === node1) {
        if (current.right === node2) {
          return true;
        }
      }

      if (current.right === node1) {
        if (current.left === node2) {
          return true;
        }
      }

      if (current.left) {
        toVisitStack.push(current.left);
      }
      if (current.right) {
        toVisitStack.push(current.right);
      }
    }

    return false;
  }

  /** sameDepth(): takes as input two nodes, returns boolean for whether they
   * have the same depth
   */
  sameDepth(node1, node2) {
    let toVisitQueue = [this];
    let nextLayer = [];
    let depth = 1;
    let node1Depth = null;
    let node2Depth = null;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if (current.left === node1) {
        node1Depth = depth;
      } else if (current.left === node2) {
        node2Depth = depth;
      }

      if (current.right === node1) {
        node1Depth = depth;
      } else if (current.right === node2) {
        node2Depth = depth;
      }

      if (current.left) {
        nextLayer.push(current.left);
      }
      if (current.right) {
        nextLayer.push(current.right);
      }

      if (toVisitQueue.length === 0) {
        depth++;
        toVisitQueue = [...nextLayer];
        nextLayer = [];
      }
    }

    if (!node1Depth || !node2Depth) return false;
    return node1Depth === node2Depth;
  }

  /** minDepthToIncompleteNode(): return the minimum depth of the tree to an
   * incomplete node-- that is, the length of the shortest path from the root to
   * a node with less than two children. */

  // Queue: [ [node, depth], [node, depth]... ]


  minDepthToIncompleteNode() {
    let toVisitQueue = [this];
    let nextLayer = [];
    let depth = 1;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if (!(current.left && current.right)) {
        return depth;
      }

      nextLayer.push(current.left);
      nextLayer.push(current.right);

      if (toVisitQueue.length === 0) {
        depth++;
        toVisitQueue = [...nextLayer];
        nextLayer = [];
      }
    }
  }

  /** maxDepth(): return the maximum depth from the invoking node -- that is,
   * the length of the longest path from the invoking node to a leaf. */
  maxDepth() {
    let toVisitQueue = [this];
    let nextLayer = [];
    let maxDepth = 0;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if (current.left) {
        nextLayer.push(current.left);
      }

      if (current.right) {
        nextLayer.push(current.right);
      }

      if (toVisitQueue.length === 0) {
        maxDepth++;
        toVisitQueue = [...nextLayer];
        nextLayer = [];
      }
    }

    return maxDepth;
  }

  /** minDepth(): return the minimum depth from the invoking node -- that is,
   * the length of the shortest path from the invoking node to a leaf. */
  minDepth() {
    let toVisitQueue = [this];
    let nextLayer = [];
    let depth = 1;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if (!(current.left || current.right)) {
        return depth;
      }

      if (current.left) {
        nextLayer.push(current.left);
      }

      if (current.right) {
        nextLayer.push(current.right);
      }

      if (toVisitQueue.length === 0) {
        depth++;
        toVisitQueue = [...nextLayer];
        nextLayer = [];
      }
    }
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepthToIncompleteNode(): return the minimum depth of the tree to an
   * incomplete node-- that is, the length of the shortest path from the root to
   * a node with less than two children. */

  // this is a stack or recursion problem; we'll use recursion

  minDepthToIncompleteNode() {
    if (!this.root) return 0;
    return this.root.minDepthToIncompleteNode();
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  // this is a stack or recursion problem; we'll use recursion

  maxDepth() {
    if (!this.root) return 0;
    return this.root.maxDepth();
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  // this is a stack or recursion problem; we'll use recursion

  minDepth() {
    if (!this.root) return 0;
    return this.root.minDepth();
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  //TODO: ask why this wasn't in the node

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let toVisitQueue = [this.root];
    let lowestLarger = Infinity;

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if ((current.val > lowerBound) && (current.val < lowestLarger)) {
        lowestLarger = current.val;
      }

      if (current.left) {
        toVisitQueue.push(current.left);
      }
      if (current.right) {
        toVisitQueue.push(current.right);
      }
    }

    return (lowestLarger === Infinity) ? null : lowestLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const sameParent = this.root.sameParent(node1, node2);
    const sameDepth = this.root.sameDepth(node1, node2);

    return (!sameParent && sameDepth);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
