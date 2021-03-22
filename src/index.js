// import '../../../CoCreate-components/CoCreate-render/src'
(async() => {
  import ('../../../CoCreateCSS/src')
  import ('../../../CoCreateJS/src')
  import ('../../../CoCreate-components/CoCreate-sidenav/src')
  import ('../../../CoCreate-components/CoCreate-modal/src')
  import ('../../../CoCreate-components/CoCreate-fetch/src')
  import ('../../../CoCreate-components/CoCreate-floating-label/src')
  import ('../../../CoCreate-components/CoCreate-htmltags/src')
})()
import domReader from '../../../CoCreate-components/CoCreate-domReader/src'
import attributes from '../../../CoCreate-components/CoCreate-attributes/src'
import observer from '../../../CoCreate-components/CoCreate-observer/src'
import vdom from '../../../CoCreate-components/CoCreate-vdom/src'
import selected from '../../../CoCreate-components/CoCreate-selected/src'
import toolbar from '../../../CoCreate-components/CoCreate-toolbar/src'
import crdt from '../../../CoCreate-components/CoCreate-crdt/src'
import dnd from '../../../CoCreate-components/CoCreate-dnd/src'
import domToText from '../../../CoCreate-components/CoCreate-domToText/src'
import { UUID, configMatch2 } from '../../../CoCreateJS/src/utils'

import elementConfig from './elementConfig';

function addScript(document, url) {
  let script = document.createElement("script");
  script.setAttribute('src', url)
  document.head.appendChild(script);
}

window.elementConfig = elementConfig;


let isDndFindDef = false;
let canvas, canvasDocument, canvasWindow, crdtCon;
let ccAttributes;

function resolveCanvas() {
  try {
    canvas = document.querySelector("#canvas");
    if (!canvas)
      console.error("builder config failed, can not find canvas iframe");

    crdtCon = {
      collection: canvas.getAttribute('data-collection'),
      document_id: canvas.getAttribute('data-document_id'),
      name: canvas.getAttribute('name'),

    };

    crdt.init(crdtCon);
    canvasWindow = canvas.contentWindow;
    canvasDocument = canvasWindow.document || canvas.contentDocument;
    canvasDocument.ccdefaultView = canvasWindow;

    domReader.register(canvasWindow)

    canvasWindow.addEventListener("load", (e) => initBuilder("iframe", e));
    canvasDocument.body.querySelectorAll('*')
      .forEach(el => el.getAttribute('data-element_id') || el.setAttribute('data-element_id', UUID()))
  }
  catch (error) {
    console.error("canvas not found init error", error, document.URL);
  }
}

function initAttributes() {

  // load cc attributes
  ccAttributes = attributes.init({
    document,
    exclude: '#ghostEffect,.vdom-item ',
    callback: ({
      value,
      type,
      property,
      element,
    }) => {
      if (canvasDocument.contains(element))
        domToText.domToText({
          method: type == 'attribute' ? 'setAttribute' : type, // todo: classstyle or class?
          property: property,
          target: element.getAttribute("data-element_id"),
          tagName: element.tagName,
          value,
          ...crdtCon
        })

    },
  });
}


let hasInit = false;

function init() {
  console.log('document init')
  resolveCanvas();
  hasInit = true;
}

// window.addEventListener("load", (e) => {
//   if(!canvas)
//     init()
// })


// window.addEventListener("CoCreateHtmlTags-rendered", async(e) => {


//   if (document.readyState === 'loading') {
//     try {
//       await new Promise((resolve, reject) => {
//         window.addEventListener('load', (e) => resolve())
//       });
//     }
//     catch (err) {
//       console.error('content load error')
//     }

//   }

//   if (!canvas)
//     init()
//   else {

//     if (ccAttributes)
//       ccAttributes.scanNewElement()
//   }



//   initAgain();


//   console.log('canvas reloaddedddddddddd')



//   // let canvas = document
//   //   .querySelector('iframe#canvas')
//   // canvas && canvas.removeAttribute("data-document_id");
// });
if (document.readyState === 'loading')
  window.addEventListener("load", (e) => {
    if (!hasInit) init()
  })
else if (!hasInit) 
  init()

