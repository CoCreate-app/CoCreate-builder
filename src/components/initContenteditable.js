import resolveCanvas from './resolveCanvas';
import crdt from '@cocreate/crdt';
import domText from './initDomText';
import {checkElementConfig, checkParent, getSelectors} from './initElementConfig';


export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	const domTexti = await domText;
	let selectors = getSelectors('editable') || 'h1, h2, h3, h4, h5, h6, p, span, blockquote';
	if (selectors) {
		let elements = canvasDocument.querySelectorAll(selectors);
		for (let element of elements){
			initContentEditable(element);
		}
	}
	canvasDocument.addEventListener('dblclick', (e) => {
		let element = e.target;
		if (element.matches('input, textarea', 'select')) return;
		initContentEditable(element);

	});

	function initContentEditable(element){
		if(element.hasAttribute('contenteditable')) return;
		
		element = checkParent(element, selectors);

		let options = ['editable'];
		if (!checkElementConfig(element, options)) return;
		
		let collection = element.getAttribute('collection');
		let document_id = element.getAttribute('document_id');
		let name = element.getAttribute('name');

		let elementValue = element.innerHTML;

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

		element.removeEventListener('input', setInnerText);
		element.addEventListener('input', setInnerText);
	}
	
	function setInnerText(e){
		let element = e.target;
		let id = element.getAttribute('element_id');
		let metadata = {target: id};
		domTexti.setInnerText({ target: id, value: e.detail.value, start: e.detail.start, end: e.detail.end, avoidTextToDom: true, metadata });
	}
	
});
