let client = document.getElementById('client');

document.addEventListener('selectstart', (e) => {
    let el = getCoc(e.target, 'data-CoC-draggable')
    if (el) e.preventDefault();
})



client.onload = () => {
    let clientDocument = client.contentDocument;

    function dragStart(e) {
        let el = getCoc(e.target, 'data-CoC-draggable');
        let insertEl, html = el.getAttribute('data-insert-html');

        if (!html)
            insertEl = el.cloneNode(true);
        else
            insertEl = parse(el.getAttribute('data-insert-html'));

        clientDocument.mydnd.dragStart(e, insertEl, el.id);

    }

    (function injectScript() {
        let scripts = ['util/elements.js', 'util/util.js', 'util/common.js', 'iframe.js'];
        for (let i = 0, len = scripts.length; i < 4; i++) {

            let script = document.createElement('script');
            script.src = scripts[i];
            script.id = "CoCreate-builder"
            clientDocument.head.append(script)
        }

        let styles = ['iframe.css'];
        for (let i = 0, len = styles.length; i < 4; i++) {

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
