// import '@cocreate/render/src'

(async() => {
  // lazy loading because of webpack warning for large bundle size

  // import ('@cocreate/sidenav')
  // import ('@cocreate/modal')
  // import ('@cocreate/fetch')
  // import ('@cocreate/floating-label')
  // import ('@cocreate/htmltags')
  // import ('@cocreate/input')
  // import ('@cocreate/text')
  // import ('@cocreate/cursors')

})();

// import ccCss from '@cocreate/cocreatecss';
import './index.css'
import observer from '@cocreate/observer'
import './components/initAttributes'
import './components/initContenteditable'
import './components/initDnd'
import './components/initSelected'
import './components/initSelect'
import './components/initToolbar'
import './components/initVdom'
import './components/clipboard.js'

import crdt from '@cocreate/crdt'




export default { observer, crdt }
