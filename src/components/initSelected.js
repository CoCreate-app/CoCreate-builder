import selected from '@cocreate/selected'
import resolveCanvas from './resolveCanvas';

export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument }) {

	selected.config({
		srcDocument: canvasDocument,
		destDocument: document,
		selector: "*",
		target: "[attribute]:not(.styleunit)",
		callback: (element, target) => {
			target.setAttribute('name', target.id + '-' + element.getAttribute('element_id'))
			target.setAttribute('attribute-target', `#${canvas.id};[element_id="${element.getAttribute('element_id')}"]`);
		}
	});

	selected.config({
		srcDocument: canvasDocument,
		destDocument: document,
		selector: "*",
		target: ".styleunit",
		callback: (element, target) => {
			target.setAttribute('name', target.id + '-' + element.getAttribute('element_id'));
		}
	});

})
