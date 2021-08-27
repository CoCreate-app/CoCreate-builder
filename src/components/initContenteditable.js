import resolveCanvas from './resolveCanvas';
import crdt from '@cocreate/crdt';
import domText from './initDomText';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
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

		if(name == null) {
			element.setAttribute('name', `innertext-${id}`);
		}
		if(collection == null) {
			element.setAttribute('collection', crdtCon.collection);
		}
		if(document_id == null) {
			element.setAttribute('document_id', crdtCon.document_id);
		}

		if(element.hasAttribute('contenteditable')) {
			let collection = crdtCon.collection;
			let document_id = crdtCon.document_id;
			let name = `innertext-${id}`;

			if (crdt.getDoc({collection, document_id, name})) {
				crdt.replaceText({
					collection: collection,
					document_id: document_id,
					name: name,
					crud: false,
					value: elementValue,
				});		
			}
		}

		element.addEventListener('input', () => {
			domTexti.setInnerText({ target: id, value: element.innerText, avoidTextToDom: true });
		});

	});

});
