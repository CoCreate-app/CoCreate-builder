// drag and drop crdt text test

// init crdt 
CoCreate.crdt.init({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html"});

// drag element 3
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 128, length: 45});

// drop under element 2
CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 131, value: '<h1 data-element_id="t3" name="3">test 3</h1>'});

// drag element 3
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 131, length: 45});

// drop above element 2
CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 131, value: '<h1 data-element_id="t3" name="3">test 3</h1>'});

//get html
// CoCreate.crdt.getText({collection: "apples",
// document_id: "60a59d2ea8e31d7406d05bdb",
// name: "html"});
