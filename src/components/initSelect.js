import resolveCanvas from './resolveCanvas';
import { containerSelector } from '@cocreate/select/src/config'
import { container } from '@cocreate/select'
import crdt from '@cocreate/crdt';
const whiteList = { 'auto': true, 'inherit': true, 'initial': true };


export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
    
    function checkEvent(e) {
        let select = e.target;
        if (select.matches(containerSelector) &&
            select.matches('[attribute="attribute-unit"]')
    
        ) {
            let option = select.selectedOptions[0];
            if (!option) return;
            let value = option.getAttribute('value');
            if (whiteList[value]) {
    
                let instance = container.get(select);
                instance.unselectAll(true);
                let target = select.getAttribute('attribute-target');
                if (!target) return;
                let input = document.querySelector(target);
                if (!input) return;
                
                crdt.replaceText({
                    collection: crdtCon.collection,
                    document_id: crdtCon.document_id,
                    name: input.getAttribute('name'),
                    value: value + '',
                    position: '0',
                })
                
            }
        }
    }
    
    document.addEventListener('input', checkEvent)
})
