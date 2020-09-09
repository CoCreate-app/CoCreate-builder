/**
 * styling classes:
 * on hide element, the row get .layer-hidden
 **/
import collapsible from './collapsible'
import { droppable, draggable, name } from '../../util/variables.js'



export default function virtualDom({ realDom, virtualDom, document, options }) {

  // set options to this.options and set defualts
  this.options = options ? options : {};
  Object.assign(this.options, { indentBase: 10, indentSum: 15, exclude: ['SCRIPT'] });


  this.render = function(elList, level, appendDom) {
    let isAppended;

    let wrapper = document.createElement('div');
    for (let el of elList) {
      if (this.options.exclude.includes(el.tagName))
        continue;





      let displayName = el.getAttribute(name);
      let virtualEl = this.createVirtualElement({
        name: (displayName ? displayName : el.tagName),
        isParent: el.children.length,
        indent: this.options.indentBase + this.options.indentSum * level,
        element: el
      })


      virtualEl.addEventListener('mouseover', (e) => {
        document.send_client((cdocument, cwindow) => {
          let { hoverBoxMarker, tagNameTooltip } = cdocument.client_object;
          hoverBoxMarker.draw(el);
          tagNameTooltip.draw(el);
        })
      })

      // virtualEl.addEventListener('mouseLeave', (e) => {
      //   hoverBoxMarker.hide(el);
      //   tagNameTooltip.hide(el);
      // })

      wrapper.setAttribute(droppable, true);
      wrapper.append(virtualEl);



      if (el.children.length) {
        virtualEl.classList.add('collapsible')
        this.render(el.children, level + 1, wrapper)
      }

    }
    appendDom.append(wrapper);

  }


  this.createVirtualElement = function({ name, isParent, indent, options, element }) {

    let treeItem = document.createElement('div');
    treeItem.classList.add('sortable-item');

    treeItem.setAttribute(draggable, true);




    let text = document.createElement('span');
    text.innerHTML = name;
    text.style.flex = '1';
    text.style.paddingLeft = indent + 'px';

    let lastDisplay;
    let eye = this.createFAIcon({
      name: 'fa-eye',
      event: {
        'click': (e) => {
          if (element.style.display == "none") {
            element.style.display = lastDisplay
            treeItem.classList.remove('layer-hidden');
          }
          else {
            lastDisplay = element.style.display;
            element.style.display = 'none'
            treeItem.classList.add('layer-hidden');

          }
        }
      }
    })
    let arrow = this.createFAIcon({ name: 'fa-arrows-alt' })


    treeItem.append(eye);

    if (isParent) {
      if (options && options.collapsed == false) {
        let down = this.createFAIcon({ name: 'fa-caret-down' })
        text.insertAdjacentElement('afterbegin', down)
      }
      else {

        let right = this.createFAIcon({ name: 'fa-caret-right' })
        text.insertAdjacentElement('afterbegin', right)
      }
    }


    treeItem.append(text);
    treeItem.append(arrow);
    return treeItem;
  }


  this.createFAIcon = function({ name, event }) {
    let icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add(name);
    if (event) {
      let eventType = Object.keys(event)[0];
      let func = event[eventType];
      icon.addEventListener(eventType, func)
    }
    return icon;
  }


  this.render([realDom], 0, virtualDom, )
  collapsible(virtualDom)
}