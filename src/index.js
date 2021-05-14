// import '@cocreate/render/src'
(async() => {
  // lazy loading because of webpack warning for large bundle size

  import ('@cocreate/sidenav')
  import ('@cocreate/modal')
  import ('@cocreate/fetch')
  import ('@cocreate/floating-label')
  import ('@cocreate/htmltags')
  import ('@cocreate/input')
  import ('@cocreate/text')
  import ('@cocreate/cursors')

})();
import select from '@cocreate/select'
import ccCss from '@cocreate/cocreatecss';
import './style.css'

import './components/initAttributes'
import './components/initDnd'
import './components/initToolbar'
import './components/initVdom'
import './components/initSelected'

// import crdt from '@cocreate/crdt'





let defaultHtml = `<!DOCTYPE html><html>
	<head>
  <style>body {background: red;}</style>
	
	</head>
	<body data-element_id="body" style="padding:1;">
		
		<h1 data-element_id="t1" name="1">test 1</h1>
		<h1 data-element_id="t3" name="3">test 3</h1>
		<h1 data-element_id="t2" name="2">test 2</h1>
		<h1 data-element_id="t4" name="4">test 4</h1>
			

        
   
	</body>
</html>`;


(async function init() {
  // if (hasInit)
  //   return
  if (document.readyState === 'loading')
    window.addEventListener("load", async(e) => {
      await initBuilder()
    })
  else
    await initBuilder()


})()


async function initBuilder() {


}


export default { }
