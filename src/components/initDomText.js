  /*global DOMParser, Event*/
  import crdt from '@cocreate/crdt';
  import domText from '@cocreate/domtext'
  import resolveCanvas from './resolveCanvas';
import {logger} from '@cocreate/utils';
let consolelog = logger('off')

  function sleep(tt) {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve()
      }, tt)
    })
  }

  export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {

    let html = crdt.getText({ crud: false, ...crdtCon });
    let domTexti = new domText(html, canvasDocument.documentElement)
    // window.insertTextList = [];
    domTexti.setCallback({
      addCallback: function({ value, position, avoidTextToDom = false }) {
        let html = crdt.getText({ crud: false, ...crdtCon })
        // if (html)
        // window.insertTextList.push({
        //   value,
        //   position,
        //   virtual: html.substring(html.from - 20, html.from) +
        //     "\x1b[31m<here>\x1b[0m" +
        //     html.substring(html.from, html.from + 40)
        // })
        // else
        // window.insertTextList.push({ value, position, virtual: 'crdt.getText returned nothing' })
        CoCreate.crdt.insertText({
          // attributes: { avoidTextToDom },
          crud: false,
          ...crdtCon,
          value,
          position,
        });
      },
      removeCallback: function({ from, to, avoidTextToDom = false }) {



        CoCreate.crdt.deleteText({
          // attributes: { avoidTextToDom },
          crud: false,
          ...crdtCon,
          position: from,
          length: to - from,
        });
      }
    });
    let domTextiTextToDom = new domText(html, canvasDocument.documentElement)
    window.addEventListener('cocreate-crdt-update', function(e) {
      try {
        let detail = event.detail;

        // let { avoidTextToDom } = e.detail;
        // if (avoidTextToDom && detail['collection'] && detail['name'] && detail['document_id'])
        //   return;


        consolelog.log('eee>>>>', event)
        if (detail['collection'] !== crdtCon['collection'] || detail['name'] !== crdtCon['name'] || detail['document_id'] !== crdtCon['document_id'])
          return;




        // sleep(200)
        let eventDelta = detail.eventDelta;

        for (let i = 0; i < eventDelta.length; i++) {

          if (eventDelta[i]?.attributes?.avoidTextToDom)
            return;
        }
        let html = crdt.getText(crdtCon);
        domTextiTextToDom.html = domTexti.html = html;


        if (!window.savedDelta)
          window.savedDelta = []
        else
          window.savedDelta.push(eventDelta)
        // if(!info[1]) return;




        let pos = 0;
        for (let i = 0; i < eventDelta.length; i++) {

          if (eventDelta[i].retain)
            pos = eventDelta[i].retain;
          else {
            if (eventDelta[i].insert) {
              let changeStr = eventDelta[i].insert;

              domTextiTextToDom.addToDom({ pos, changeStr });

              consolelog.log(pos, changeStr);
            }
            else {
              let removeLength = eventDelta[i].delete;
              domTextiTextToDom.removeFromDom({ pos, removeLength });
              consolelog.log(pos, removeLength);
            }
            // pos = 0;
          }



        }


      }
      catch (err) {
        consolelog.log('domText: text-to-dom: ' + err)
      }


      // domTexti.html = domTextiTextToDom.html;

    })
    return domTexti;



  })
  