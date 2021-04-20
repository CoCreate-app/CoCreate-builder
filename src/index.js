// import '@cocreate/render/src'
(async() => {
  // lazy loading because of webpack warning for large bundle size

  import ('@cocreate/sidenav')
  import ('@cocreate/modal')
  import ('@cocreate/fetch')
  import ('@cocreate/floating-label')
  import ('@cocreate/htmltags')
  import ('@cocreate/input')
  import ('@cocreate/text')
  import ('@cocreate/cursors')

})()
import ccCss from '@cocreate/cocreatecss';
import './style.css'

import attributes from '@cocreate/attributes'
import observer from '@cocreate/observer'
import vdom from '@cocreate/vdom'
import selected from '@cocreate/selected'
import toolbar from '@cocreate/toolbar'
import crdt from '@cocreate/crdt'
import input from '@cocreate/input'
import text from '@cocreate/text'
import cursors from '@cocreate/cursors'
import dnd from '@cocreate/dnd'
// import domReader from '@cocreate/dnd/util/domReader'
import domToText from '@cocreate/dom-to-text'
import select from '@cocreate/select'
import { UUID, configMatch } from '@cocreate/utils'

import elementConfig from './elementConfig';

function addScript(document, url) {
  let script = document.createElement("script");
  script.setAttribute('src', url)
  document.head.appendChild(script);
}

window.elementConfig = elementConfig;


let isDndFindDef = false;
let canvas, canvasDocument, canvasWindow, crdtCon, linkCrdtCon;
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

    let link = document.querySelector('link[data-collection][data-document_id][name]')
    linkCrdtCon = 
    {
        collection: link.getAttribute('data-collection'),
      document_id: link.getAttribute('data-document_id'),
      name: link.getAttribute('name'),
    }
    
     crdt.init(linkCrdtCon);
    // domReader.register(canvasWindow)

    // canvas get load event sooner then parent so it will not get change to execute
    // canvasWindow.addEventListener("load", (e) => initBuilder("iframe", e));

    // uuid should be changed in server before loading    
    // canvasDocument.body.querySelectorAll('*')
    //   .forEach(el => el.getAttribute('data-element_id') || el.setAttribute('data-element_id', UUID()))
  }
  catch (error) {
    console.error("canvas not found init error", error, document.URL);
  }
}

function initAttributes() {

  // load cc attributes
  ccAttributes = attributes.init({
    document,
    exclude: '#ghostEffect, .vdom-item, #selectedElementcoc, #hoveredElementcoc',
    callback: ({
      value,
      type,
      property,
      element,
      unit
    }) => {
      if (canvasDocument.contains(element))
        domToText.domToText({
          method: type == 'attribute' ? 'setAttribute' : type,
          property: property,
          target: element.getAttribute("data-element_id"),
          tagName: element.tagName,
          value: value,
          unit,
          ...crdtCon
        })

    },
  });
}

console.log('dnd loaded start')
let hasInit = false;

function init() {
  console.log('dnd loaded init')
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
  let { window } = e.detail;
  console.log('dnd loaded CoCreateHtmlTags-rendered', window.document);
  console.log('dnd loaded ', window.document.readyState)

  renderIframe(window);
  // setTimeout(()=> {
  //     if (window.document.readyState != 'complete')
  //   window.addEventListener("load", () => {
  //       setTimeout(()=> {renderIframe(window);}, 1)

  //   });
  // else
  //   renderIframe(window);

  // }, 1)

});

function renderIframe(window) {



  console.log('dnd loaded CoCreateHtmlTags-rendered', window)


  // init iframe
  init()

  // init ccCss
  ccCss.setOnStyleChange(function(isFirst, styleList) {
    crdt.replaceText({ ...linkCrdtCon, name: 'css', value: styleList.join('\r\n') })
  })



  // init ccAttribute
  if (ccAttributes)
    ccAttributes.scanNewElement()
  else
    initAttributes();


  // init other components
  initAgain();
}

function initAgain() {
  resolveCanvas()
  console.log('dnd loaded initAgain')
  // window.ss[i++] = window.CoCreateSelected.config ? true : false;
  console.log('init again')

  try {
    // domReader.register(canvasWindow)

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

        for (let config of configMatch(elementConfig, element))
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
  });

  toolbar.init({
    selector: "#hoveredElementcoc",
    eventType: "mouseover",
    config: elementConfig,
    configKey: "hoverable",
    document: canvasDocument,
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
