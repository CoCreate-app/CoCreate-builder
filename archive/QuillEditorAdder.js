let canvasSelector = "#canvas";
let canvas, canvasDocument, canvasWindow;

function QuillEditorAdder() {
  // this.lastPlacement;

  this.quill = document.createElement("div");
  this.quill.setAttribute("class", "quill bubble block-observer");
  this.quill.setAttribute("data-theme", "bubble");

  this.quill.setAttribute("data-document_id", "null");
  this.quill.setAttribute("data-collection", "12test");

  this.wrapQuill = function (el) {
    if (!this.quill.children.length) {
        this.quill.setAttribute("name", el.getAttribute('data-element_id'));
      this.quill.append(el.cloneNode(true));
      el.replaceWith(this.quill);
      
            
      
      // it's always editor 0
      let quill = canvasWindow.CoCreateQuill;

      quill.onNewEditor = function (editor) {
        canvasWindow.CoCreateQuill.editors[0].clipboard.dangerouslyPasteHTML(el.outerHTML)
      };
      
      
      
      // it's always editor 0
      // let quill = canvasWindow.CoCreateQuill;

      // quill.onNewEditor = function (editor) {
      // for every change in quill get the elements and update using crdt
      //   editor.on("text-change", function () {
      //     let quillEl = quill.elements[0];
      //     let [nextSibling, skip] = getNextSibling(quillEl)
      //     // el = quillEl;
      //     // do{
      //     //if (el.previousSibling) {
      //     //   el = el.previousSibling;
      //     //   position = "afterend";
      //     // } else {
      //     //   el = el.parentElement;
      //     //   position = "afterbegin";
      //     // }
      //     // }while(!el.getAttribute)


      //     sendCrdtPayload(
      //       {
      //         method: "insertAdjacentElement",
      //         property: 'beforebegin',
      //         target: {
      //           target: el.getAttribute("data-element_id"),
      //           tagName: el.tagName,
      //           nextSibling: nextSibling.getAttribute("data-element_id"),
      //           skip,
      //         },
      //         element: {
      //           value: quillEl.querySelector(":scope > .ql-editor").innerHTML,
      //         },
      //       },
      //       {
      //         collection: "module_activities",
      //         document_id: "5edda7608d5c7a7d656edecd",
      //         name: "html",
      //       }
      //     );
      //   });
      // };
      
      
    }
  };
  
  this.unwrapQuill = function (target) {
    if (!this.quill.contains(target)) {
      //if we don't click inside quill
      let content = this.quill.querySelector(":scope > .ql-editor");
      if (content) this.quill.replaceWith(...content.children);
      this.quill.innerHTML = "";
    }
  };
}

function load() {
  let q = new QuillEditorAdder();

  canvas = document.querySelector(canvasSelector);
  canvasWindow = canvas.contentWindow;
  canvasDocument = canvasWindow.document || canvas.contentDocument;

  canvasDocument.addEventListener("dblclick", (e) => {
    CoCreateUtils.configExecuter(e.target, "editable", (el) => q.wrapQuill(el));
    // for (let config of window.cc.configMatch(window.elementConfig, e.target))
    //   if (config.selectable === true) q.wrapQuill(e.target);
    //   else if(config.selectable === false) return;
    //   else if(config.selectable === undefined) continue;
    //   else if (window.cc.isValidSelector(config.selectable)) {
    //     window.cc.findElement(canvasDocument, config.selectable, el => q.wrapQuill(el))
    //   }
    //   else
    //   console.warn('builder: ', 'wrong element config ', config);
  });
  canvasDocument.addEventListener("click", (e) => {
    q.unwrapQuill(e.target);
  });
  //   document.addEventListener("click", (e) => {
  //     // e.target.dispatchEvent(new Event('dblclick'), {bubble: true})
  //     q.unwrapQuill(e.target);
  //   });
  //   document.addEventListener("dblclick", (e) => {
  //     q.wrapQuill(e.target);
  //   });
}

window.addEventListener("load", load);
window.addEventListener("CoCreateHtmlTags-rendered", load);
