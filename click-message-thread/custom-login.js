let alsoForNonThreaded = true;
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    let oldValue = mutation.oldValue;
    let newValue = mutation.target.textContent;
    if (oldValue !== newValue) {
      //get message parent divs to add the behaviour
      let messages = document.querySelectorAll('.rcx-box.rcx-box--full.rcx-message-container');
      messages.forEach(el => {
        //check if message element has no click listener set and if alsoForNonThreaded is false that it contains a reply button
        if (!el.getAttribute('listener')
          && (alsoForNonThreaded || el.querySelector('.rcx-box.rcx-box--full.rcx-box--animated.rcx-button--small.rcx-button--primary.rcx-button'))
        ) {
          
          el.addEventListener('click', function () {
            if (alsoForNonThreaded && !el.querySelector('.rcx-box.rcx-box--full.rcx-box--animated.rcx-button--small.rcx-button--primary.rcx-button')) {
              //make the click on message element the same as clicking the reply action on message toolbox
              this.parentElement.querySelector('.rcx-box.rcx-box--full.rcx-message-toolbox__wrapper').children[0].children[0].children[2].click();
            } else {
              //make the click on message element the same as clicking the inner reply button
              this.querySelector('.rcx-box.rcx-box--full.rcx-box--animated.rcx-button--small.rcx-button--primary.rcx-button').click();
            }
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