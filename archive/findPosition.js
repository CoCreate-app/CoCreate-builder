// let html = `
// 	<html>
// 	<head>
    // <link rel=stylesheet href="//cdn.quilljs.com/1.3.6/quill.snow.css" async defer>
    // <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.bubble.css">
    // <link rel="stylesheet" href="https://server.cocreate.app/css/CoCreate.min.css" type="text/css" />
      

// 	</head>
// <style> 
//   .quill[data-theme=bubble].ql-container {
//     overflow: visible!important;
//   }
//   .quill[data-theme=bubble] .ql-editor{
//     padding:0px;
//   }
// </style>

// 	<body style="margin:0; padding:1;">
// 			<h1 data-element_id="t01" name="3" class="aa bb  padding:5px">test 0</h1>
// 			<h1 data-element_id="t11" name="4">test 1</h1>
// 			<h1 data-element_id="t21" name="6">test 2</h1><!--hello-->
// 			<h1 data-element_id="t31" name="7">test 3</h1>

//     <script data-element_id="script1">
//       var config = {
//         apiKey: 'c2b08663-06e3-440c-ef6f-13978b42883a',
//         securityKey: 'f26baf68-e3a9-45fc-effe-502e47116265',
//         organization_Id: '5de0387b12e200ea63204d6c'
//       }
//     </script>


//   <!--CoCreateJS-->
//   <script data-element_id="script2" src="https://server.cocreate.app/js/CoCreate.min.js"></script>
    // <script type="text/javascript" src="../dist/CoCreate-quill.js" async></script>

// 	</body>
// 	</html>
// `;
// style>>>>>>>>>>>>
// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "style",
//   property: "margin-left",
//   value:'5568',
//   unit: 'px'
// });

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "style",
//   property: "margin-left",
//   value:'1111',
//   unit: 'px'
// });
// class >>>>>>>>>>

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "class",
//   property: "className2",
// value: true,
// });
// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "class",
//   property: "className1",
// value: true,
// });

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "class",
//   property: "className2",
//   value: false,
// });

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "class",
//   property: "className2",
//   value: false,
// });

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "class",
//   property: "className1",
//   value: false,
// });

// attribute

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "setAttribute",
//   property: "myAttribute",
//   value: 'hehehe',
// });

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "setAttribute",
//   property: "myAttribute",
//   value: '1123',
// });
// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "removeAttribute",
//   property: "myAttribute",

// });
// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "setAttribute",
//   property: "myAttribute",
//   value: 'xxxx',
// });

// remove

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "removeElement",
//   nextSibling: 't11',
//   skip:0
// });

// insertAdjacentElement
// sendCrdtPayload({
//   method: "insertAdjacentElement",
//   property: "afterend",
//   target: {
//     // is going to be appended
//     tagName: "h1",
//     target: "t01",
//     nextSibling: "t11",
//     skip: 0,
//   },
//   element: {
//     // is going to be removed
//     // either this
//     tagName: "h1",
//     target: "t21",
//     nextSibling: "t31",
//     skip: 0,
//     // or
//     // value: "<ssss/>",
//   },
// });

//classstyle
// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "classstyle",
//   property: "padding",
//   value:'22',
//   unit: 'px',
// });

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "classstyle",
//   property: "margin",
//   value:'22',
//   unit: 'px',
// });

// sendCrdtPayload({
//   tagName: "h1",
//   target: "t01",
//   method: "classstyle",
//   property: "padding",
//   value:'100',
//   unit: '%',
// });

function getNextSibling(element) {
  let i = 0,
    tagName = element.tagName;
  while (element && !element.nextElementSibling) {
    element = element.parentElement;
    if (element.tagName === tagName) i++;
  }
  // if (element.nextElementSibling.tagName === tagName) i++;
  if (element)
    return [element.nextElementSibling.getAttribute("data-element_id"), i];
  else return [undefined, undefined];
}
  
String.prototype.replaceAt = function (index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index);
};
String.prototype.removeAt = function (index, to) {
  return this.substr(0, index) + this.substr(to);
};

