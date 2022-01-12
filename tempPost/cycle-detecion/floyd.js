class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }

    push(val) {
        this.next ? this.next.push(val) : this.next = new ListNode(val);
    }
}

function isCyclic(head) {
    let slower = head, faster = head;
    let flag = false;

    while (slower && faster && faster.next) {
        slower = slower.next;
        faster = faster.next.next;

        if (slower === faster) {
            flag = true;
            break;
        }
    }
    return flag;
}


const list = new ListNode('e0');
list.push('e1');
list.push('e2');
list.push('e3');
list.push('e4');
list.push('e5');
list.next.next.next.next.next.next = list.next.next;

console.log(detectCycle(list));