  /*global DOMParser, Event*/
  import crdt from '@cocreate/crdt';
  import domText from '@cocreate/domtext'
  import resolveCanvas from './resolveCanvas';


  export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {

    let html = crdt.getText({ crud: false, ...crdtCon });
    let domTexti = new domText(html, canvasDocument.documentElement)
    // window.insertTextList = [];
    domTexti.setCallback({
      addCallback: function({ value, position }) {
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
        crdt.insertText({
          crud: false,
          ...crdtCon,
          value,
          position,
        });
      },
      removeCallback: function({ from, to }) {
        crdt.deleteText({
          crud: false,
          ...crdtCon,
          position: from,
          length: to - from,
        });
      }
    });
    let domTextiTextToDom = new domText(html, canvasDocument.documentElement)
    window.addEventListener('cocreate-crdt-update', function(e) {
      let detail = event.detail;

      if (detail['collection'] !== crdtCon['collection'] || detail['name'] !== crdtCon['name'] || detail['document_id'] !== crdtCon['document_id'])
        return;

      let info = detail.eventDelta;
      let pos = isFinite(info[0].retain) ? info[0].retain : 0;
 
      if (info[1].insert) {
        let changeStr = info[1].insert;

        domTextiTextToDom.addToDom({ pos, changeStr });
        console.log(pos, changeStr);
      }
      else {
        let removeLength = info[1].delete;
        domTextiTextToDom.removeFromDom({ pos, removeLength });
        console.log(pos, removeLength);
      }

    })
    return domTexti;



  })
  