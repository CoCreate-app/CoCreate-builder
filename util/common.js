function createMarker() {
  let marker = document.createElement("div");
  marker.id = "marker";
  marker.style.backgroundColor = "green";
  marker.style.transition = "all 0.2s ease-in-out";
  marker.style.position = "absolute";
  marker.style.display = "none";
  marker.style.pointerEvents = 'none';
  return marker;
}

function createBlockMarker(border = "2px solid blue") {
  let marker = document.createElement("div");
  marker.id = "block-marker";
  marker.style.backgroundColor = "transparent";
  marker.style.position = "absolute";
  marker.style.display = "none";
  marker.style.border = border;
  marker.style.pointerEvents = 'none';
  return marker;
}

function createTagBox() {
  let marker = document.createElement("div");
  marker.id = "tagBox";
  marker.style.backgroundColor = "blue";
  marker.style.color = "white";
  marker.style.position = "absolute";
  marker.style.zIndex = "99999";
  marker.style.padding = "2px 10px";
  marker.style.fontSize = "10px";
  marker.style.display = "none";
  marker.style.pointerEvents = 'none';
  return marker;
}

// return droppable-candidate element or false if no candidate found
function getDropable(el) {
  do {
    if (el.getAttribute('droppable')) return el;
    el = el.parentElement;
    if (!el) return false;
  } while (true);
}


function getCoc(el, att) {
  if (!el.tagName)
    el = el.parentElement;
  do {
    if (el.getAttribute(att) == "true") return el;
    el = el.parentElement;
    if (!el) return false;
  } while (true);
}




function computeStyles(el, properties) {
  let computed = window.getComputedStyle(el);
  console.log('fff');
  let result = {};
  properties.forEach((property) => {
    result[property] = parseInt(computed[property]);
  });
  return result;
}

function randomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}



function pDistance(x, y, x1, y1, x2, y2) {

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
    param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}


function closestChild(p, children) {
  let closestDistance = Infinity;
  let closestchild;
  let topOrientation;
  for (let child of children) {
    if (child.classList.contains('hidden'))
      continue;
    let [orientation, distance] = distanceToChild(p, child);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestchild = child;
      topOrientation = orientation;
    }
  }
  return [topOrientation, closestchild];
}


let orientations = ['left', 'top', 'right', 'bottom']

function distanceToChild(p, child) {
  let rect = child.getBoundingClientRect();

  let line1 = { p1: [rect.top, rect.left, ], p2: [rect.bottom, rect.left] }
  let line2 = { p1: [rect.top, rect.left, ], p2: [rect.top, rect.right, ] }
  let line3 = { p1: [rect.top, rect.right, ], p2: [rect.bottom, rect.right, ] }
  let line4 = { p1: [rect.bottom, rect.left, ], p2: [rect.bottom, rect.right, ] }


  let distances = [
    pDistance(p[0], p[1], line1.p1[1], line1.p1[0], line1.p2[1], line1.p2[0]),
    pDistance(p[0], p[1], line2.p1[1], line2.p1[0], line2.p2[1], line2.p2[0]),
    pDistance(p[0], p[1], line3.p1[1], line3.p1[0], line3.p2[1], line3.p2[0]),
    pDistance(p[0], p[1], line4.p1[1], line4.p1[0], line4.p2[1], line4.p2[0])
  ];

  let orientation;
  let closestDistance = Infinity;
  distances.forEach((distance, i) => {
    if (distance < closestDistance) {
      closestDistance = distance;
      orientation = orientations[i];
    }
  })
  return [orientation, closestDistance]
}


function boxMarkerTooltip(callback) {
  let tagBox = createTagBox();
  document.body.append(tagBox);
  this.obj = tagBox;
  this.draw = function(el) {
    tagBox.style.display = "block";
    tagBox.innerHTML = callback(el);
    let { height, paddingTop } = computeStyles(tagBox, [
      "height",
      "paddingTop",
    ]);
    let rect = el.getBoundingClientRect();
    tagBox.style.top =
      rect.top - borderSize + window.scrollY - height - paddingTop * 2 + "px";
    tagBox.style.left = rect.left - borderSize + window.scrollX + "px";
  };

  this.hide = function(el) {
    tagBox.style.display = "none";
  };
}

