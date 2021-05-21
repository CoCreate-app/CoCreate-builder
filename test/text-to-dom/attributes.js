// attribute testing with crdt

// init crdt 
CoCreate.crdt.init({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html"});


// insert test attribute in element 2
CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 209, value: ' test="newtest"'});


// delete new from test attribute
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 216, length: 1});
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 216, length: 1});
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 216, length: 1});

// replace attribute value with hello
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 216, length: 4});

CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 216, value: 'hello'});


//get html
CoCreate.crdt.getText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html"});
