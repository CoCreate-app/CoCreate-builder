import elementConfig from '../elementConfig';

export default new Promise(async function(resolve, reject) {
	let canvas, canvasDocument;
	canvas = document.querySelector("iframe[contenteditable]");
	if(!canvas) return;
	
	canvasDocument = canvas.contentDocument;
	canvasDocument.elementConfig = elementConfig;
	// canvasDocument.configFunctions = {editable: (element, request) => {
	// 		if (CoCreate.text.hasSelection(element) && element.closest('[contenteditable="true"]'))
	// 			return true;
	// 		else return false;
	// 	}
	// }
	resolve({ canvas, canvasDocument });
});