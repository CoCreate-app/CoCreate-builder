  /*global DOMParser, Event*/
  import crdt from '@cocreate/crdt';

  function sleep(tt) {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve()
      }, tt)
    })
  }

  let defaultHtml = `<!DOCTYPE html><html>
  
	<body data-element_id="body" style="padding:1;">
	
		<h1 name="4" class="color:red" data-element_id="445797c5-e01b-42cf-a8a5-f753ab60c8f6">test 5</h1>
		<h1 data-element_id="t1" name="1">test 1</h1>
		<h1 data-element_id="t3" name="3">test 3</h1>
		<h1 data-element_id="t2" name="2">test 2</h1>
		<h1 data-element_id="t4" name="4">test 4</h1>
		
		<script>
        var config = {
            apiKey: 'c2b08663-06e3-440c-ef6f-13978b42883a',
            organization_Id: '5de0387b12e200ea63204d6c',
            host: 'wss://server.cocreate.app:8088'
        }
    </script>
    
     <script src="./CoCreate-builder-canvas.js"></script>
        
   
	</body>
</html>`;

  let canvas, canvasDocument, canvasWindow, crdtCon;

  canvas = document.querySelector("#canvas");
  if (!canvas)
    console.error("builder config failed, can not find canvas iframe");

  crdtCon = {
    collection: canvas.getAttribute('data-collection'),
    document_id: canvas.getAttribute('data-document_id'),
    name: canvas.getAttribute('name'),

  };
  window.crdtCon = crdtCon;
  crdt.init(crdtCon);


  export default new Promise(async function(resolve, reject) {


    setTimeout(() => {
        if (window.location.href.endsWith('/CoCreate-builder/dist/index.html'))
        {
          
          while (true) {
            let html = crdt.getText({ crud: false, ...crdtCon });
            if (html)
              crdt.replaceText({ crud: false, ...crdtCon, value: '' });
            else
              break;
            sleep(200);
          }
          crdt.replaceText({ crud: false, ...crdtCon, value: defaultHtml })
        }

      let html = crdt.getText({ crud: false, ...crdtCon });

      // canvasDocument.documentElement.remove();
      // canvasDocument.append((new DOMParser().parseFromString(html, "text/html")).documentElement);

      // let apiInfo = document.createElement('script');
      // apiInfo.innerHTML = `     var config = {
      //     apiKey: 'c2b08663-06e3-440c-ef6f-13978b42883a',
      //     securityKey: 'f26baf68-e3a9-45fc-effe-502e47116265',
      //     organization_Id: '5de0387b12e200ea63204d6c'
      //   }`;
      // canvasDocument.head.appendChild(apiInfo);

      // let canvasScript = document.createElement('script');
      // canvasScript.setAttribute('src', './CoCreate-builder-canvas.js');
      // canvasScript.addEventListener('load', function() {
      //   canvasWindow.dispatchEvent(new Event("DOMContentLoaded", { "bubbles": true, "cancelable": false }))
      //   canvasWindow.dispatchEvent(new Event("load", { "bubbles": true, "cancelable": false }))
      // })
      // canvasDocument.head.appendChild(canvasScript);

      let newIframe = document.createElement('iframe');
      newIframe.srcdoc = html;

      // canvas.appendChild(canvasDocument);


      for (let att of canvas.attributes) {
        newIframe.setAttribute(att.name, att.value);
      }

      canvas.replaceWith(newIframe);
      newIframe.addEventListener('load', () => {
        newIframe.removeAttribute('srcdoc')
        canvasWindow = newIframe.contentWindow;
        canvasDocument = canvasWindow.document || newIframe.contentDocument;
        canvasDocument.ccdefaultView = canvasWindow;
        resolve({ crdtCon, canvas: newIframe, canvasDocument, canvasWindow })
      })


    }, 2000)
  })
  