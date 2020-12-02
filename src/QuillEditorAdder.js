let canvasSelector = "#canvas";
function QuillEditorAdder() {
  // this.lastPlacement;

  this.quill = document.createElement("div");
  this.quill.setAttribute("class", "quill bubble");
  this.quill.setAttribute("data-theme", "bubble");

  this.wrapQuill = function (el) {
    if (!this.quill.children.length) {
      this.quill.append(el.cloneNode(true));
      el.replaceWith(this.quill);
    }
  };
  this.unwrapQuill = function (target) {
    if (!this.quill.contains(target)) {

      let content = this.quill.querySelector(':scope > .ql-editor');
      if(content)
      this.quill.replaceWith(...content.children);
      this.quill.innerHTML = "";
    }
  };
}

function load() {
  let q = new QuillEditorAdder();
  let canvas = document.querySelector(canvasSelector);
  let canvasWindow = canvas.contentWindow;
  let canvasDocument = canvasWindow.document || canvas.contentDocument;

  canvasDocument.addEventListener("dblclick", (e) => {
    CoCreateUtils.configExecuter(e.target, 'editable', el => q.wrapQuill(el))
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
