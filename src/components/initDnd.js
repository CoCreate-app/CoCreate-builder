import dnd from '@cocreate/dnd';
import { configMatch } from '@cocreate/utils';
import uuid from '@cocreate/uuid';
import elementConfig from '../elementConfig';
import resolveCanvas from './resolveCanvas';
import domText from '@cocreate/domtext';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	// const domTexti = await domText;
	let domTextEditor = canvasDocument.documentElement;

	let onDnd = (e) => {

		let {
			position,
			dragedEl,
			dropedEl,
			dropType,
			dragNextSib,
			dropNextSib
		} = e.detail;

		// check if it's vdom convert it to canvas
		if(dropedEl.classList.contains('vdom-item')) {
			let id = dropedEl.getAttribute("element_id");
			dropedEl = canvasDocument.querySelector(`[element_id="${id}"]`)
			id = dragedEl.getAttribute("element_id");
			dragedEl = canvasDocument.querySelector(`[element_id="${id}"]`)


			dropedEl.insertAdjacentElement(position, dragedEl);
		}
		else if(!canvasDocument.contains(dropedEl)) return; //probably not necss since we fixed groups
		try {
			switch(dropType) {
				case "draggable":
					domText.insertAdjacentElement({
						domTextEditor,
						position,
						target: dropedEl.getAttribute("element_id"),
						element: dragedEl.getAttribute("element_id"),
						metadata: { type: 'dnd' }
					});

					break;
				case "cloneable":
					domText.insertAdjacentElement({
						domTextEditor,
						position,
						target: dropedEl.getAttribute("element_id"),
						elementValue: dragedEl.outerHTML,
						metadata: { type: 'dnd' }
					});
				
					let clickEvent = new CustomEvent('click', { bubbles: true });
			        Object.defineProperty(clickEvent, 'target', { writable: false, value: dragedEl });
			        canvasDocument.dispatchEvent(clickEvent);
					break;
			}

		}
		catch(err) {
			console.log('domText: dom-to-text: ' + err)
		}

	}


	window.addEventListener("dndsuccess", onDnd);

	// dnd.initIframe(canvas);
	dnd.init({
		targetDocument: canvasDocument,
		onDrag: (element, request) => {
			// disable touch for dnd
			// element.style.touchAction = "none";

			for(let config of configMatch(elementConfig, element))
				for(let r of request)
					if(config[r] === true) {
						return [element, r];
					}
			else return;
		},
		onDrop: (detail) => {
			if(!detail.dragedEl.getAttribute("element_id"))
				detail.dragedEl.setAttribute("element_id", uuid.generate(6));
		},
	});



})
