/*global CoCreate*/
import crdt from '@cocreate/crdt';
// import text from '@cocreate/text';
import domText from '@cocreate/domtext';
import resolveCanvas from './resolveCanvas';


export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument }) {

	let html = crdt.getText({ crud: false, ...crdtCon });
	let domTexti = new domText(html, canvasDocument.documentElement);

	domTexti.setCallback({
		addCallback: function({ value, position, avoidTextToDom = false }) {
			CoCreate.crdt.insertText({
				// attributes: { avoidTextToDom },
				crud: false,
				...crdtCon,
				value,
				position,
			});
		},
		removeCallback: function({ from, to, avoidTextToDom = false }) {
			CoCreate.crdt.deleteText({
				// attributes: { avoidTextToDom },
				crud: false,
				...crdtCon,
				position: from,
				length: to - from,
			});
		}
	});

	let domTextiTextToDom = new domText(html, canvasDocument.documentElement);
	window.addEventListener('cocreate-crdt-update', function(e) {
		try {
			let detail = event.detail;

			if(detail['collection'] !== crdtCon['collection'] || detail['name'] !== crdtCon['name'] || detail['document_id'] !== crdtCon['document_id'])
				return;

			let eventDelta = detail.eventDelta;

			for(let i = 0; i < eventDelta.length; i++) {

				if(eventDelta[i]?.attributes?.avoidTextToDom)
					return;
			}
			let html = crdt.getText(crdtCon);
			domTextiTextToDom.html = domTexti.html = html;

			if(!window.savedDelta)
				window.savedDelta = [];
			else
				window.savedDelta.push(eventDelta);

			let pos = 0;
			for(let i = 0; i < eventDelta.length; i++) {

				if(eventDelta[i].retain)
					pos = eventDelta[i].retain;
				else {
					if(eventDelta[i].insert) {
						let changeStr = eventDelta[i].insert;

						domTextiTextToDom.addToDom({ pos, changeStr });

						console.log(pos, changeStr);
					}
					else {
						let removeLength = eventDelta[i].delete;
						domTextiTextToDom.removeFromDom({ pos, removeLength });
						console.log(pos, removeLength);
					}
				}
			}
		}
		catch(err) {
			console.log('domText: text-to-dom: ' + err);
		}
	});
	return domTexti;

});
