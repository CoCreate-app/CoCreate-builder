/*global CoCreate, CustomEvent*/
import resolveCanvas from './resolveCanvas';
import uuid from '@cocreate/uuid';
import toolbar from '@cocreate/toolbar';
import domText from '@cocreate/domtext';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	// const domTexti = await domText;
	let domTextEditor = canvasDocument.documentElement;
	function  cloneElement(btn) {
		let element = btn.closest('toolbar, .toolbar');
		let targetElement = element.toolbar.target;
		var clone = targetElement.cloneNode(true);
		clone.setAttribute('element_id', uuid.generate(6));
		
		domText.insertAdjacentElement({
			domTextEditor,
			position: 'afterend',
			target: targetElement.getAttribute("element_id"),
			elementValue: clone.outerHTML,
			metadata: { type: 'dnd' }
		});
		
		targetElement.after(clone);
		dispatchClickEvent(clone);
	}
	
	function  dispatchClickEvent(target) {
        let clickEvent = new CustomEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
        canvasDocument.dispatchEvent(clickEvent);
	}
	
	function  deleteElement(btn) {
		let element = btn.closest('toolbar, .toolbar');
		let targetElement = element.toolbar.target;
		
		domText.removeElement({
			domTextEditor,
			target: targetElement.getAttribute("element_id"),
			// metadata: { type: 'dnd' }
		});
		
		targetElement.remove();
		toolbar.hide(element);
	}
	
	CoCreate.action.init({
		action: "deleteElement",
		endEvent: "deleteElement",
		callback: (btn, data) => {
			deleteElement(btn);
		}
	});
	
	CoCreate.action.init({
		action: "cloneElement",
		endEvent: "cloneElement",
		callback: (btn, data) => {
			cloneElement(btn);
		}
	});
	
});
