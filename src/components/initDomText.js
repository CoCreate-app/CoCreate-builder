/*global CoCreate*/
import crdt from '@cocreate/crdt';
// import text from '@cocreate/text';
// import domText from '@cocreate/domtext';
import resolveCanvas from './resolveCanvas';


export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument }) {
	let domTextEditor = canvasDocument.documentElement;
	// let html = crdt.getText({ crud: false, ...crdtCon });
	// domTextEditor.htmlString = html;
	// let domTexti = new domText(html, canvasDocument.documentElement);
	// domTexti.setCallback({
	// canvasDocument.documentElement = {
	domTextEditor.addCallback = function({ value, position, avoidTextToDom = false, metadata }) {
			CoCreate.crdt.insertText({
				// attributes: { metadata },
				crud: false,
				...crdtCon,
				value,
				position,
			});
		},
	domTextEditor.removeCallback = function({ start, end, avoidTextToDom = false, metadata }) {
			CoCreate.crdt.deleteText({
				// attributes: { avoidTextToDom },
				crud: false,
				...crdtCon,
				position: start,
				length: end - start,
			});
		}
	// };

	// let domTextiTextToDom = new domText(html, canvasDocument.documentElement);
	// window.addEventListener('cocreate-crdt-update', function(e) {
	// 		let detail = event.detail;

	// 		if(detail['collection'] !== crdtCon['collection'] || detail['name'] !== crdtCon['name'] || detail['document_id'] !== crdtCon['document_id'])
	// 			return;
			
	// 		updateDomText(detail);
	// });
	
	// function updateDomText(detail){
	// 	let eventDelta = detail.eventDelta;

	// 	for(let i = 0; i < eventDelta.length; i++) {

	// 		if(eventDelta[i]?.attributes?.avoidTextToDom)
	// 			return;
	// 	}

	// 	let pos = 0;
	// 	for(let i = 0; i < eventDelta.length; i++) {

	// 		if(eventDelta[i].retain)
	// 			pos = eventDelta[i].retain;
	// 		else {
	// 			if(eventDelta[i].insert) {
	// 				let changeStr = eventDelta[i].insert;
	// 				if (changeStr != domTextEditor.htmlString) {
	// 					let html = crdt.getText(crdtCon);
	// 					domTextEditor.htmlString = html;
	// 					domText.addToDom({ domTextEditor, pos, changeStr });
	// 				}
	// 				console.log(pos, changeStr);
	// 			}
	// 			else {
	// 				let html = crdt.getText(crdtCon);
	// 				domTextEditor.htmlString = html;
	// 				let removeLength = eventDelta[i].delete;
	// 				domText.removeFromDom({ domTextEditor, pos, removeLength });
	// 				console.log(pos, removeLength);
	// 			}
	// 		}
	// 	}
	// 	// canvasDocument.documentElement.htmlString = html;
	// }
	
	// return domTexti;

});
