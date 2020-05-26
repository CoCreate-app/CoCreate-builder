// always loaded in host no iframes

window.onload = () => {


  let iframes = {
    host: {
      document,
      window
    }
  };
  window.iframes = iframes


  let allFrames = document.getElementsByTagName('iframe')

  let i = 1;
  for (let frame of allFrames) {
    let id = frame.id || `iframe${i++}`
    iframes[id] = ({
      document: frame.contentDocument,
      window: frame.contentWindow
    })
    frame.contentWindow.iframes = iframes;
  }




  const callback = function(mutationsList, observer) {

    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (let added of mutation.addedNodes) {
          if (added.tagName === 'IFRAME') {
            let id = added.id || `iframe${i++}`
            iframes[id] = ({
              document: added.contentDocument,
              window: added.contentWindow
            })
            added.contentWindow.iframes = iframes;
          }
        }
      }

    }
  };


  const observer = new MutationObserver(callback);

  const config = { attributes: true, childList: true, subtree: true };

  observer.observe(document.body, config);






}
