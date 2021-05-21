// drag and drop crdt text test

// init crdt 
CoCreate.crdt.init({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html"});

// drag element 3
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 81, length: 2});

// drop under element 2
CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 81, value: 'h3'});

// drag element 3
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 122, length: 2});

// drop above element 2
CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 122, value: 'h3'});

//get html
// CoCreate.crdt.getText({collection: "apples",
// document_id: "60a59d2ea8e31d7406d05bdb",
// name: "html"});
