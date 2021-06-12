  import resolveCanvas from './resolveCanvas';
  import crdt from '@cocreate/crdt';
  import domText from './initDomText';

  export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
    const domTexti = await domText;

    canvasDocument.addEventListener('dblclick', (e) => {
      
      let element = e.target;
      if(element.hasAttribute('contenteditable'))
      return;
      
      let id = element.getAttribute('data-element_id');
      element.setAttribute('contenteditable', true);
      element.addEventListener('input', () => {
        // if (!element.hasAttribute('name') || !element.hasAttribute('data-collection') || !element.hasAttribute('data-document_id'))
          domTexti.setInnerText({ target: id, value: element.innerText, avoidTextToDom: true })
      })
      
      let vv = element.innerText;
      element.setAttribute('data-realtime', true)
      element.setAttribute('name', `innertext-${id}`)
      element.setAttribute('data-collection', `builder`)
      element.setAttribute('data-document_id', `null`);

      let con = {
        collection: 'builder',
        document_id: 'null',
        name: `innertext-${id}`
      };

      
      crdt.init(con)
      setTimeout(() => {
        if ((crdt.getText(con) || !element.innerText ) && (!crdt.getText(con) || element.innerText ) )
          crdt.replaceText({
            crud: false,
            ...con,
            value: vv,
          });


      }, 1000)

    })
  })
  