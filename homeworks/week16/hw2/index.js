class Stack {
  constructor() {
    this.content = '';
  }

  push(n) {
    this.content = `${n}-${this.content}`;
  }

  pop() {
    const cutOffPoint = this.content.indexOf('-');
    let result = '';
    for (let i = 0; i < cutOffPoint; i += 1) {
      result += this.content[i];
    }
    const replaceContent = `${result}-`;
    this.content = this.content.replace(replaceContent, '');
    return result;
  }
}


class Queue extends Stack {
  push(n) {
    this.content = `${this.content}${n.toString()}-`;
  }
}
