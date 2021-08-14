  import crdt from '@cocreate/crdt';
  import uuid from '@cocreate/uuid';

  function sleep(tt) {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve()
      }, tt)
    })
  }
    
  let canvas, canvasDocument, canvasWindow, crdtCon;

  canvas = document.querySelector("#canvas");
  if (!canvas)
    console.error("builder config failed, can not find canvas iframe");

  crdtCon = {
    collection: canvas.getAttribute('collection'),
    document_id: canvas.getAttribute('document_id'),
    name: canvas.getAttribute('name'),

  };

  export default new Promise(async function(resolve, reject) {

    window.addEventListener('cocreate-crdt-update', initCanvas, true);
 
    window.crdtCon = crdtCon;
    
    // setTimeout(function(){ crdt.init(crdtCon); }, 3000);
    crdt.init(crdtCon);
  
    function initCanvas() { 
      try {
        let info = event.detail;
        let collection = info['collection'];
        let document_id = info['document_id'];
        let name = info['name'];
      	if (collection == crdtCon.collection && document_id == crdtCon.document_id && name == crdtCon.name) {
          let html = info.eventDelta.find(x => x.insert); 
          let src = html.insert;
          if(src) {
          
            let eid = elementId(src);
            if (eid == false) return;
              createIframe(src);
          }
      	}
      }
      catch (err) {
        console.log('canvas init: ' + err);
      }
    }
    
    function elementId(src) { 
      try { 
        var parser = new DOMParser();
        var dom = parser.parseFromString(src, "text/html");
    
        let elements = dom.querySelectorAll('*:not(html, [element_id])');
        
        for(let el of elements) {
          if (el.getAttribute('element_id') == null) {
            el.setAttribute('element_id', uuid.generate(6));
          }  
        }
        
        let html = dom.documentElement.outerHTML;
        
        if (elements.length > 0) {
          crdt.replaceText({ crud: false, ...crdtCon, value: html });
          elementId = function(){};
          return false;
        } 
      }
      catch (err) {
        console.log('canvas init: ' + err);
      }
    }
    
    function createIframe(src) { 
      let newIframe = document.createElement('iframe');
      newIframe.srcdoc = src;

      for (let att of canvas.attributes) {
        newIframe.setAttribute(att.name, att.value);
      }

      canvas.replaceWith(newIframe);
      newIframe.addEventListener('load', () => {
        newIframe.removeAttribute('srcdoc')
        canvasWindow = newIframe.contentWindow;
        canvasDocument = canvasWindow.document || newIframe.contentDocument;
        canvasDocument.ccdefaultView = canvasWindow;
        resolve({ crdtCon, canvas: newIframe, canvasDocument, canvasWindow });
      });
      window.removeEventListener('cocreate-crdt-update', initCanvas, true);
    }
  })
  