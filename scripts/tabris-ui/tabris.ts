export class Widget {
    element: HTMLElement;
    parent: Composite;

    constructor(public options: IWidgetOptions, elementType: string = 'div') {
        this.element = document.createElement(elementType);
        this.element.className = this.constructor.name;
        this.element.id = options.id;
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
        this.options[key] = value;
    }

    get(key: string): any {
        return this.options[key];
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

        let ind = widget.parent.children.indexOf(widget);
        widget.parent.insertAt(this, ind);
    }

    disposed: boolean = false;

    isDisposed() {
        return this.disposed;
    }

    dispose() {
        this.disposed = true;
        this.element.remove();
        this.parent.children.splice(this.parent.children.indexOf(this), 1)
    }

    position: {x: number, y: number, width: number, height: number} = {x: 0, y: 0, width: 0, height: 0};

    forceResize(): void {
        this.element.style.position = 'absolute';


        let previousChild: Widget = null;
        if (this.parent && this.parent.children.indexOf(this) > 0) {
            previousChild = this.parent.children[this.parent.children.indexOf(this) - 1];
        }


        if (typeof(this.options.left) === 'string') {
            if (this.options.left.indexOf('prev()') === 0) {
                let off = 0;
                if (!isNaN(<number><any>this.options.left.replace('prev() ', ''))) {
                    off = parseFloat(this.options.left.replace('prev() ', ''));
                }
                if (previousChild) {
                    this.position.x = previousChild.position.x + previousChild.position.width + off;
                } else {
                    this.position.x = off;
                }
            } else if (this.options.left.indexOf('%') > 0) {
                let percent = parseFloat(this.options.left.replace('%', ''));
                this.position.x = this.parent.position.width * (percent / 100);
            } else {
                throw "Unsupported left value: " + this.options.left;
            }
        } else if (typeof(this.options.left) === 'number') {
            this.position.x = this.options.left;
        }

        if (typeof(this.options.top) === 'string') {
            if (this.options.top.indexOf('prev()') === 0) {
                let off = 0;
                if (!isNaN(<number><any>this.options.top.replace('prev() ', ''))) {
                    off = parseFloat(this.options.top.replace('prev() ', ''));
                }
                if (previousChild) {
                    this.position.y = previousChild.position.y + previousChild.position.height + off;
                } else {
                    this.position.y = off;
                }
            } else if (this.options.top.indexOf('%') > 0) {
                let percent = parseFloat(this.options.top.replace('%', ''));
                this.position.y = this.parent.position.height * (percent / 100);
            } else {
                throw "Unsupported top value: " + this.options.top;
            }
        } else if (typeof(this.options.top) === 'number') {
            this.position.y = this.options.top;
        }


        if (typeof(this.options.right) === 'number' && typeof(this.options.width) === 'number') {
            this.position.x = this.parent.position.width - this.options.width - this.options.right;
        }

        if (typeof(this.options.bottom) === 'number' && typeof(this.options.height) === 'number') {
            this.position.y = this.parent.position.height - this.options.height - this.options.bottom;
        }

        if (typeof(this.options.right) === 'number') {
            this.position.width = (this.parent.position.width - this.options.right) - this.position.x;
        }

        if (typeof(this.options.bottom) === 'number') {
            this.position.height = (this.parent.position.height - this.options.bottom) - this.position.y;
        }


        if (typeof(this.options.width) === 'number') {
            this.position.width = this.options.width;
        }
        if (typeof(this.options.height) === 'number') {
            this.position.height = this.options.height;
        }


        if (typeof(this.options.centerX) === 'number') {
            if (!this.options.width) {
                this.position.width = this.parent.position.width;
            }

            this.position.x = (this.parent.position.width / 2 - this.position.width / 2 + this.options.centerX);
        }

        if (typeof(this.options.centerY) === 'number') {
            if (!this.options.height) {
                this.position.height = this.parent.position.height;
            }
            this.position.y = (this.parent.position.height / 2 - this.position.height / 2 + this.options.centerY);
        }

        this.updateStyle();
    }

    updateStyle() {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        this.element.style.width = `${this.position.width}px`;
        this.element.style.height = `${this.position.height}px`;

        if (this.options.background) {
            this.element.style.backgroundColor = this.options.background;
        }

        if (this.options.cornerRadius) {
            this.element.style.borderRadius = `${this.options.cornerRadius}px`;
        }
    }
}

export interface IWidgetOptions {
    title: string;
    textColor?: string;
    id?: string;
    left?: string|number;
    right: string|number;
    top?: string|number;
    bottom: string|number;
    centerX?: number;
    centerY?: number;
    width?: number;
    height?: number;
    background?: string;
    cornerRadius?: number;
}

export interface IScrollViewOptions extends IWidgetOptions {
    direction?: string;
}
export interface ITextWidgetOptions extends IWidgetOptions {
    alignment: string;
    text?: string;
    font?: string;
}

export interface IImageWidgetOptions extends IWidgetOptions {
    image?: string;
}


