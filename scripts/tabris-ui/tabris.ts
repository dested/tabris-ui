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
        if(!composite){
            throw ('cannot append to null widget')
        }
        composite.append(this);
    }
    insertAfter(widget: Widget) {
        if(!widget){
            throw ('cannot insert after null widget')
        }
        // this.children.push(widget);
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
        if(!widget){
            throw ('cannot append null widget')
        }

        this.children.push(widget);
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