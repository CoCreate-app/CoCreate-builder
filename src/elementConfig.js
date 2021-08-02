const elementConfig = [
  
  // {
  //   selector:  'div [resize_handle]',
  //   resizeLeft: '[resize_handle="left"]'
  // },
  
  {
      selector: "*",
      editable: false,
      draggable: true,
      droppable: true,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "h1, h2, h3, h4, h5, h6, p, span, blockquote",
      editable: true,
      draggable: true,
      droppable: false,
      selectable: true,
      hoverable: true,
    },
    {
      selector: "input",
      editable: false,
      draggable: false,
      droppable: false,
    },
    {
      selector: "textarea",
      editable: false,
    },
    {
      selector: "select",
      editable: false,
    },
    {
      selector: "div.quill",
      draggable: true,
      droppable: false,
      selectable: true,
      hoverable: false,
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