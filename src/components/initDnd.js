import dnd from '@cocreate/dnd';
import { configMatch } from '@cocreate/utils';
import uuid from '@cocreate/uuid';
import elementConfig from '../elementConfig';
import resolveCanvas from './resolveCanvas';
import domText from './initDomText';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
  const domTexti = await domText;


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
    if (dropedEl.classList.contains('vdom-item')) {
      let id = dropedEl.getAttribute("data-element_id");
      dropedEl = canvasDocument.querySelector(`[data-element_id="${id}"]`)
      id = dragedEl.getAttribute("data-element_id");
      dragedEl = canvasDocument.querySelector(`[data-element_id="${id}"]`)


      dropedEl.insertAdjacentElement(position, dragedEl);
    }
    else if (!canvasDocument.contains(dropedEl)) return; //probably not necss since we fixed groups
    try {
      switch (dropType) {
        case "draggable":
          domTexti.insertAdjacentElement({
            position,
            target: dropedEl.getAttribute("data-element_id"),
            element: dragedEl.getAttribute("data-element_id"),
            metadata: { type: 'dnd' }
          });

          break;
        case "cloneable":
          domTexti.insertAdjacentElement({
            position,
            target: dropedEl.getAttribute("data-element_id"),
            elementValue: dragedEl.outerHTML,
            metadata: { type: 'dnd' }
          });
          break;
      }

    }
    catch (err) {
      console.log('domText: dom-to-text: ' + err)
    }

  }


  window.addEventListener("dndsuccess", onDnd);


  dnd.initIframe({ isIframe: true, frame: canvas });
  dnd.init({
    mode: 'function',
    target: canvasDocument,
    onDnd: (element, request) => {
      // disable touch for dnd
      // element.style.touchAction = "none";
  
      for (let config of configMatch(elementConfig, element))
        for (let r of request)
          if (config[r] === true) {
            return [element, r];
          }
          else return;
    },
    onDndSuccess: (detail) => {
      if (!detail.dragedEl.getAttribute("data-element_id"))
        detail.dragedEl.setAttribute("data-element_id", uuid.generate(6));
    },
  });



})
