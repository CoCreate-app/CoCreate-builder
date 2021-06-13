import crdt from '@cocreate/crdt';
import resolveCanvas from './resolveCanvas';

export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {

   function weirdCrdtInit(crdtCon, crdt) {
    let newCrdtCon = Object.assign({}, crdtCon);

    newCrdtCon.collection = newCrdtCon.document_id;
    newCrdtCon.document_id = 'null';
    delete newCrdtCon.name;
    crdt.init(newCrdtCon);
  }
  weirdCrdtInit(crdtCon, crdt)



})