let markerPname = "marker-priority";

function boxMarker(attributeName, priority) {
  this.lastEl = document.head;

  this.draw = function(el, callback, lastElCallback) {
    if (el === this.lastEl) return;
    el.setAttribute(attributeName, true);
    if (callback) callback(el)
    if (lastElCallback)
      lastElCallback(this.lastEl)

    this.lastEl.removeAttribute(attributeName);
    this.lastEl = el;

  };

  this.hide = function(callback) {
    this.lastEl.removeAttribute(attributeName);
    if (callback)
      callback(this.lastEl)
    this.lastEl = document.head;
  };
}



function dropMarker() {
  this.lastOrigntaion = undefined;

  let marker = createMarker();

  document.body.append(marker);
  this.obj = marker;
  this.draw = function(parent, el, orientation, isInside) {


    marker.style.display = "block";

    let rect = el.getBoundingClientRect();
    switch (orientation) {
      case 'top':
      case 'bottom':
        marker.style.width = rect.width + "px";
        marker.style.height = borderSize + "px";
        break;
      case 'left':
      case 'right':
        marker.style.width = borderSize + "px";
        marker.style.height = rect.height + "px";
        break;
      default:
        throw new Error('one type of orientation must be specified');
    }


    // switch (orientation) {
    //   case 'top':
    //   case 'bottom':
    //     if (!this.lastOrigntaion || this.lastOrigntaion == 'left' || this.lastOrigntaion == "right")
    //       marker.style.transition = 'none';
    //     else
    //       marker.style.transition = "all 0.2s ease-in-out";
    //     break;
    //   case 'left':
    //   case 'right':
    //     if (!this.lastOrigntaion || this.lastOrigntaion == 'top' || this.lastOrigntaion == "bottom")
    //       marker.style.transition = 'none';
    //     else
    //       marker.style.transition = "all 0.2s ease-in-out";
    //     break;
    //   default:
    //     throw new Error('one type of orientation must be specified');
    // }

    if (parent != el) {
      let prect = parent.getBoundingClientRect();
      let parentSize = prect[orientation]
      let childSize = rect[orientation]
      if (Math.abs(parentSize - childSize) < dropMarkerMargin * 2)
        isInside = true;
    }

    switch (orientation) {
      case 'top':
        marker.style.top = rect.top - borderSize / 2 + window.scrollY + (isInside ? dropMarkerMargin : -dropMarkerMargin) + "px";
        marker.style.left = rect.left - borderSize / 2 + window.scrollX + "px";
        break;
      case 'bottom':
        marker.style.top = rect.bottom - borderSize / 2 + window.scrollY + (isInside ? -dropMarkerMargin : dropMarkerMargin) + "px";
        marker.style.left = rect.left - borderSize / 2 + window.scrollX + "px";
        break;
      case 'left':
        marker.style.top = rect.top - borderSize / 2 + window.scrollY + "px";
        marker.style.left = rect.left - borderSize / 2 + window.scrollX + (isInside ? dropMarkerMargin : -dropMarkerMargin) + "px";
        break;
      case 'right':
        marker.style.top = rect.top - borderSize / 2 + window.scrollY + "px";
        marker.style.left = rect.right - borderSize / 2 + window.scrollX + (isInside ? -dropMarkerMargin : dropMarkerMargin) + "px";
        break;
      default:
        console.log(orientation)
        throw new Error('one type of orientation must be specified');
    }
    // marker.style.transition = "all 0.2s ease-in-out";
    this.lastOrigntaion = orientation;
  }

  this.hide = function(el) {
    marker.style.display = "none";
  };
}


function getSelectorPath(el) {
  return "ffff"
  // return window.util.cssPath(el)
}
