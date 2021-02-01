import elementConfig from './elementConfig';

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

    let canvas = document
      .querySelector('iframe#canvas')
    canvas && canvas.removeAttribute("data-document_id");
  });



  function initCanvas() {

    window.CoCreateObserver.add({
      name: "quill",
      observe: ["childlist"],
      include: ".quill",
      task: (mutationsList) => {
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
      // domEditor({
      //   context: canvasDocument,
      //   selector_type: "querySelectorAll",
      //   selector: "*",
      //   idGenerator: CoCreate.utils.UUID,
      // });
    }
    catch (error) {
      console.error("canvas not found init error", error , document.URL);
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
            dropNextSib,
          } = e.detail;

          // check if it's out side of dnd
          if (dropedEl.classList.contains('vdom-item')) {
            let id = dropedEl.getAttribute("data-element_id");
            dropedEl = canvasDocument.querySelector(`[data-element_id="${id}"]`)
            id = dragedEl.getAttribute("data-element_id");
            dragedEl = canvasDocument.querySelector(`[data-element_id="${id}"]`)
            
          dragNextSib = window.getNextSibling(dragedEl);
          dropNextSib = window.getNextSibling(dropedEl);
          }
          else if (!canvasDocument.contains(dropedEl)) return;
          switch (dropType) {
            case "data-draggable":
              CoCreate.findPosition.sendCrdtPayload({
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
              }, crdtCon);

              break;
            case "data-cloneable":
              CoCreate.findPosition.sendCrdtPayload({
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
              }, crdtCon);
              break;
          }
        });
      }

    CoCreate.dnd.initIframe({ isIframe: true, frame: canvas });
    CoCreate.dnd.initFunction({
        target: canvasDocument.body,
        onDnd: (element, request) => {
          //disable touch for dnd
          // element.style.touchAction = "none";

          for (let config of CoCreate.utils.configMatch(elementConfig, element))
            for (let r of request)
              if (config[r.substr(5)] === true) return [element, r];
              else return;
        },
        beforeDndSuccess: (detail) => {
          detail.dragNextSib = CoCreate.findPosition.getNextSibling(detail.dragedEl);
          detail.dropNextSib = CoCreate.findPosition.getNextSibling(detail.dropedEl);
          if (!detail.dragedEl.getAttribute("data-element_id"))
            detail.dragedEl.setAttribute("data-element_id", CoCreate.utils.UUID());
        },
      });
    }
    catch (error) {
      console.error("ccAttribute init error", error);

    }

    try {
      CoCreate.style.addFilter(".vdom-item");
      CoCreate.style.addFilter("#ghostEffect");
      CoCreate.style.init({
        isIframe: true,
        frame: canvas,
        onCollaboration: ({
          value,
          unit,
          dataProperty,
          dataAttribute,
          element,
        }) => {
          dataAttribute === "classstyle" ?
            CoCreate.findPosition.sendCrdtPayload({
              method: "classstyle",
              property: dataProperty,
              target: element.getAttribute("data-element_id"),
              tagName: element.tagName,
              value,
              unit,
            }, crdtCon) :
            CoCreate.findPosition.sendCrdtPayload({
              method: "style",
              property: dataProperty,
              target: element.getAttribute("data-element_id"),
              tagName: element.tagName,
              value,
              unit,
            }, crdtCon);
        },
      });
    }
    catch (error) {
      console.log("ccAttribute init error", error, document.URL);
    }


    try {
      CoCreate.attributes.addFilter(".vdom-item");
      CoCreate.attributes.addFilter("#ghostEffect");
      CoCreate.attributes.init({
        isIframe: true,
        frame: canvas,
        onCollaboration: ({ read, value, element }) => {
          CoCreate.findPosition.sendCrdtPayload({
            method: "setAttribute",
            property: read,
            target: element.getAttribute("data-element_id"),
            tagName: element.tagName,
            value,
          }, crdtCon);
        },
      });
    }
    catch (error) {
      console.error("ccAttribute init error", error, document.URL);
    }

    try {
      CoCreateToolbar.init({
        selector: "#selectedElementcoc",
        event: "click",
        config: elementConfig,
        configKey: "selectable",
        frame: canvas,
      });

      CoCreateToolbar.init({
        selector: "#hoveredElementcoc",
        event: "mouseover",
        config: elementConfig,
        configKey: "hoverable",
        frame: canvas,
      });
    }
    catch (error) {
      console.error("toolbar init error", error, document.URL);
    }

    try {
      CoCreateSelected.config({
        sourceDocument: canvasDocument,
        destDocument: document,
        elementSelector: "*",
        targetSelector: "[data-attribute_sync]:not(.styleunit), [data-style]:not(.styleunit)",
        source: "data-element_id",
        destination: "name",
        newValueCB: (src, dest, srcValue) => dest.id + '-' + srcValue
      });

      // init selected
      // make CoCreateStyle work
      CoCreateSelected.config({
        sourceDocument: canvasDocument,
        destDocument: document,
        elementSelector: "*",
        targetSelector: "[data-style]:not(.styleunit)",
        source: "data-element_id",
        destination: "data-style_target",
        wrap: "[data-element_id=$1]",
      });

      // make ccAttribute work
      CoCreateSelected.config({
        sourceDocument: canvasDocument,
        destDocument: document,
        elementSelector: "*",
        targetSelector: "[data-attribute_sync]:not(.styleunit)",
        source: "data-element_id",
        destination: "data-attribute_target",
        wrap: "[data-element_id=$1]",
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
        });

    }
    catch (error) {
      console.error("vdom init error", error, document.URL);
    }

  }



