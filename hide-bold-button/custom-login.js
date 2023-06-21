let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let oldValue = mutation.oldValue;
      let newValue = mutation.target.textContent;
      if (oldValue !== newValue) {
        let buttons=document.querySelectorAll('.rcx-box.rcx-box--full.rcx-icon--name-bold.rcx-icon.rcx-css-4pvxx3');
        if(buttons.length>0&&buttons[0].parentElement.style.display!=='none') {
          buttons[0].parentElement.style.display='none'
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