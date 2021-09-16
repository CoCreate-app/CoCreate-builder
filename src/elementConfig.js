const elementConfig = [
  
    {
      selector: "*",
      draggable: true,
      droppable: true,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "html, head",
      droppable: true,
    },
    {
      selector: "body",
      droppable: true,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "h1, h2, h3, h4, h5, h6, p, span, blockquote",
      editable: true,
      draggable: true,
      selectable: true,
      hoverable: true,
      mouseover: true
    },
    {
      selector: "input, textarea, select",
      draggable: true,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "div.quill",
      draggable: true,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "div.nav",
      tagName: "navbar",
      draggable: true,
      droppable: true,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "div.floating-label_field",
      draggable: true,
      droppable: false,
      selectable: false,
      hoverable: false,
    },
    {
      selector: "div.ql-editor *",
      draggable: false,
      droppable: false,
      // selectable: false,
      // hoverable: false,
    },
    {
      tagName: "icon",
      selector: "a.menu_icon",
      editable: false,
      draggable: false,
      droppable: false,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "a.menu_icon span",
      selectable: false,
      hoverable: false,
    },
    {
      selector: "menu_icon.span",
      editable: false,
      draggable: false,
      droppable: false,
      selectable: false,
      hoverable: false,
      selectable2: true,
    },


  ].reverse();
  window.elementConfig = elementConfig;
  export default elementConfig;