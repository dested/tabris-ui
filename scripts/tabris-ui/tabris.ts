export class Widget {

    constructor(options: any) {
    }

    on(key: string, callback: () => void) {
    }

    off(key: string, callback: () => void) {
    }

    set(key: string, value: any) {

    }

    get(key: string): any {

    }

    appendTo(composite: Composite) {
        composite.append(this);
    }
    isDisposed() {
        return false;
    }
    dispose() {
    }

    debug(indent: number) {
        console.log('\t'.repeat(indent) + this.constructor.name);
    }
}


export class TextView extends Widget {
    constructor(options: any) {
        super(options);
    }
}
export class Composite extends Widget {
    constructor(options: any) {
        super(options);
    }

    children: Widget[] = [];

    append(widget: Widget) {
        this.children.push(widget);
    }

    debug(indent: number) {
        super.debug(indent);
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            child.debug(indent + 1);
        }
    }
}
export class ActivityIndicator extends Widget {
    constructor(options: any) {
        super(options);
    }
}
export class ScrollView extends Composite {
    constructor(options: any) {
        super(options);
    }
}
export class Page extends Composite {
    constructor(options: any) {
        super(options);
    }

    open() {
        console.log('page open')
    }
}