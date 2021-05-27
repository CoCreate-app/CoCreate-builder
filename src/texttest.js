let textarea = document.getElementById('textarea');


function parse(text) {
    let doc = new DOMParser().parseFromString(text, "text/html");
    if (doc.head.children[0]) return doc.head;
    else return doc.body;
}

textarea.onpaste = (e) => {
    console.log('check paste: my paste')
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
        dom.querySelectorAll('*').forEach(el => el.setAttribute('data-element_id', new Date().getTime()));
        pastedValue = dom.innerHTML
        textarea.dispatchEvent(new CustomEvent('paste', { bubbles: true, detail: { data: pastedValue } }));
    }
    else
        pastedValue = pastedData;
    // textarea.setRangeText(pastedValue, textarea.selectionStart, textarea.selectionEnd);
    console.log('paste', e)
};




textarea.addEventListener('input', (e) => {
    console.log('check paste: my input', e)

});
