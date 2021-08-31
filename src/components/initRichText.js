/*global CoCreate*/
import resolveCanvas from './resolveCanvas';
import text from '@cocreate/text';
import attributes from '@cocreate/attributes/src/attributes.js';
import domText from './initDomText';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {

const domTexti = await domText;
let element;

function  nodeName(btn) {
	let name = btn.getAttribute('nodename');
	if (!name) return;
	
	let Document = document;
	let targetSelector = btn.getAttribute('nodetarget');
	if (targetSelector) {
		if(targetSelector.indexOf(';') !== -1) {
			let documentSelector;
			[documentSelector, targetSelector] = targetSelector.split(';');
			let frame = document.querySelector(documentSelector);
			Document = frame.contentDocument;
		}
	}
	const selection = Document.getSelection();
	element = selection.anchorNode.parentElement;
    element.addEventListener('textChange', domCanvas, true);
	
	let value = selection.toString();
	
	const { start, end } = text.getSelections(element);
    if(start != end) {
        text.deleteText(element, start, end);
    }
    
    let newValue = `<${name}>${value}</${name}>`;
    text.insertText(element, newValue, start);
}

function domCanvas(e) {
	if (!element || !e.target) return;
	if (element == e.target) { 
		let id = element.getAttribute('element_id');
		domTexti.setInnerText({ target: id, value: element.innerHTML, avoidTextToDom: true });
		element.removeEventListener('textChange', domCanvas, true);
		element = '';
	}
}

	CoCreate.action.init({
		action: "nodeName",
		endEvent: "nodeName",
		callback: (btn, data) => {
			nodeName(btn);
		}
	});
});
