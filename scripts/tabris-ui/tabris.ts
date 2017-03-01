export class Widget {
    element: HTMLDivElement;
    parent: Composite;

    constructor(public options: any) {
        this.element = document.createElement('div');
    }

    on(key: string, callback: () => void) {
        switch (key) {
            case 'tap':
                this.element.onclick = () => {
                    callback();
                };
                break;
        }
    }

    off(key: string, callback: () => void) {
    }

    set(key: string, value: any) {

    }

    get(key: string): any {

    }

    appendTo(composite: Composite) {
        if (!composite) {
            throw ('cannot append to null widget')
        }
        composite.append(this);
    }

    insertAfter(widget: Widget) {
        if (!widget) {
            throw ('cannot insert after null widget')
        }
        // this.children.push(widget);
    }

    isDisposed() {
        return false;
    }

    dispose() {
    }

    resize(){
        this.element.style.position = 'absolute';
        if (this.options.left) {
            this.element.style.left = `${this.options.left}px`;
        }
        if (this.options.width) {
            this.element.style.width = `${this.options.width}px`;
        }
        if (this.options.right) {
            this.element.style.right = `${Page.width - this.options.right}px`;
        }
        if (this.options.centerX) {
            this.element.style.left = `${this.options.left}px`;
        }

        if (this.options.top) {
            this.element.style.top = `${this.options.top}px`;
        }
        if (this.options.height) {
            this.element.style.height = `${this.options.height}px`;
        }
        if (this.options.bottom) {
            this.element.style.height = `${Page.height - this.options.bottom}px`;
        }

        if (this.options.background) {
            this.element.style.backgroundColor = this.options.background;
        }

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
        if (!widget) {
            throw ('cannot append null widget')
        }

        widget.parent = this;
        this.children.push(widget);
        this.element.append(this.element);
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
export class TabFolder extends Composite {
    constructor(options: any) {
        super(options);
    }
}
export class Tab extends Composite {
    constructor(options: any) {
        super(options);
    }
}
export class ImageView extends Widget {
    constructor(options: any) {
        super(options);
    }
}
export class Page extends Composite {
    static width = 300;
    static height = 480;

    constructor(options: any) {
        super(options);
        this.element.style.width = `${Page.width}px`;
        this.element.style.height = `${Page.height}px`;
        this.element.style.backgroundColor = 'red';
    }


    open() {
        document.body.appendChild(this.element);
        console.log('page open')
    }
}