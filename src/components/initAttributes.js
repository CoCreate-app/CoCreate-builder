  import crdt from '@cocreate/crdt';
  import resolveCanvas from './resolveCanvas';
  import attributes from '@cocreate/attributes';
  import domText from './initDomText';

  export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
    const domTexti = await domText;
    return attributes.init({
      document,
      exclude: '#ghostEffect, .vdom-item, #selectedElementcoc, #hoveredElementcoc',
      callback: ({
        value,
        type,
        property,
        element,
        unit
      }) => {

        try {
          if (canvasDocument.contains(element)) {
            let target = element.getAttribute("data-element_id");
            unit = unit || '';
            switch (type) {
              case 'attribute':
                domTexti.setAttribute({ target, name: property, value })
                break;
              case 'classstyle':
                domTexti.setClassStyle({ target, classname: property, value, unit })
                break;
              case 'style':
                domTexti.setStyle({ target, styleName: property, value, unit })
                break;
              case 'innerText':
                domTexti.setInnerText({ target, value })
                break;
              case 'class':
                domTexti.setClass({ target, value })
                break;

              default:
                console.error('ccAttribute to domText no action')
                // code
            }

          }
        }
        catch (err) { console.log('domText: dom-to-text: ' + err) }



      },
    });


  })
  