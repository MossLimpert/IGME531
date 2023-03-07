export class Stack {
    constructor() {
        this.items = [];
        this.lastIndex = 0;
    }
    empty() {
        if (this.items.length == 0) return true;
        else return false;
    }
    push(item) {
        this.items.push[this.lastIndex] = item;
        this.lastIndex++;
    }
    push (position, rotation) {
        let item = {
            position: position,
            rotation: rotation
        }
        this.items.push[this.lastIndex] = item;
        this.lastIndex++;
    }
    pop() {
        if (!this.empty()) {
            let popped = this.items[this.lastIndex - 1];
            this.lastIndex--;
            return popped;
        }
        return {
            position: [0,0],
            rotation: 0
        }
    }
    print() {
        for (let item of this.items) {
            console.log(item);
        }
    }
}