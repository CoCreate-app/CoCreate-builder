import resolveCanvas from './resolveCanvas';
import crdt from '@cocreate/crdt';
import domText from './initDomText';
import elementConfig from '../elementConfig';
// import { configMatch } from '@cocreate/utils';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	const domTexti = await domText;

	canvasDocument.addEventListener('dblclick', (e) => {
		let element = e.target;
		if(element.matches('input, textarea', 'select')) return;
		if(element.hasAttribute('contenteditable')) return;
		
		element = checkParent(element);
		
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

		element.addEventListener('input', () => {
			domTexti.setInnerText({ target: id, value: element.innerHTML, avoidTextToDom: true });
		});

	});
	
	function checkParent(element, selectors){
	    selectors = 'h1, h2, h3, h4, h5, h6, p, span, blockquote';
	    let parentElement;
	    do {
		    if(element.parentElement.matches(selectors)) {
	    		parentElement = element.parentElement;
		    } else {
				parentElement = element.closest(selectors)
				if (parentElement == element) return element;
		    }
		    element = parentElement;
	    } while (parentElement);
	}
	
	function checkElementConfig(element, options){
		for(let config of configMatch(elementConfig, element)) {
			for(let option of options) {
				if(config[option] === true) {
					return true;
				}
				else return false;
			}
		}
	}
	
	function* configMatch(elementConfig, element) {
	  for (let config of elementConfig) {
	    // if (!Array.isArray(config.selector))
	    //   config.selector = [config.selector];
	
	    if (config.selector && element.matches(config.selector)) yield config;
	  }
	  return;
	}

});
