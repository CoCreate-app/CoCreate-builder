  import resolveCanvas from './resolveCanvas';
  // import crud from '@cocreate/crud';
  import crdt from '@cocreate/crdt';
  import domText from './initDomText';

  export default resolveCanvas.then(async function({ crdtCon, weirdCrdtCon, canvas, canvasDocument, canvasWindow }) {
    const domTexti = await domText;
    
    canvasDocument.addEventListener('dblclick', (e) => {
      
      let element = e.target;
      if(element.matches('input, textarea', 'select')) {
          return;
      }
      if(element.hasAttribute('contenteditable')) return;
      
      let collection = element.getAttribute('collection');
      let document_id = element.getAttribute('document_id');
      let name = element.getAttribute('name');
      
      let elementValue = element.innerText;
      
      let id = element.getAttribute('element_id');
      element.setAttribute('contenteditable', true);
      
			if (name == null) {
				element.setAttribute('name', `innertext-${id}`)
			}
			if (collection == null) {
				element.setAttribute('collection', crdtCon.document_id)
			}
			if (document_id == null) {
				element.setAttribute('document_id', crdtCon.collection)
			}
      
      // text.initElement(element)
      // setTimeout(() => {
          crdt.replaceText({
            collection: crdtCon.document_id,
            document_id: crdtCon.collection,
            name: `innertext-${id}`,
            crud: false,
            value: elementValue,
          });
      // }, 1000)
      // window.addEventListener('cocreate-crdt-update', setValue, true);

      // function setValue(){
      //     window.removeEventListener('cocreate-crdt-update', setValue, true);
      //     crdt.replaceText({
      //       collection: crdtCon.document_id,
      //       document_id: crdtCon.collection,
      //       name: `innertext-${id}`,
      //       crud: false,
      //       value: elementValue,
      //     });
      // }
      
      element.addEventListener('input', () => {
        domTexti.setInnerText({ target: id, value: element.innerText, avoidTextToDom: true })
      })

    })

  })
  