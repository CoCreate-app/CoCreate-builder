import uuid from '@cocreate/uuid'


function parse(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    if (doc.head.children[0]) return doc.head;
    else return doc.body;
}

document.querySelectorAll('textarea.clipboard').forEach(el => {
 el.addEventListener('paste',  (e) => {

    if(e.detail?.data) return;
    let clipboardData, pastedData;
    
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    let dom = parse(pastedData);
    let pastedValue;
    if (dom)

    {
        e.stopImmediatePropagation()
        dom.querySelectorAll('*').forEach(el => el.setAttribute('data-element_id', uuid.generate()));
        pastedValue = dom.innerHTML
        textarea.dispatchEvent(new CustomEvent('paste', { bubbles: true, detail: { data: pastedValue } }));
    }
    else
        pastedValue = pastedData;
    // textarea.setRangeText(pastedValue, textarea.selectionStart, textarea.selectionEnd);
    console.log('paste', e)
})  


    
})

