import crdt from '@cocreate/crdt';
import uuid from '@cocreate/uuid';

function sleep(tt) {
	return new Promise(function(resolve) {
		setTimeout(() => {
			resolve();
		}, tt);
	});
}

let canvas, canvasDocument, crdtCon;

canvas = document.querySelector("#canvas");
if(!canvas)
	console.error("builder config failed, can not find canvas iframe");

crdtCon = {
	collection: canvas.getAttribute('collection'),
	document_id: canvas.getAttribute('document_id'),
	name: canvas.getAttribute('name'),
};

export default new Promise(async function(resolve, reject) {

	window.addEventListener('cocreate-crdt-update', initCanvas, true);

	window.crdtCon = crdtCon;

	crdt.init(crdtCon);

	function initCanvas() {
		try {
			let info = event.detail;
			let collection = info['collection'];
			let document_id = info['document_id'];
			let name = info['name'];
			if(collection == crdtCon.collection && document_id == crdtCon.document_id && name == crdtCon.name) {
				let html = info.eventDelta.find(x => x.insert);
				let src = html.insert;
				if(src) {

					let eid = elementId(src);
					if(eid == false) return;
					canvasDocument = canvas.contentDocument;
					canvasDocument.documentElement.innerHTML = src;
					window.removeEventListener('cocreate-crdt-update', initCanvas, true);
					resolve({ crdtCon, canvas, canvasDocument });
				}
			}
		}
		catch(err) {
			console.log('canvas init: ' + err);
		}
	}

	function elementId(src) {
		try {
			var parser = new DOMParser();
			var dom = parser.parseFromString(src, "text/html");

			let elements = dom.querySelectorAll('*:not(html, [element_id])');

			for(let el of elements) {
				if(el.getAttribute('element_id') == null) {
					el.setAttribute('element_id', uuid.generate(6));
				}
			}

			let html = dom.documentElement.outerHTML;

			if(elements.length > 0) {
				crdt.replaceText({ crud: false, ...crdtCon, value: html });
				elementId = function() {};
				return false;
			}
		}
		catch(err) {
			console.log('canvas init: ' + err);
		}
	}

})

       let canvasScript = document.createElement('script');
       canvasScript.setAttribute('src', './CoCreate-builder-canvas.js');
       canvasScript.addEventListener('load', function() {
         canvasWindow.dispatchEvent(new Event("DOMContentLoaded", { "bubbles": true, "cancelable": false }))
         canvasWindow.dispatchEvent(new Event("load", { "bubbles": true, "cancelable": false }))
       })
       canvasDocument.head.appendChild(canvasScript);
