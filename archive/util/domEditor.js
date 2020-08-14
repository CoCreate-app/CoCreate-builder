 //Insert general attributtes and classes in elements
 // domEditor[
 //     selectorType: 'querySelectorAll',
 //         //querySelectorAll, querySelector, getElementById, getElementsByClassName
 //     selector: '*',
 //         //#id,.Class, tagname,;
 //     method: 'setAttribute',
 //         //classList, classList.remove, classList.replace,  style, attribute, getAttribute, removeAttribute, setAttribute, attribute
 //     index : null,
 //         // [n], null
 //     property : null,
 //         //null,length,color,
 //     value : '{‘first_attr’:’cvalue’,’second_attr’:’value’}',
 //         //“hola, hey” ; “hola”, “hey”;  “string”; {‘first_attr’:’cvalue’,’second_attr’:’value’}
 // ]

 export default function domEditor({ obj, selector_type, selector, method, index, property, sub_property, value }) {

   if (!obj) {
     if (!document[selector_type])
       throw new Error('selector type not supported.')



     obj = document[selector_type](selector);

     if (!obj)
       return null;

   }


   if (index && obj[index])
     obj = obj[index];


   if (!method)
     return obj;

   let objs = (obj.length > 0) ? obj : [obj];

   let results = [];
   let element;
   objs.forEach(obj => {
     let result = apply_method({ obj, method, property, value })

     if (result)
       results.push(result);
     else
       element = obj[method]

   })
   if (element) return element;
   return results;
 }


 function apply_method({ obj, method, property, value }) {
   let results = [];

   if (typeof value == 'string')
     value = [value];

   if (method == 'style')
     if (value) {
       obj[method][property] = value;
       return;
     }
   else {
     return obj[method][property];
   }

   let querySection = method.split(".");
   let func = querySection.reduce((a, c) => a[c], obj);
   let lastEl = querySection.pop();
   let env = querySection.reduce((a, c) => a[c], obj);

   if (typeof env[lastEl] != 'function')
     if (value) {
       env[lastEl] = value;
       return;
     }
   else {
     return env[lastEl];
   }


   if (!value && typeof env[lastEl] == 'function')
     env[lastEl]();


   if (Array.isArray(value)) {
     value.forEach(e => {
       let result = func.call(env, e)
       results.push(result)
     });
   }
   else if (typeof value == 'object') {
     Object.entries(value).forEach((e) => {
       let result = func.apply(env, e)
       results.push(result)
     });
   }
   return results;
 }
 