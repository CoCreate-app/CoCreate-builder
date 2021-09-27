/*global CoCreate*/
import resolveCanvas from './resolveCanvas';
import text from '@cocreate/text';
// import attributes from '@cocreate/attributes';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	let element;
	
	function  nodeName(btn) {
		let name = btn.getAttribute('nodename');
		if (!name) return;
		let targetSelector = btn.getAttribute('nodetarget');
	
		let Document = document;
		if (targetSelector) {
			if(targetSelector.indexOf(';') !== -1) {
				let documentSelector;
				[documentSelector, targetSelector] = targetSelector.split(';');
				let frame = document.querySelector(documentSelector);
				Document = frame.contentDocument;
				element = Document.documentElement;
			}
		}
		
		const selection = Document.getSelection();
		if(!element)
			element = selection.anchorNode.parentElement;

		let value = selection.toString();
		
		const { start, end, range } = text.getSelections(element);
	    if(start != end) {
	        text.deleteText(element, start, end, range);
	    }
	    let id = CoCreate.uuid.generate(6);
	    let newValue = `<${name} element_id="${id}">${value}</${name}>`;
	    text.insertText(element, newValue, start, range);
	}
	

	CoCreate.action.init({
		action: "nodeName",
		endEvent: "nodeName",
		callback: (btn, data) => {
			nodeName(btn);
		}
	});
});
