/**
 * Creates a collapsible
 *  @params
 */




var coll = document.getElementsByClassName("collapsible");

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    let p = content.children[0];
    let pStyles = window.getComputedStyle(p);


    let lastHeight = null;
    if (content.style.height === "100px") {
      content.style.height = "0px";

    }
    else {
      content.style.height = "100px";

    }
  });
}
