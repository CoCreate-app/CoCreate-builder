/*global CoCreate, CustomEvent*/
import resolveCanvas from './resolveCanvas';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {

	function  nextElement(btn) {
		let element = btn.closest('toolbar, .toolbar');
		let targetElement = element.toolbar.target;
		let target;
		if (targetElement.firstElementChild) {
			target = targetElement.firstElementChild;
		} else {
			target = targetElement.nextElementSibling;
		}
		if (!target) {
			do {
				targetElement = targetElement.parentElement;
				if (targetElement.nextElementSibling) {
					target = targetElement.nextElementSibling;
				} 
			} while (!target);

		}
		if (!target) return;

        let clickEvent = new CustomEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
        canvasDocument.dispatchEvent(clickEvent);
	}
	
	function  previousElement(btn) {
		let element = btn.closest('toolbar, .toolbar');
		let targetElement = element.toolbar.target;
		let target;
		if (targetElement.previousElementSibling) {
			target = targetElement.previousElementSibling;
		} else {
			target = targetElement.parentElement;
		}
		if (!target) return;
        let clickEvent = new CustomEvent('click', { bubbles: true });
        Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
        canvasDocument.dispatchEvent(clickEvent);
	}
	

	CoCreate.action.init({
		action: "nextElement",
		endEvent: "nextElement",
		callback: (btn, data) => {
			nextElement(btn);
		}
	});
	
	CoCreate.action.init({
		action: "previousElement",
		endEvent: "previousElement",
		callback: (btn, data) => {
			previousElement(btn);
		}
	});
});