window.addEventListener("CoCreateHtmlTags-rendered", async(e) => {
  console.log('init rendered')
  init()
  if (ccAttributes)
    ccAttributes.scanNewElement()
    else
    initAttributes();
  initAgain();
});



function initAgain() {
  // window.ss[i++] = window.CoCreateSelected.config ? true : false;
  console.log('init again')

  try {
    domReader.register(canvasWindow)

    if (!isDndFindDef) {
      isDndFindDef = true;
      window.addEventListener("dndsuccess", (e) => {

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

          dragNextSib = domToText.getNextSibling(dragedEl);
          dropNextSib = domToText.getNextSibling(dropedEl);
          dropedEl.insertAdjacentElement(position, dragedEl);
        }
        else if (!canvasDocument.contains(dropedEl)) return; //probably not necss since we fixed groups
        switch (dropType) {
          case "data-draggable":
            domToText.domToText({
              method: "insertAdjacentElement",
              property: position,
              target: {
                target: dropedEl.getAttribute("data-element_id"),
                tagName: dropedEl.tagName,
                nextSibling: dropNextSib[0],
                skip: dropNextSib[1],
              },
              element: {
                target: dragedEl.getAttribute("data-element_id"),
                tagName: dragedEl.tagName,
                nextSibling: dragNextSib[0],
                skip: dragNextSib[1],
              },
              ...crdtCon
            });

            break;
          case "data-cloneable":
            domToText.domToText({
              method: "insertAdjacentElement",
              property: position,
              target: {
                target: dropedEl.getAttribute("data-element_id"),
                tagName: dropedEl.tagName,
                nextSibling: dropNextSib[0],
                skip: dropNextSib[1],
              },
              element: {
                value: dragedEl.outerHTML,
              },
              ...crdtCon
            });
            break;
        }
      });
    }

    dnd.initIframe({ isIframe: true, frame: canvas });
    dnd.init({
      mode: 'function',
      target: canvasDocument.body,
      onDnd: (element, request) => {
        // disable touch for dnd
        // element.style.touchAction = "none";

        for (let config of configMatch2(elementConfig, element))
          for (let r of request)
            if (config[r.substr(5)] === true) return [element, r];
            else return;
      },
      onDndSuccess: (detail) => {
        detail.dragNextSib = domToText.getNextSibling(detail.dragedEl);
        detail.dropNextSib = domToText.getNextSibling(detail.dropedEl);
        if (!detail.dragedEl.getAttribute("data-element_id"))
          detail.dragedEl.setAttribute("data-element_id", UUID());
      },
    });
  }
  catch (error) {
    console.error("ccAttribute init error", error);

  }


  // try {

  toolbar.init({
    selector: "#selectedElementcoc",
    eventType: "click",
    config: elementConfig,
    configKey: "selectable",
    document: canvasDocument,
    window: canvasWindow
  });

  toolbar.init({
    selector: "#hoveredElementcoc",
    eventType: "mouseover",
    config: elementConfig,
    configKey: "hoverable",
    document: canvasDocument,
    window: canvasWindow
  });
  // }
  // catch (error) {
  //   console.log('aaa', canvasDocument)
  //   // throw new Error(error)
  //   // console.error("toolbar init error", error, document.URL);
  // }


  try {
    selected.config({
      srcDocument: canvasDocument,
      destDocument: document,
      selector: "*",
      target: "[data-attributes]:not(.styleunit)",
      callback: (element, target) => {
        target.setAttribute('name', target.id + '-' + element.getAttribute('data-element_id'))
        target.setAttribute('data-attributes_target', `#${canvas.id};[data-element_id=${element.getAttribute('data-element_id')}]`);
      }
    });

  }
  catch (error) {
    console.error("selected2 init error", error, document.URL);
  }

  // initvdom
  try {
    let vdomTargets = document.querySelector("[data-vdom_target]");
    let vdomRealDom = document.querySelector("[data-vdom_id]");
    vdomRealDom = vdomRealDom.contentDocument.body.parentNode;
    vdomTargets.innerText = "";
    if (vdomRealDom && vdomTargets)
      window.vdomObject = vdom.initVdom({
        realdom: vdomRealDom,
        virtualDom: vdomTargets,
        ignore: '#dropMarker, script'
      });

  }
  catch (error) {
    console.error("vdom init error", error, document.URL);
  }

}


export default { crdt }
