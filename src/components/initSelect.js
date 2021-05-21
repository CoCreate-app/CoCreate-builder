import vdom from '@cocreate/vdom'
import resolveCanvas from './resolveCanvas';
import { containerSelector } from '@cocreate/select/src/config'
import { container } from '@cocreate/select'

const whiteList = { 'auto': true, 'inherit': true, 'initial': true };


function checkEvent(e) {
    let select = e.target;
    if (select.matches(containerSelector) &&
        select.matches('[data-attributes="data-attributes_unit"]')

    ) {
        let option = select.selectedOptions[0];
        if(!option) return;
        let value = option.getAttribute('value');
        if (whiteList[value]) {

            let instance = container.get(select);
            instance.unselectAll(true);
            let target = select.getAttribute('data-attributes_target');
            if (!target) return;
            let input = document.querySelector(target);
            if (!input) return;
            input.value = value
            input.dispatchEvent(new Event('input', {"bubbles":true}))
        }
    }
}



export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
    document.addEventListener('input', checkEvent)
})
