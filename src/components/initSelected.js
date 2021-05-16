import selected from '@cocreate/selected'
import resolveCanvas from './resolveCanvas';

export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {

  selected.config({
    srcDocument: canvasDocument,
    destDocument: document,
    selector: "*",
    target: "[data-attributes]:not(.styleunit)",
    callback: (element, target) => {
      target.setAttribute('name', target.id + '-' + element.getAttribute('data-element_id'))
      target.setAttribute('data-attributes_target', `#${canvas.id};[data-element_id="${element.getAttribute('data-element_id')}"]`);
    }
  });



})
