//all test in one... results should match below
/*
<!DOCTYPE html>
<html data-parse="true">
  
	<body data-element_id="body" style="padding:1;">
		
		<h3 data-element_id="t1" name="1">test 1</h3>
		<h1 data-element_id="t3" name="3" class="margin-left:auto">test 3</h1>
		<h1 data-element_id="t2" name="2" test="hello">test 2</h1>
		<h1 data-element_id="t4" name="4">test 4</h1>
			
	    <script>
	        var config = {
	            apiKey: 'c2b08663-06e3-440c-ef6f-13978b42883a',
	            securityKey: 'f26baf68-e3a9-45fc-effe-502e47116265',
	            organization_Id: '5de0387b12e200ea63204d6c',
	            host: 'wss://ws.cocreate.app'
	        }
	    </script>
	    
	    <script src="https://server.cocreate.app/CoCreateJS/dist/CoCreate.js"></script>
        
   
	</body>
</html>
*/



// drag and drop crdt text test

// init crdt 
// CoCreate.crdt.init({collection: "apples",
// document_id: "60a59d2ea8e31d7406d05bdb",
// name: "html"});

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




//attribute test
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




// class text
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




//tagname
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
