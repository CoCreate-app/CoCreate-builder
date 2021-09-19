import elementConfig from '../elementConfig';

	function getSelectors(){
		let selectors;
		return selectors;
	}
	
	function checkParent(element, selectors){
	    let parentElement;
	    do {
	    	parentElement = element.parentElement.closest(selectors);
	    	if(parentElement) {
		    	element = parentElement;
		    } else {
				return element;
		    }
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


export {checkElementConfig, checkParent, getSelectors};