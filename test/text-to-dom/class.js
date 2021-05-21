// class testing with crdt

// init crdt 
CoCreate.crdt.init({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html"});


// insert class margin-left:20px element 2
CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 161, value: ' class="margin-left:20px"'});


// update margin-left:20px to 40px
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 181, length: 1});

CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 181, value: '4'});


// update margin-left:40px to 40%
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 183, length: 1});

CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 183, length: 1});

CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 183, value: '%'});


// replace value 40% with auto
CoCreate.crdt.deleteText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 181, length: 3});

CoCreate.crdt.insertText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html", position: 181, value: 'auto'});


//get html
CoCreate.crdt.getText({collection: "apples",
document_id: "60a59d2ea8e31d7406d05bdb",
name: "html"});
// drag and drop crdt text test
