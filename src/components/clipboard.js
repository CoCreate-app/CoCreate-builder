import uuid from '@cocreate/uuid';


function parseAll(str) {
  let mainTag = str.match(/\<(?<tag>[a-z0-9]+)(.*?)?\>/).groups.tag;
  if (!mainTag)
    throw new Error('find position: can not find the main tag');

  let doc;
  switch (mainTag) {
    case 'html':
      doc = new DOMParser().parseFromString(str, "text/html");
      return [doc.documentElement, false];
    case 'body':
      doc = new DOMParser().parseFromString(str, "text/html");
      return [doc.body, false];
    case 'head':
      doc = new DOMParser().parseFromString(str, "text/html");
      return [doc.head, false];

    default:
      let con = document.createElement('div');
      con.innerHTML = str;
      return [con, true]
  }

}

document.querySelectorAll('textarea.clipboard').forEach(textarea => {
  textarea.addEventListener('paste', (e) => {

    if (e.detail?.data) return;
    let clipboardData, pastedData;

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');
    let [dom, isOnlyChildren] = parseAll(pastedData);
    let pastedValue;
    if (dom)

    {
      e.stopImmediatePropagation();
      if (!isOnlyChildren)
        dom.setAttribute('data-element_id', uuid.generate(6))
      dom.querySelectorAll('*').forEach(el => el.setAttribute('data-element_id', uuid.generate(6)));
      pastedValue = isOnlyChildren ? dom.innerHTML : dom.outerHTML;
      textarea.dispatchEvent(new CustomEvent('paste', { bubbles: true, detail: { data: pastedValue } }));
    }
    else
      pastedValue = pastedData;
    // textarea.setRangeText(pastedValue, textarea.selectionStart, textarea.selectionEnd);
    console.log('paste', e)
  })



})
