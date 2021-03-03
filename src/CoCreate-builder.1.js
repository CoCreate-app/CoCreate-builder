      callback: ({
        value,
        unit,
        dataProperty,
        dataAttribute,
        element,
      }) => {
        dataAttribute === "classstyle" ?
          CoCreate.domToText.domToText({
            method: "classstyle", // todo: classstyle or class?
            property: dataProperty,
            target: element.getAttribute("data-element_id"),
            tagName: element.tagName,
            value: value + unit,
            ...crdtCon
          }) :
          CoCreate.domToText.domToText({
            method: "style",
            property: dataProperty,
            target: element.getAttribute("data-element_id"),
            tagName: element.tagName,
            value: value + unit,
            name: crdtCon.name,
            collection: crdtCon.collection,
            document_id: crdtCon.document_id
          },);
      },

function addScript(document, url) {
  let script = document.createElement("script");
  script.setAttribute('src', url)
  document.head.appendChild(script);
}
window.elementConfig = elementConfig;

let canvasHtmlTagEvnt = false;
window.testMap = new Map();
window.addEventListener("load", () => {

  initBuilder();
});


window.addEventListener("CoCreateHtmlTags-rendered", (e) => {
  initBuilder();

  // let canvas = document
  //   .querySelector('iframe#canvas')
  // canvas && canvas.removeAttribute("data-document_id");
});



function initCanvas() {

  CoCreate.observer.init({
    name: "quill",
    observe: ["childlist"],
    include: ".quill",
    callback: (mutationsList) => {
      console.log(mutationsList);
    },
  });
}

let crdtCon;
let isDndFindDef = false;
let canvas, canvasDocument, canvasWindow;


window.ss = {};
let i = 1;

