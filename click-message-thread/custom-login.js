let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      let oldValue = mutation.oldValue;
      let newValue = mutation.target.textContent;
      if (oldValue !== newValue) {
        let messages = document.querySelectorAll('.rcx-box.rcx-box--full.rcx-message-container');
        messages.forEach(el => {
          if (!el.getAttribute('listener') && el.querySelector('.rcx-box.rcx-box--full.rcx-box--animated.rcx-button--small.rcx-button--primary.rcx-button')) {
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