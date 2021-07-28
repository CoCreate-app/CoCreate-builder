  import resolveCanvas from './resolveCanvas';
  import crdt from '@cocreate/crdt';
  import domText from './initDomText';

  export default resolveCanvas.then(async function({ crdtCon, weirdCrdtCon, canvas, canvasDocument, canvasWindow }) {
    const domTexti = await domText;
    // ***
    // let contenteditableImport = await import('@cocreate/contenteditable');
    // let contenteditable = contenteditableImport.default;
    // // *** is the same as 
    // import('@cocreate/contenteditable').then(({contenteditable})=>{
      
      
    // })
    // //*** is the same as non-lazy load version of import which will not work in here! just for the reference  
    // import contenteditable from "@cocreate/contenteditable";
    //***
    
    
    // g_CoCreateContentEditable()
    canvasDocument.addEventListener('dblclick', (e) => {
      
      
      
      let element = e.target;
      if(element.hasAttribute('contenteditable'))
      return;
      
      let vv = element.innerText;

      let id = element.getAttribute('data-element_id');
      element.setAttribute('contenteditable', true);
      console.log("hereeeeeeeeeeeeeeee", weirdCrdtCon)
      element.setAttribute('name', `innertext-${id}`)
      element.setAttribute('collection',  weirdCrdtCon.collection)
      element.setAttribute('document_id', weirdCrdtCon.document_id);
      
      setTimeout(() => {
        if ((crdt.getText(weirdCrdtCon) || !element.innerText ) && (!crdt.getText(weirdCrdtCon) || element.innerText ) )
          crdt.replaceText({
            crud: false,
            ...weirdCrdtCon,
            value: vv,
          });
      }, 0)
      
      element.addEventListener('input', () => {
        // if (!element.hasAttribute('name') || !element.hasAttribute('collection') || !element.hasAttribute('document_id'))
          domTexti.setInnerText({ target: id, value: element.innerText, avoidTextToDom: true })
      })

    })
  })
  