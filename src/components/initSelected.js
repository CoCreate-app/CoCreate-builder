import selected from '@cocreate/selected';
import uuid from '@cocreate/uuid';
import resolveCanvas from './resolveCanvas';

export default resolveCanvas.then(function({ canvas, canvasDocument }) {

	selected.config({
		srcDocument: canvasDocument,
		destDocument: document,
		selector: "*",
		target: "[attribute]:not(.styleunit)",
		callback: (element, target) => {
			let eid = element.getAttribute('eid');
			if(!eid) {
				eid = uuid.generate(6);
				element.setAttribute('eid', eid)
			}
			target.value = '';
			target.setAttribute('name', target.id + '-' + eid);
			target.setAttribute('attribute-target', `#${canvas.id};[eid="${eid}"]`);
		}
	});

	selected.config({
		srcDocument: canvasDocument,
		destDocument: document,
		selector: "*",
		target: ".styleunit[attribute]",
		callback: (element, target) => {
			target.setAttribute('name', target.id + '-' + element.getAttribute('eid'));
		}
	});
	
	selected.config({
		srcDocument: canvasDocument,
		destDocument: document,
		selector: "img",
		target: "[actions='attributes'][attribute='src']",
		callback: (element, target) => {
			target.setAttribute('attribute-target', `#${canvas.id};[eid="${element.getAttribute('eid')}"]`);
		}
	});

});
