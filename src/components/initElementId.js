  import resolveCanvas from './resolveCanvas';
  import crdt from '@cocreate/crdt';
  // import domText from './initDomText';
  import uuid from '@cocreate/uuid';

  function sleep(tt) {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve();
      }, tt);
    });
  }
 
  export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
    // const domTexti = await domText;
    
    var parser = new DOMParser();
    let src = crdt.getText(crdtCon);
    if (!src) return;
    var dom = parser.parseFromString(src, "text/html");

    let elements = dom.querySelectorAll('*:not(html, [data-element_id])');
    
    for(let el of elements) {
      if (el.getAttribute('data-element_id') == null) {
        el.setAttribute('data-element_id', uuid.generate(6));
      }  
    }
    
    let html = dom.documentElement.innerHTML;
    if (elements.length > 0)
      crdt.replaceText({ crud: false, ...crdtCon, value: html });
      

  });
  