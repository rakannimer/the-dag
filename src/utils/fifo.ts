export class FifoNode<T> {
  prev: FifoNode<T>;
  next: FifoNode<T>;
  value: T;
  list: FIFO<T>;
  constructor(list: FIFO<T>, val: T) {
    this.prev = this;
    this.next = this;
    this.value = val;
    this.list = list;
  }
  link = next => {
    this.next = next;
    next.prev = this;
    return next;
  };
}

export class FIFO<T> {
  node: null | FifoNode<T> = null;
  length = 0;

  set = (node, value) => {
    if (!node || node.list !== this) return null;
    node.value = value;
    return node;
  };
  next = node => {
    if (!node) return this.node;
    return node.next === this.node ? null : node.next;
  };

  prev = node => {
    if (!node) return this.node;
    return node === this.node ? null : node.prev;
  };
  get = node => {
    if (!node || node.list !== this) return null;
    return node.value;
  };
  remove = node => {
    if (!node || node.list !== this) return null;
    this.length -= 1;
    node.list = null;
    node.prev.link(node.next);
    if (node === this.node) this.node = node.next === node ? null : node.next;
    return node.link(node).value;
  };
  unshift = value => {
    this.node = this.push(value);
    return this.node;
  };
  push = value => {
    return this.add(new FifoNode(this, value));
  };
  bump = node => {
    if (node.list !== this) return false;
    this.remove(node);
    this.add(node);
    return true;
  };
  add = node => {
    this.length++;
    if (!node.list) node.list = this;
    if (!this.node) return (this.node = node);
    this.node.prev.link(node);
    node.link(this.node);
    return node;
  };

  first = () => {
    return this.node && this.node.value;
  };
  last = () => {
    return this.node && this.node.prev.value;
  };
  shift = () => {
    return this.node && this.remove(this.node);
  };
  pop = () => {
    return this.node && this.remove(this.node.prev);
  };
  isEmpty = () => {
    return this.length === 0 || this.node === null;
  };
  removeAll = () => {
    if (this.length !== 0 && this.node !== null) {
      this.length = 0;
      this.node = null;
    }
  };
  forEach = fn => {
    for (var node = this.node; node; node = this.next(node)) {
      fn(node.value, node);
    }
  };
  toArray = () => {
    let list = [];
    for (let node = this.node; node; node = this.next(node)) {
      list.push(node.value);
    }
    return list;
  };
}
