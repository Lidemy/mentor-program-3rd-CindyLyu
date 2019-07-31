class Stack {
  constructor() {
    this.content = [];
  }

  push(n) {
    this.content.unshift(n);
  }

  pop() {
    return this.content.shift();
  }
}


class Queue extends Stack {
  push(n) {
    this.content.splice(this.content.length, 0, n);
  }
}
