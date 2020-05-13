/*global DOMParser*/
import { getCoc } from './util/common';

let client = document.getElementById('client');

document.addEventListener('selectstart', (e) => {
    let el = getCoc(e.target, 'data-CoC-draggable')
    if (el) e.preventDefault();
})



client.onload = () => {
    let clientDocument = client.contentDocument;


    let tree = document.getElementById('sortable-dom-tree');

    let rightVirtualDom = new virtualDom({ realDom: clientDocument.body, virtualDom: tree });




    function dragStart(e) {
        let el = getCoc(e.target, 'data-CoC-draggable');
        if (!el) return;
        let insertEl
        let html = el.getAttribute('data-insert-html');

        if (!html || html == '{{html}}') {
            // temporary
            let el2 = el.querySelector('[data-insert-html]')
            let html = el2.getAttribute('data-insert-html')
            insertEl = parse(html);
            // insertEl = el.cloneNode(true);
        }
        else
            insertEl = parse(html);

        clientDocument.mydnd.dragStart(e, insertEl, el.id);

    }

    (function injectScript() {

        let scripts = ['dist/CoCreate-builder-iframe.js'];
        for (let i = 0, len = scripts.length; i < len; i++) {

            let script = document.createElement('script');
            script.src = scripts[i];
            script.id = "CoCreate-builder"
            clientDocument.head.append(script)
        }

        let styles = ['iframe.css'];
        for (let i = 0, len = styles.length; i < len; i++) {

            let style = document.createElement('link');
            style.rel = "stylesheet";
            style.type = "text/css";
            style.href = styles[i];
            style.id = "CoCreate-builder"
            clientDocument.head.append(style)
        }

    }())

    document.addEventListener('dragstart', (e) => {
        return false;
    })


    /* touch */
    document.addEventListener('touchstart', (e) => {
        console.log('host touch start')

        dragStart(e)
        typeof clientDocument.onHostTouchStart == 'function' && clientDocument.onHostTouchStart(e);
    })
    document.addEventListener('touchend', (e) => {

        console.log('host touch end')
        clientDocument.mydnd.dragEnd(e);

        typeof clientDocument.onHostTouchEnd == 'function' && clientDocument.onHostTouchEnd(e);
    })
    document.addEventListener('touchmove', (e) => {

        console.log('host touch move')
        let rect = client.getBoundingClientRect();
        let touch = e.touches[0];
        let x = touch.clientX - rect.x;
        let y = touch.clientY - rect.y;
        typeof clientDocument.onHostTouchMove == 'function' && clientDocument.onHostTouchMove({ x, y })
    })
    /* touch */





    /* mouse */
    document.addEventListener('mouseover', (e) => {
        console.log('host touch over')
        typeof clientDocument.onHostMouseOver == 'function' && clientDocument.onHostMouseOver(e);
    })

    document.addEventListener('mousedown', (e) => {
        console.log('host mouse down')
        dragStart(e)

    })

    document.addEventListener('mouseup', (e) => {

        console.log('host mouse up')
        typeof clientDocument.onHostMouseUp == 'function' && clientDocument.onHostMouseUp(e);
        clientDocument.mydnd.dragEnd();
        // document.removeEventListener('mousemove', dnd)
    })
    /* mouse */

}


function parse(text) {
    let doc = new DOMParser().parseFromString(text, 'text/html');
    if (doc.head.children[0])
        return doc.head.children[0];
    else
        return doc.body.children[0];
}



function virtualDom({ realDom, virtualDom, options }) {

    // set options to this.options and set defualts
    this.options = options ? options : {};
    Object.assign(this.options, { indentBase: 10, indentSum: 15 });


    this.render = function(elList, level) {
        for (let el of elList) {


            let displayName = el.getAttribute('data-CoC-name');
            let virtualEl = this.createVirtualElement({
                name: (displayName ? displayName : el.tagName),
                isParent: el.children.length,
                indent: this.options.indentBase + this.options.indentSum * level,
                element: el
            })


            virtualDom.append(virtualEl);
            if (el.children)
                this.render(el.children, level + 1)
        }

    }


    this.createVirtualElement = function({ name, isParent, indent, options, element }) {

        let treeItem = document.createElement('div');
        treeItem.classList.add('sortable-item');



        let text = document.createElement('span');
        text.innerHTML = name;
        text.style.flex = '1';
        text.style.paddingLeft = indent + 'px';

        let lastDisplay;
        let eye = this.createFAIcon({
            name: 'fa-eye',
            event: {
                'click': (e) => {
                    if (element.style.display == "none") {
                        element.style.display = lastDisplay
                    }
                    else {
                        lastDisplay = element.style.display;
                        element.style.display = 'none'
                    }
                }
            }
        })
        let arrow = this.createFAIcon({ name: 'fa-arrows-alt' })


        treeItem.append(eye);

        if (isParent) {
            if (options && options.collapsed == false) {
                let down = this.createFAIcon({ name: 'fa-caret-down' })
                text.insertAdjacentElement('afterbegin', down)
            }
            else {

                let right = this.createFAIcon({ name: 'fa-caret-right' })
                text.insertAdjacentElement('afterbegin', right)
            }
        }


        treeItem.append(text);
        treeItem.append(arrow);
        return treeItem;
    }


    this.createFAIcon = function({ name, event }) {
        let icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add(name);
        if (event) {
            let eventType = Object.keys(event)[0];
            let func = event[eventType];
            icon.addEventListener(eventType, func)
        }
        return icon;
    }
    this.render([realDom], 0)

}