function initBuilder() {
  // window.ss[i++] = window.CoCreateSelected.config ? true : false;
  try {
    canvas = document.querySelector("#canvas");
    if (!canvas)
      console.error("builder config failed, can not find canvas iframe");

    crdtCon = {
      collection: canvas.getAttribute('data-collection'),
      document_id: canvas.getAttribute('data-document_id'),
      name: canvas.getAttribute('name'),

    };

    CoCreate.crdt.init(crdtCon);
    canvasWindow = canvas.contentWindow;
    canvasDocument = canvasWindow.document || canvas.contentDocument;

    CoCreate.domReader.register(CoCreate.domReader.domContext, canvasWindow)

    canvasWindow.addEventListener("load", (e) => initBuilder("iframe", e));
    canvasDocument.body.querySelectorAll('*')
      .forEach(el => el.getAttribute('data-element_id') || el.setAttribute('data-element_id', CoCreate.utils.UUID()))
  }
  catch (error) {
    console.error("canvas not found init error", error, document.URL);
  }

  try {
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

          dragNextSib = CoCreate.domToText.getNextSibling(dragedEl);
          dropNextSib = CoCreate.domToText.getNextSibling(dropedEl);
          dropedEl.insertAdjacentElement(position, dragedEl);
        }
        else if (!canvasDocument.contains(dropedEl)) return; //probably not necss since we fixed groups
        switch (dropType) {
          case "data-draggable":
            CoCreate.domToText.domToText({
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
            CoCreate.domToText.domToText({
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

    CoCreate.dnd.initIframe({ isIframe: true, frame: canvas });
    CoCreate.dnd.init({
      mode: 'function',
      target: canvasDocument.body,
      onDnd: (element, request) => {
        // disable touch for dnd
        // element.style.touchAction = "none";

        for (let config of CoCreate.utils.configMatch2(elementConfig, element))
          for (let r of request)
            if (config[r.substr(5)] === true) return [element, r];
            else return;
      },
      onDndSuccess: (detail) => {
        detail.dragNextSib = CoCreate.domToText.getNextSibling(detail.dragedEl);
        detail.dropNextSib = CoCreate.domToText.getNextSibling(detail.dropedEl);
        if (!detail.dragedEl.getAttribute("data-element_id"))
          detail.dragedEl.setAttribute("data-element_id", CoCreate.utils.UUID());
      },
    });
  }
  catch (error) {
    console.error("ccAttribute init error", error);

  }

  try {

    CoCreate.styles.init({
      exclude : "#ghostEffect,.vdom-item ",
      document: canvasDocument,
      callback: ({
        value,
        unit,
        dataProperty,
        dataAttribute,
        element,
      }) => {
        dataAttribute === "classstyle" ?
          CoCreate.domToText.domToText({
            method: "classstyle", // todo: classstyle or class?
            property: dataProperty,
            target: element.getAttribute("data-element_id"),
            tagName: element.tagName,
            value: value + unit,
            ...crdtCon
          }) :
          CoCreate.domToText.domToText({
            method: "style",
            property: dataProperty,
            target: element.getAttribute("data-element_id"),
            tagName: element.tagName,
            value: value + unit,
            name: crdtCon.name,
            collection: crdtCon.collection,
            document_id: crdtCon.document_id
          },);
      },
    });
  }
  catch (error) {
    console.log("ccAttribute init error", error, document.URL);
  }


  // try {

  //   CoCreate.attributes.init({
  //     exclude: '#ghostEffect, .vdom-item',
  //     document: canvasDocument,
  //     callback: ({ property, value, element }) => {
  //       if(canvasDocument.contains(element))
  //         CoCreate.domToText.domToText({
  //           method: "setAttribute",
  //           property: property,
  //           target: element.getAttribute("data-element_id"),
  //           tagName: element.tagName,
  //           value,
  //           ...crdtCon
  //         });
  //     },
  //   });
  // }
  // catch (error) {
  //   console.error("ccAttribute init error", error, document.URL);
  // }

  try {
    
    CoCreate.toolbar.init({
      selector: "#selectedElementcoc",
      eventType: "click",
      config: elementConfig,
      configKey: "selectable",
      document: canvasDocument,
    });

    CoCreate.toolbar.init({
      selector: "#hoveredElementcoc",
      eventType: "mouseover",
      config: elementConfig,
      configKey: "hoverable",
      document: canvasDocument,
    });
  }
  catch (error) {
    console.error("toolbar init error", error, document.URL);
  }

  try {
    CoCreate.selected.config({
      srcDocument: canvasDocument,
      destDocument: document,
      selector: "*",
      target: "[data-attribute_sync]:not(.styleunit), [data-style]:not(.styleunit)",
      callback: (element, target) =>
        target.setAttribute('name', target.id + '-' + element.getAttribute('data-element_id'))
    });

    // CoCreate.selected.config({
    //   srcDocument: canvasDocument,
    //   destDocument: document,
    //   selector: "*",
    //   target: "[data-style]:not(.styleunit)",
    //   callback: (element, target) =>
    //     target.setAttribute('data-style_target', `[data-element_id=${element.getAttribute('data-element_id')}]`)
    // });
    
    // make ccAttribute work
    // CoCreate.selected.config({
    //   srcDocument: canvasDocument,
    //   destDocument: document,
    //   selector: "*",
    //   target: "[data-attribute_sync]:not(.styleunit)",
    //   srcAttribute: "data-element_id",
    //   destAttribute: "data-attributes_target",
    //   wrap: "[data-element_id=$1]",
    // });
    CoCreate.selected.config({
      srcDocument: canvasDocument,
      destDocument: document,
      selector: "*",
      target: "[data-attributes_sync]:not(.styleunit)",
      callback: (element, target) =>
        target.setAttribute('data-attributes_target', `iframe#${canvas.id};[data-element_id=${element.getAttribute('data-element_id')}]`)
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
      window.vdomObject = CoCreate.vdom.initVdom({
        realdom: vdomRealDom,
        virtualDom: vdomTargets,
        ignore: '#dropMarker, script'
      });

  }
  catch (error) {
    console.error("vdom init error", error, document.URL);
  }

}
