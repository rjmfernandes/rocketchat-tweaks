let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let oldValue = mutation.oldValue;
      let newValue = mutation.target.textContent;
      if (oldValue !== newValue) {
        //get message parent divs to add the behaviour
        let messages = document.querySelectorAll('.rcx-box.rcx-box--full.rcx-message-container');
        messages.forEach(el => {
          //check if message element has no click listener set and contains a reply button
          if (!el.getAttribute('listener') && el.querySelector('.rcx-box.rcx-box--full.rcx-box--animated.rcx-button--small.rcx-button--primary.rcx-button')) {
            //make the click on message element the same as clicking the inner reply button
            el.addEventListener('click', function () {
              this.querySelector('.rcx-box.rcx-box--full.rcx-box--animated.rcx-button--small.rcx-button--primary.rcx-button').click();
            }, false);
            el.setAttribute('listener', 'true');
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    characterDataOldValue: true,
    subtree: true,
    childList: true,
    characterData: true
  });