// function write(crdt, string, value, from, to) {
//   if (value) {
//     console.log(
//       "adding ",
//       string.substring(from - 20, from) +
//         "\x1b[31m<here>\x1b[0m" +
//         string.substring(from, from + 20)
//     );
//     string = string.replaceAt(from, value);
//     console.log("current: ", string.substring(from - 70, from + 90));
//     return string;
//   } else {
//     console.log(
//       "removing ",
//       string.substring(from - 30, from) +
//         "\x1b[31m<from>\x1b[0m" +
//         string.substring(from, to) +
//         "\x1b[31m<to>\x1b[0m" +
//         string.substring(to, to + 30)
//     );
//     string = string.removeAt(from, to);
//     console.log("current: ", string.substring(from - 70, from + 90));
//     return string;
//   }
// }

function write(crdt, string, value, from, to) {
  if (value) {
    CoCreate.insertDataCrdt({
      ...crdt,
      value: value,
      position: from,
    });
  } else {
    CoCreate.deleteDataCrdt({
      ...crdt,
      position: from,
      length: to - from,
    });
  }
}

function sendCrdtPayload(findPos,crdt) {
  let html = CoCreate.getDataCrdt(crdt);
  let pos1, pos2, content;
  switch (findPos.method) {
    case 'innerText':
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        nextSibling: findPos.nextSibling,
        skip: findPos.skip,
        method: "innerText",
      });
      html = write(crdt, html, findPos.value, pos1.from, pos1.to);
      break;
    case "removeElement":
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        nextSibling: findPos.nextSibling,
        skip: findPos.skip,
        method: "removeElement",
      });
      html = write(crdt, html, null, pos1.from, pos1.to);
      break;
    case "insertAdjacentElement":
      pos2 = new findPosition({
        html,
        tagName: findPos.target.tagName,
        target: findPos.target.target,
        nextSibling: findPos.target.nextSibling,
        skip: findPos.target.skip,
        method: "insertAdjacentElement",
        property: findPos.property,
      });

      if (!findPos.element.value) {
        pos1 = new findPosition({
          html,
          tagName: findPos.element.tagName,
          target: findPos.element.target,
          nextSibling: findPos.element.nextSibling,
          skip: findPos.element.skip,
          method: "removeElement",
        });
        content = html.substring(pos1.from, pos1.to);
        if (pos2.from >= pos1.to) {
          pos2.from -= pos1.to - pos1.from;
        }
        html = write(crdt, html, null, pos1.from, pos1.to);
      } else content = findPos.element.value;

      html = write(crdt, html, content, pos2.from);
      break;
    case "style":
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        property: findPos.property,
        method: "style",
      });

      let style = ` ${findPos.property}:${findPos.value}${findPos.unit};`;

      if (pos1.context == "attribute") content = ` style="${style}"`;
      else if (pos1.context == "value") {
        if (pos1.to) {
          if (!findPos.value) {
            html = write(crdt, html, null, pos1.from, pos1.to);
            return;
          }
        }
        content = style;
        if (pos1.to) {
          html = write(crdt, html, null, pos1.from, pos1.to);
        }
      }
      html = write(crdt, html, content, pos1.from);

      break;
    case "classstyle":
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        property: findPos.property,
        method: "class",
      });
      console.log("context: ", pos1);
      content = ` ${findPos.property}:${findPos.value}${findPos.unit}`;
      if (pos1.context == "attribute") {
        content = ` class="${content}"`;
        html = write(crdt, html, content, pos1.from);
      } else if (pos1.context == "value") {
        if (pos1.to) {
          html = write(crdt, html, null, pos1.from, pos1.to);
        } 
        if (findPos.value) html = write(crdt, html, content, pos1.from);
      }

      break;
    case "class":
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        property: findPos.property,
        method: "class",
      });
      console.log("context: ", pos1);
      content = ` ${findPos.property}`;

      if (pos1.context == "attribute") {
        content = ` class="${content}"`;
        html = write(crdt, html, content, pos1.from);
      } else if (pos1.context == "value") {
        if (pos1.to && !findPos.value) {
          html = write(crdt, html, null, pos1.from, pos1.to);
          return;
        } else if (findPos.value) html = write(crdt, html, content, pos1.from);
      }

      break;
    case "setAttribute":
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        property: findPos.property,
        method: "setAttribute",
      });

      if (pos1.to) {
        html = write(crdt, html, null, pos1.from, pos1.to);
        html = write(crdt, html, findPos.value, pos1.from);
      } else
        html = write(crdt, 
          html,
          ` ${findPos.property}="${findPos.value}"`,
          pos1.from
        );
      break;
    case "removeAttribute":
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        property: findPos.property,
        method: "removeAttribute",
      });

      html = write(crdt, html, null, pos1.from, pos1.to);

    default:
    // code
  }
}

