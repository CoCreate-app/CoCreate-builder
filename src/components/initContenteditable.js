import resolveCanvas from './resolveCanvas';
import crdt from '@cocreate/crdt';
import domText from '@cocreate/domtext';
import text from '@cocreate/text';
import {checkElementConfig, checkParent, getSelectors} from './initElementConfig';


export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	// let els = canvasDocument.querySelectorAll('*');
	// for (let el of els){
	// 	if(el.nodeType == 3) {
	// 		console.log('el', el, el.nodeType)
	// 	}
	// 	if(el.childNodes) {
	// 		for (let child of el.childNodes){
	// 			if(child.nodeType == 3) {
	// 				console.log('child', child, child.nodeType)
	// 			}
	// 		}
	// 	}
	// }
	// let domTextEditor = canvasDocument.documentElement;
	// let selectors = getSelectors('editable') || 'h1, h2, h3, h4, h5, h6, p, span, blockquote';
	// if (selectors) {
	// 	let elements = canvasDocument.querySelectorAll(selectors);
	// 	for (let element of elements){
	// 		// initContentEditable(element);
	// 	}
	// }
	// canvasDocument.addEventListener('dblclick', (e) => {
	// 	let element = e.target;
	// 	if (element.matches('input, textarea', 'select')) return;
	// 	// initContentEditable(element);

	// });

	// function initContentEditable(element){
	// 	if(element.hasAttribute('contenteditable')) return;
		
	// 	element = checkParent(element, selectors);

	// 	let options = ['editable'];
	// 	if (!checkElementConfig(element, options)) return;
		
	// 	// let collection = element.getAttribute('collection');
	// 	// let document_id = element.getAttribute('document_id');
	// 	// let name = element.getAttribute('name');

	// 	// let elementValue = element.innerHTML;

	// 	// let id = element.getAttribute('element_id');
		
	// 	element.domText = true;
	// 	element.domTextEditor = domTextEditor;
	// 	// element.setAttribute('contenteditable', true);
	// 	element.contentEditable = true;
	// 	text._addEventListeners(element);
	// 	// if(name == null) {
	// 	// 	element.setAttribute('name', `innertext-${id}`);
	// 	// }
	// 	// if(collection == null) {
	// 	// 	element.setAttribute('collection', crdtCon.collection);
	// 	// }
	// 	// if(document_id == null) {
	// 	// 	element.setAttribute('document_id', crdtCon.document_id);
	// 	// }

	// 	// if(element.hasAttribute('contenteditable')) {
	// 	// 	let collection = crdtCon.collection;
	// 	// 	let document_id = crdtCon.document_id;
	// 	// 	let name = `innertext-${id}`;

	// 	// 	if (crdt.getDoc({collection, document_id, name})) {
	// 	// 		crdt.replaceText({
	// 	// 			collection: collection,
	// 	// 			document_id: document_id,
	// 	// 			name: name,
	// 	// 			crud: false,
	// 	// 			value: elementValue,
	// 	// 		});		
	// 	// 	}
	// 	// }
		
	// 	// element.removeEventListener('input', setInnerText);
	// 	// element.addEventListener('input', setInnerText);
	// 	 text._addEventListeners(element)
	// }
	
	// function setInnerText(e){
	// 	// let element = e.target;
	// 	// let id = element.getAttribute('element_id');
	// 	// let metadata = {target: id};
	// 	domText.replaceInnerText({ domTextEditor, target: e.target, value: e.target.innerHTML});
	// }
	
});
