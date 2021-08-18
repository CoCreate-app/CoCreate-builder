import { crdtCon, canvas, canvasWindow, canvasDocument } from './components/resolveCanvas';

import './components/initAttributes';
import './components/initContenteditable';
import './components/initDnd';
import './components/initSelected';
import './components/initSelect';
import './components/initToolbar';
import './components/initVdom';
import './components/clipboard.js';

(async() => {
  // lazy load
})();

export default { crdtCon, canvas, canvasDocument, canvasWindow };
