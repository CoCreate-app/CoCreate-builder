import selected from '@cocreate/selected'
import resolveCanvas from './resolveCanvas';

export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {

  selected.config({
    srcDocument: canvasDocument,
    destDocument: document,
    selector: "*",
    target: "[attribute]:not(.styleunit)",
    callback: (element, target) => {
      
      target.setAttribute('name', target.id + '-' + element.getAttribute('element_id'))
      target.setAttribute('attribute-target', `#${canvas.id};[element_id="${element.getAttribute('element_id')}"]`);
      // target.setAttribute('collection', crdtCon.document_id)
      // target.setAttribute('collection', crdtCon.collection)
      // target.setAttribute('document_id', crdtCon.document_id)
    }
  });



  selected.config({
    srcDocument: canvasDocument,
    destDocument: document,
    selector: "*",
    target: ".styleunit",
    callback: (element, target) => {
      target.setAttribute('name', target.id + '-' + element.getAttribute('element_id'));
      // target.setAttribute('collection', crdtCon.document_id)
      // target.setAttribute('collection', crdtCon.collection)
      // target.setAttribute('document_id', crdtCon.document_id)
    }
  });

})
