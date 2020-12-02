if (window.parent !== window) {
  console.log("dispath 1");
  window.addEventListener("load", () => {
    console.log("dispath load event");
    window.parent.dispatchEvent(new Event("CoCreateHtmlTags-rendered"));
  });
}