export class Composite extends Widget {
    constructor(options: IWidgetOptions) {
        super(options);
        this.element.style.overflow = 'hidden';

    }

    children: Widget[] = [];

    append(widget: Widget) {
        this.insertAt(widget, this.children.length - 1);
    }

    forceResize(): void {
        super.forceResize();
        for (let child of this.children) {
            child.forceResize();
        }
    }


    insertAt(widget: Widget, index: number) {
        if (!widget) {
            throw ('cannot append null widget')
        }

        //todo support index

        widget.parent = this;
        this.children.push(widget);

        if (widget instanceof TabFolder) {
            this.element.appendChild(widget.tabHeader);
        }

        this.element.appendChild(widget.element);
    }
}
export class ActivityIndicator extends Widget {
    constructor(options: IWidgetOptions) {
        super(options);
    }
}
export class ScrollView extends Composite {
    constructor(options: IScrollViewOptions) {
        options.direction = options.direction || "vertical";
        super(options);
        if (options.direction === 'vertical') {
            this.element.style.overflowY = 'scroll';
        } else {
            this.element.style.overflowX = 'scroll';
        }
    }
}
export class TabFolder extends Composite {
    tabHeader: HTMLDivElement;
    private selectedTabIndex: number = 0;

    constructor(options: IWidgetOptions) {
        super(options);
        this.tabHeader = document.createElement('div');
        this.tabHeader.style.height = '30px';
        this.tabHeader.style.backgroundColor = '#333333';
        this.tabHeader.style.position = 'absolute';
    }

    append(widget: Tab) {
        super.append(widget);

        let tabHead = document.createElement('div');
        tabHead.style.height = '30px';
        tabHead.style.position = 'absolute';
        tabHead.style.userSelect = 'none';
        let tabIndex = this.children.length - 1;
        tabHead.onclick = () => {
            this.setTabIndex(tabIndex);
        };

        this.tabHeader.appendChild(tabHead)
    }

    private setTabIndex(tabIndex: number) {
        this.selectedTabIndex = tabIndex;
        this.forceResize();
    }

    forceResize(): void {

        super.forceResize();
        this.tabHeader.style.width = `${this.position.width}px`;
        this.tabHeader.style.left = `${this.position.x}px`;
        this.tabHeader.style.top = `${this.position.y}px`;


        let newWidth = this.position.width / this.children.length;

        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            this.tabHeader.childNodes[i].style.left = `${newWidth * i}px`;
            this.tabHeader.childNodes[i].style.width = `${newWidth}px`;
            this.tabHeader.childNodes[i].style.color = child.options.textColor;
            this.tabHeader.childNodes[i].innerText = child.options.title;
            this.tabHeader.childNodes[i].style.border = 'solid 2px white';
            this.tabHeader.childNodes[i].style.backgroundColor = '#333333';
            if (i == this.selectedTabIndex) {
                this.tabHeader.childNodes[i].style.backgroundColor = '#666666';
            }
        }
        this.position.height -= 30;
        this.position.y += 30;
        this.updateStyle();
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            child.forceResize();
            if (i != this.selectedTabIndex) {
                child.element.style.display = 'none';
            } else {
                child.element.style.display = 'block';
            }
        }
    }

}
export class Tab extends Composite {
    constructor(options: IWidgetOptions) {
        options.left = 0;
        options.right = 0;
        options.top = 0;
        options.bottom = 0;
        super(options);
    }
}
export class TextView extends Widget {
    constructor(options: ITextWidgetOptions) {
        super(options, 'span');
    }

    forceResize() {
        super.forceResize();

        let textOptions = (<ITextWidgetOptions>this.options);
        this.element.innerText = textOptions.text;
        this.element.style.color = textOptions.textColor;
        this.element.style.fontSize = textOptions.font;
        this.element.style.userSelect = 'none';
        if (textOptions.alignment === 'center') {
            this.parent.element.style.textAlign = 'center';
        } else if (textOptions.alignment === 'left') {
            this.parent.element.style.textAlign = 'left';
        }
        else if (textOptions.alignment === 'right') {
            this.parent.element.style.textAlign = 'right';
        }

    }
}
export class ImageView extends Widget {
    constructor(options: IImageWidgetOptions) {
        super(options, 'img');
        this.element.style.userSelect = 'none';

    }


    forceResize(): void {
        super.forceResize();
        (<HTMLImageElement>this.element).src = (<IImageWidgetOptions>this.options).image;
    }
}
export class Page extends Composite {
    static width = 300;
    static height = 480;

    constructor(options: IWidgetOptions) {
        super(options);
        this.element.style.width = `${Page.width}px`;
        this.element.style.height = `${Page.height}px`;
        this.element.style.backgroundColor = 'white';
        this.element.style.position = 'relative';
        this.element.style.border = '1px black solid';
    }

    forceResize(): void {
        this.position.width = Page.width;
        this.position.height = Page.height;
        for (let child of this.children) {
            child.forceResize();
        }
    }

    open() {
        document.body.appendChild(this.element);
        console.log('page open')
    }
}