function findPosition({
  html,
  tagName: realTagName,
  target,
  method,
  property,
  nextSibling,
  skip,
}) {
  realTagName = realTagName.toLowerCase();
  // regex
  this.getRegAttribute = (attributeName) =>
    `(?:${spa}${attributeName}(?:="[^"]*?")?${sps})`;
  this.getRegStyle = (styleName) =>
    `(?:${sps}${styleName}${sps}\:${sps}[^\;]+?${sps}\;${sps})`;
  this.getRegClass = (className) => `(?:${sps}${className}${sps})`;
  this.getTagClose = (tagName) => `(?:${sps}\/${sps}${tagName}${sps})`;
  this.getRegTagStart = (tagName) => `(?:<${tagName}${sps})`;
  // &todo: wrong * make it +, done, is it correct?
  let space = "(?:\u{0020}|\u{0009}|\u{000A}|\u{000C}|\u{000D})";
  // let space = " ";
  let allAttributeName = `[^${space}\=\>]+`;
  let allStyleName = "[^:]+?";
  let allClassName = '[^"]+?';

  let sps = `${space}*?`;
  let spa = `${space}+?`;

  let at = this.getRegAttribute(allAttributeName);

  let tgs = `(?:<(?<tagName>[a-z0-9]+?)${sps})`;

  let sch = `(?:${sps}data-element_id\=\"${target}\"${sps})`;

  // todo: check with a tag like <a />
  let the = `(?<tagSlash>\/)?>`;

  let closingTag = `<${sps}/${realTagName}>`;

  let sty = this.getRegStyle(allStyleName);

  let cls = this.getRegClass(allClassName);
  let mcls = `${cls}*?`;

  let revTag = realTagName.split("").reverse().join("");
  let backCloseTag = `(?<closeTag>>${revTag}${sps}\/${sps}<)`;

  this.findStartTag = (html) => {
    let reg = `(?<tagWhole>${tgs}${at}*?${sch}${at}*?${the})`;
    let tagStart = html.match(new RegExp(reg, "is"));

    if (!tagStart) throw new Error("findPosition: element can not be found");

    if (tagStart && tagStart.groups.tagName.toLowerCase() !== realTagName)
      throw new Error(
        "findPosition: tag name didn't match, something is wrong"
      );
    this.tagName = tagStart.groups.tagName.toLowerCase();
    this.tagStPos = tagStart.index;
    this.tagStAfPos = tagStart.index + realTagName.length + 1;
    this.tagStClPos =
      tagStart.index +
      tagStart.groups.tagWhole.length -
      1 -
      (tagStart.groups.tagSlash ? 1 : 0);
    this.tagStClAfPos = tagStart.index + tagStart.groups.tagWhole.length;
    if (tagStart.groups.tagSlash) {
      this.tagEnPos = this.tagStClPos;
      this.tagEnClAfPos = this.tagStClAfPos;
    }
  };
  // metadata
  this.tagStPos;
  this.tagStAfPos;
  this.tagStClPos;
  this.tagStClAfPos;
  this.tagEnPos;
  this.tagEnClPos;
  this.atSt;
  this.atEn;

  this.tagEnPos;
  this.tagEnClAfPos;

  this.lastStart;
  this.offset;

  this.getWholeElement = () => {
    if (!this.tagStPos) this.findStartTag(html);
    if (!this.tagEnPos) this.findClosingTag();

    return { from: this.tagStPos, to: this.tagEnClAfPos };
  };
  this.findClosingTag = () => {
    let reverseHtml = html.split("").reverse().join("");
    let start;

    if (nextSibling) {
      start = reverseHtml.indexOf(
        `"${nextSibling.split("").reverse().join("")}"=di_tnemele-atad `
      );
      if (start === -1)
        throw new Error(
          "could not found next sibiling " + nextSibling + " in the html"
        );
      reverseHtml = reverseHtml.substr(start);
    }

    let found = reverseHtml.matchAll(new RegExp(backCloseTag, "isg"));

    let match = Array.from(found)[skip];
    if (!match) throw new Error("couldn't find the end tag");
    this.tagEnClAfPos = html.length - match.index - start;
    this.tagEnPos = this.tagEnClAfPos - match[0].length;
  };

  this.getInsertAdjacentElement = (property) => {
    if (!this.tagStPos) this.findStartTag(html);
    switch (property) {
      case "beforebegin":
        return { from: this.tagStPos };
        break;
      case "afterbegin":
        return { from: this.tagStClAfPos };
        break;
      case "beforeend":
        this.findClosingTag();
        return { from: this.tagEnPos };
        break;
      case "afterend":
        this.findClosingTag();
        return { from: this.tagEnClAfPos };
        break;
    }

    html.substr(this.tagStClAfPos);
  };

  this.getClass = (property, method2) => {
    this.findAttribute(html, "class", true);
    if (this.atEn) {
      let positions = this.findClassPos(html, property);
      return { ...positions, context: "value" };
    }
    // for set or remove
    else return { from: this.atSt, context: "attribute" };
  };
  this.findClassPos = (html, property) => {
    let prRegClass = this.getRegClass(property);

    let classStart = html
      .substring(this.atSt, this.atEn)
      .match(
        new RegExp(`^(?<classWhole>${mcls})(?<ourClass>${prRegClass})(?<classstyle>\:[^\"\ ]+(\ |\")?)`, "is")
      );

    if (classStart && classStart.groups.ourClass)
      return {
        from: this.atSt + classStart.groups.classWhole.length,
        to:
          this.atSt +
          classStart.groups.classWhole.length +
          classStart.groups.ourClass.length +
          classStart.groups.classstyle.length,
      };
    else
      return {
        from: this.atEn,
      };
  };
  this.getStyle = (property, method2) => {
    this.findAttribute(html, "style", true);
    if (this.atSt === this.atEn) return { from: this.atSt, context: "value" };
    else if (this.atEn) {
      let positions = this.findStylePos(html, property);
      return { ...positions, context: "value" };
    }
    // for set or remove
    else return { from: this.atSt, context: "attribute" };
  };
  this.findStylePos = (html, property) => {
    let prRegStyle = this.getRegStyle(property);
    // console.log('fffffffffffff',this.atSt, this.atEn, html
    //   .substring(this.atSt, this.atEn));return;
    let styleStart = html
      .substring(this.atSt, this.atEn)
      .match(
        new RegExp(`^(?<styleWhole>${sty})*?(?<ourStyle>${prRegStyle})`, "is")
      );
    if (styleStart && styleStart.groups.ourStyle) {
      let stlWleLen = styleStart.groups.styleWhole
        ? styleStart.groups.styleWhole.length
        : 0;
      return {
        from: this.atSt + stlWleLen,
        to: this.atSt + stlWleLen + styleStart.groups.ourStyle.length,
      };
    } else
      return {
        from: this.atEn,
      };
  };

  // this.findAttribute = (html, property, isValueOnly) => {
  //   if (!this.tagStAfPos) this.findStartTag(html);

  //   let prRegAttr = this.getRegAttribute(property);
  //   let regex = `^(?<beforeAtt>${at}*?)${prRegAttr}`;

  //   let attStart = html.substr(this.tagStAfPos).match(new RegExp(regex, "is"));

  //   if (attStart) {
  //     this.atSt =
  //       this.tagStAfPos +
  //       attStart.groups.beforeAtt.length +
  //       (isValueOnly ? 3 + property.length : 0);

  //     let tagEnd = html
  //       .substr(this.atSt)
  //       .match(new RegExp('(?<attEnd>^[^"]*?")', "is"));
  //     this.atEn =
  //       this.atSt + tagEnd.groups.attEnd.length - (isValueOnly ? 1 : 0);
  //   } else {
  //     this.atSt = this.tagStClPos;
  //   }
  // };

  this.findAttribute = (html, property, isValueOnly) => {
    if (!this.tagStAfPos) this.findStartTag(html);

    let prRegAttr = this.getRegAttribute(property);
    let regex = `^(?<beforeAtt>${at}*?)${prRegAttr}`;

    let attStart = html.substr(this.tagStAfPos).match(new RegExp(regex, "is"));

    if (attStart) {
      this.atSt =
        this.tagStAfPos +
        attStart.groups.beforeAtt.length +
        (isValueOnly ? 3 + property.length : 0);

      this.atEn = this.tagStAfPos + attStart[0].length - (isValueOnly ? 1 : 0);
    } else {
      this.atSt = this.tagStClPos;
    }
  };

  this.getSetAttribute = (property, type) => {
    switch (type) {
      case "get":
      case "set":
        this.findAttribute(html, property, true);
        break;
      case "remove":
        this.findAttribute(html, property);
        break;
    }
    return { from: this.atSt, to: this.atEn };
  };
  
  this.getInnerText = function(value){
    if (!this.tagStPos) this.findStartTag(html);
    this.findClosingTag();
    
    return {from:this.tagStClAfPos, to: this.tagEnPos};
  }
  
  this.scanMethods = () => {
    switch (method) {
      case "insertAdjacentElement":
        return this.getInsertAdjacentElement(property);
        break;
      case "class":
        return this.getClass(property);
        break;
      case "innerText":
        return this.getInnerText(property);
        break;
      case "style":
        return this.getStyle(property);
        break;
      case "setAttribute":
        return this.getSetAttribute(property, "set");
        break;
      case "getAttribute":
        return this.getSetAttribute(property, "get");
        break;
      case "removeAttribute":
        return this.getSetAttribute(property, "remove");
        break;
      case "removeElement":
        return this.getWholeElement();
        break;
      default:
        throw new Error("findPosition: method is not supported");
    }
  };

  function logFindPosition(p) {
    console.log(
      {
        html,
        method,
        nextSibling,
        skip,
        realTagName,
        target,
      },
      "=================start=====================>>>>>>>>>>>>>>>>>>>"
    );
    if (p.to) {
      console.log(
        "%s%c<from>%c%s%c<to>%c%s",
        html.substring(p.from - 20, p.from),
        "color: red",
        "color: white",
        html.substring(p.from, p.to),
        "color: red",
        "color: white",
        html.substring(p.to, p.to + 20)
      );
    } else {
      // console.log(html.substring(p.from, p.from + 20));
      console.log(
        "%s%c<here>%c%s",
        html.substring(p.from - 20, p.from),
        "color: red",
        "color: white",
        html.substring(p.from, p.from + 40)
      );
    }
    console.log("==================end====================");
  }
  function logFindPositionNodeJs(p) {
    console.log(
      "=================start=====================>>>>>>>>>>>>>>>>>>>"
    );
    if (p.to) {
      console.log(
        html.substring(p.from - 20, p.from) +
          "\x1b[31m<from>\x1b[0m" +
          html.substring(p.from, p.to) +
          "\x1b[31m<to>\x1b[0m" +
          html.substring(p.to, p.to + 20)
      );
    } else {
      console.log(
        html.substring(p.from - 20, p.from) +
          "\x1b[31m<here>\x1b[0m" +
          html.substring(p.from, p.from + 40)
      );
    }
    console.log("==================end====================");
  }

  try {
    let p = this.scanMethods();
    console.log(p, method, html.length);
    // logFindPositionNodeJs(p);
    logFindPosition(p)
    return p;
  } catch (err) {
    console.error(err);
  }
}
