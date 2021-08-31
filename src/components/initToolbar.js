import toolbar from '@cocreate/toolbar';
import { configMatch } from '@cocreate/utils';
import resolveCanvas from './resolveCanvas';
import elementConfig from '../elementConfig';
import text from '@cocreate/text';

export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument }) {

	toolbar.init({
		selector: "#selectedElement",
		eventType: "click",
		targetDocument: canvasDocument,
		onEvent: (element, request) => {
			if (request == 'click') request = ['selectable'];
			for (let config of configMatch(elementConfig, element))
				for (let r of request)
					if (config[r] === true) {
					return true;
				}
			else return;
		},
	});

	toolbar.init({
		selector: "#hoveredElement",
		eventType: "mouseover",
		targetDocument: canvasDocument,
		onEvent: (element, request) => {
			if (request == 'mouseover') request = ['hoverable'];
			for (let config of configMatch(elementConfig, element))
				for (let r of request)
					if (config[r] === true) {
					return true;
				}
			else return;
		},
	});
	
	toolbar.init({
		selector: "#collabElement",
		eventType: "mouseup",
		targetDocument: canvasDocument,
		onEvent: (element, request) => {
			if (request == 'mouseup') request = ['editable'];
			for (let config of configMatch(elementConfig, element))
				for (let r of request)
					if (config[r] === true) {
						if (text.hasSelection(element) && element.closest('[contenteditable="true"]'))
						return true;
					}
			else return;
		},
	});
	
});