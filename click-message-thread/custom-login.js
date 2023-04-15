let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let oldValue = mutation.oldValue;
      let newValue = mutation.target.textContent;
      if (oldValue !== newValue) {
        for(var i=0;i<document.getElementsByClassName('rcx-message').length;i++){
          var el=document.getElementsByClassName('rcx-message')[i];
          if(el.getElementsByClassName('rcx-box rcx-box--full rcx-box--animated rcx-button--small rcx-button--primary rcx-button').length!=0&&el.getAttribute('listener') !== 'true'){
            el.addEventListener('click',function () {this.getElementsByClassName('rcx-box rcx-box--full rcx-box--animated rcx-button--small rcx-button--primary rcx-button')[0].click();},false);
          }
        }
      }
    });
  });
  
  observer.observe(document.body, {
    characterDataOldValue: true, 
    subtree: true, 
    childList: true, 
    characterData: true
  });