/*global DOMParser*/
import { parse, getCoc } from './util/common';
import virtualDom from './util/virtualDom';

let client = document.getElementById('client');

document.addEventListener('selectstart', (e) => {
    let el = getCoc(e.target, 'data-CoC-draggable')
    if (el) e.preventDefault();
})



client.onload = () => {
    let clientDocument = client.contentDocument;
    let clientWindow = client.contentWindow;


    // hide any hover when its on vdom
    // perhaps not necessary anymore
    // let vdom = document.getElementById('sortable-dom-tree');
    // document.onHostMouseOver = (e) => {
    //     if (!vdom.contains(e.target)) {
    //         hoverBoxMarker.hide();
    //         tagNameTooltip.hide();
    //     }
    //     dnd.position = null;
    // };



    let tree = document.getElementById('sortable-dom-tree');

    let myVirtualDom = new virtualDom({ realDom: clientDocument.body, virtualDom: tree, document: clientDocument });




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
        console.log('host mouse over')
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
