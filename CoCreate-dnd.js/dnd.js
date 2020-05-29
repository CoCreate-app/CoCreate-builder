import { dropMarker, boxMarker, boxMarkerTooltip, getCoc, ghostEffect, getGroupName, parse, getCocs } from '../util/common'
import selectorUtil from '../util/selectorUtil';
import VirtualDnd from '../CoCreate-dnd.js/virtualDnd';
import '../util/onClickLeftEvent';
import { droppable, draggable, selectable, hoverable, name, cloneable, data_insert_html } from '../util/variables.js'



export default function dnd(window, document, options) {

  options = Object.assign({

    tagNameTooltip: new boxMarkerTooltip((el) => {
      let name = el.getAttribute(name);
      return name ? name : el.tagName;
    }, window),

    myDropMarker: new dropMarker(),

    hoverBoxMarker: new boxMarker("CoC-hovered", 1),

    selectBoxMarker: new boxMarker("CoC-selected", 2, {
      onRemove: (lastEl) => {
        console.log({
          comment: 'onUnselect',
          obj: selectorUtil.cssPath(lastEl),
          method: 'removeAttribute',
        });

        lastEl.removeAttribute('data-selected_users')
      },
      onAdd: (el) => {
        console.log({
          comment: 'onSelect',
          obj: selectorUtil.cssPath(el),
          method: 'setAttribute',
          value: ['id']
        })
        el.setAttribute('data-selected_users', 'id')
      }
    })

  }, options)
  // weird bug: dropMarker override the imported dropMarker in the above
  let { myDropMarker, selectBoxMarker, hoverBoxMarker, tagNameTooltip } = options;
  let isDraging = false;
  let consolePrintedEl = null; // dev only
  //// defining events

  dndReady(document)

  let dnd = new VirtualDnd();

  dnd.on('dragStart', (data) => {
    selectBoxMarker.hide()
    myDropMarker.hide();
  })
  dnd.on('dragEnd', (data) => {
    myDropMarker.hide()

  })
  dnd.on('dragOver', (data) => {
    myDropMarker.draw(data.el, data.closestEl, data.orientation, !data.hasChild, data.context);
    hoverBoxMarker.draw(data.el)
    tagNameTooltip.draw(data.el)
  })

  let ghost;
  let startGroup;

  function start(e, ref = { window, document }) {


    let [el, att] = getCocs(e.target, [cloneable, draggable])

    if (!el) return;

    if (att == cloneable) {
      let html = el.getAttribute(data_insert_html);
      if (html) {
        el = parse(html);
        if (!el) return;
      }
      else
        el = el.cloneNode(true);
    }


    // get group
    startGroup = getGroupName(el)



    ref.document.body.style.cursor = 'crosshair !important'

    ghost = new ghostEffect(e, el);
    ghost.draw()

    isDraging = true;
    hoverBoxMarker.hide();
    tagNameTooltip.hide();
    dnd.dragStart(e, el);
  }

  function end(e, ref = { window, document }) {
    ref.document.body.style.cursor = ''
    ghost.hide()
    dnd.dragEnd(e);
    myDropMarker.hide();
    hoverBoxMarker.hide();
    tagNameTooltip.hide();
    isDraging = false;


  }

  function move({ x, y, target }, context) {

    if (startGroup && startGroup != getGroupName(target)) return;
    if (!target || !isDraging) return; // it's out of iframe
    let onEl = target; // dev
    if (consolePrintedEl != target) { // dev
      // dev
      console.log("you are on: \n", onEl, "\nDroping in: \n", target);
      consolePrintedEl = target;
    }

    let el = getCoc(target, droppable);
    // todo:
    if (!el || !isDraging) return;
    dnd.dragOver({ x, y }, el, context)

  }

  let touchstart = (e) => {
    console.log('touch start')
    start(e)
  };
  let touchend = (e) => {

    console.log('touch end')
    end(e)

  };
  let touchmove = (e) => {

    console.log('host touch move')

    let touch = e.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    let el = document.elementFromPoint(x, y);
    if (!el) return; // it's out of iframe
    move({ x, y, target: el })


  };
  let mousedown = (e) => {
    console.log('mouse down', e);

    if (e.which != 1)
      return;

    start(e);

  }
  let mouseup = (e) => {
    console.log('mouse up', e);
    // todo: why would we check for hoverable and what do we do whith this?
    // let el = getCoc(e.target, hoverable)
    // if (!el) return;
    //

    if (e.which != 1)
      return;
    end(e)


  }
  let mousemove = (e) => {
    console.log('mouse over')
    let el = getCoc(e.target, hoverable);

    if (!el) {
      tagNameTooltip.hide(el);
      hoverBoxMarker.hide(el);
    }
    else {
      hoverBoxMarker.draw(el);
      tagNameTooltip.draw(el);

    }

    let context = { x: e.clientX, y: e.clientY };
    move(e, context)


  }
  let CoCreateClickLeft = (e) => {
    // todo: not working!?
    let el = getCoc(e.target, selectable);
    if (!el) return;
    selectBoxMarker.draw(el);

  }
  // touch
  document.addEventListener('touchstart', touchstart)
  document.addEventListener('touchend', touchend)
  document.addEventListener('touchmove', touchmove)
  // touch
  // mouse
  document.addEventListener('mousedown', mousedown)
  document.addEventListener('mouseup', mouseup)
  document.addEventListener('mousemove', mousemove)
  // mouse
  // listen for click
  document.addEventListener('CoCreateClickLeft', CoCreateClickLeft)









  options.iframes.forEach(frame => {
    let ref = { window: frame.contentWindow, document: frame.contentDocument, }
    dndReady(ref.document)
    ref.document.addEventListener('touchstart', wrapper(touchstart, ref))
    ref.document.addEventListener('touchend', wrapper(touchend, ref))
    ref.document.addEventListener('touchmove', wrapper(touchmove, ref))
    // touch
    // mouse
    ref.document.addEventListener('mousedown', wrapper(mousedown, ref))
    ref.document.addEventListener('mouseup', wrapper(mouseup, ref))
    ref.document.addEventListener('mousemove', wrapper(mousemove, ref))
    // mouse
    // listen for click
    ref.document.addEventListener('CoCreateClickLeft', wrapper(CoCreateClickLeft, ref))
  })

}



function dndReady(document) {

  // disable native drag
  document.addEventListener('dragstart', () => {
    return false;
  })

  // disable selection
  document.addEventListener('selectstart', (e) => {
    let [el, att] = getCocs(e.target, [draggable, cloneable])
    if (el) e.preventDefault();
  })


}


function wrapper(func, ref) {

  return function(e) {
    func.apply(this, [e, ref])
  }

}
