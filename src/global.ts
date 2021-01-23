export {}

declare global {
    interface Element {
        addClass(className: string): Element
        removeClass(className: string): Element
    }
}
Element.prototype.addClass = function(className: string) {
    this.classList.add(className);
    return this;
}

Element.prototype.removeClass = function(className: string) {
    this.classList.remove(className);
    return this;
}