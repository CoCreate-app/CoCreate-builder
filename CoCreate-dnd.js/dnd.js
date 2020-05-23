import { dropMarker, boxMarker, boxMarkerTooltip, getCoc, ghostEffect } from '../util/common'
import selectorUtil from '../util/selectorUtil';
import VirtualDnd from '../CoCreate-dnd.js/virtualDnd';
import '../util/onClickLeftEvent';




export default function dnd(window, document, options) {

  options = Object.assign({

    tagNameTooltip: new boxMarkerTooltip((el) => {
      let name = el.getAttribute('data-CoC-name');
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
    myDropMarker.draw(data.el, data.closestEl, data.orientation, !data.hasChild);
    hoverBoxMarker.draw(data.el)
    tagNameTooltip.draw(data.el)
  })

  let ghost;

  function start(e) {


    let el = getCoc(e.target, 'data-CoC-draggable')
    if (!el) return;
    document.body.style.cursor = 'crosshair !important'

    ghost = new ghostEffect(e, el);
    ghost.draw()

    isDraging = true;
    hoverBoxMarker.hide();
    tagNameTooltip.hide();
    dnd.dragStart(e, el);
  }

  function end(e) {
    document.body.style.cursor = ''
    ghost.hide()
    dnd.dragEnd(e);
    myDropMarker.hide();
    hoverBoxMarker.hide();
    tagNameTooltip.hide();
    isDraging = false;


  }

  function move({ x, y, target }) {


    if (!target || !isDraging) return; // it's out of iframe
    let onEl = target; // dev
    if (consolePrintedEl != target) { // dev
      // dev
      console.log("you are on: \n", onEl, "\nDroping in: \n", target);
      consolePrintedEl = target;
    }

    let el = getCoc(target, 'data-CoC-droppable');
    // todo:
    if (!el || !isDraging) return;
    dnd.dragOver({ x, y }, el)

  }


  // touch
  document.addEventListener('touchstart', (e) => {
    console.log('touch start')
    start(e)
  })

  document.addEventListener('touchend', (e) => {

    console.log('touch end')
    end(e)

  })


  document.addEventListener('touchmove', (e) => {

    console.log('host touch move')

    let touch = e.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    let el = document.elementFromPoint(x, y);
    if (!el) return; // it's out of iframe
    move({ x, y, target: el })


  })
  // touch

  // mouse
  document.addEventListener('mousedown', (e) => {
    console.log('mouse down', e);

    if (e.which != 1)
      return;

    start(e);

  })


  document.addEventListener('mouseup', (e) => {
    console.log('mouse up', e);
    // todo: why would we check for hoverable and what do we do whith this?
    // let el = getCoc(e.target, 'data-CoC-hoverable')
    // if (!el) return;
    //

    if (e.which != 1)
      return;
    end(e)


  })


  document.addEventListener('mouseover', (e) => {
    console.log('mouse over')
    let el = getCoc(e.target, 'data-CoC-hoverable');

    if (!el) {
      tagNameTooltip.hide(el);
      hoverBoxMarker.hide(el);
    }
    else {
      hoverBoxMarker.draw(el);
      tagNameTooltip.draw(el);

    }

    move(e)


  })
  // mouse


  // listen for click
  document.addEventListener('CoCreateClickLeft', (e) => {
    // todo: not working!?
    let el = getCoc(e.target, 'data-CoC-selectable');
    if (!el) return;
    selectBoxMarker.draw(el);

  })


}



function dndReady(document) {

  // disable native drag
  document.addEventListener('dragstart', () => {
    return false;
  })

  // disable selection
  document.addEventListener('selectstart', (e) => {
    let el = getCoc(e.target, 'data-CoC-draggable')
    if (el) e.preventDefault();
  })


}
