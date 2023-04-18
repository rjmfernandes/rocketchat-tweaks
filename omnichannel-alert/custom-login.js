const maxSeconds = 20;
const intervalSeconds = 5;
const firstExecutionSeconds = 2;
const warning_message = ' 🔺';
const consoleDebug = true;

function warningOnChats() {
  if(consoleDebug)
    console.log('executing now warning on chats');
  let nowDate = new Date();
  if(consoleDebug)
    console.log('now=' + nowDate.toLocaleString());
  //get chats
  let chats = document.querySelectorAll('.rc-box.rcx-box--full.rcx-sidebar-item.rcx-sidebar-item--clickable');
  chats.forEach(chat => {
    //if it has an href corresponding to omnichannel chats
    if (chat.getAttribute("href") && chat.getAttribute("href").indexOf('/live') === 0) {
      let chatDate = new Date(chat.getAttribute('time'));
      if(consoleDebug)
        console.log('chat date=' + chatDate.toLocaleString());
      let diffSs = (nowDate.getTime() - chatDate.getTime()) / 1000;//seconds
      if(consoleDebug)
        console.log('difference=' + diffSs);
      if(consoleDebug)
        console.log(maxSeconds);
      //get the inner div with label for chat
      let testBox = chat.querySelector('.rc-box.rcx-box--full.rcx-sidebar-item__title');
      //if the inner div exists and the time passed since last update longer than maxSeconds
      //and not marked as warned already
      if (testBox && diffSs > maxSeconds && (!chat.getAttribute('warned') || chat.getAttribute('warned') === 'false')) {
        //we store old label under warned and include on label the warning message
        chat.setAttribute('warned', testBox.innerHTML);
        testBox.innerHTML = testBox.innerHTML + warning_message;
      //else if the inner div exists and already marked as warned and time since last update less than maxSeconds
      } else if (testBox && chat.getAttribute('warned') && chat.getAttribute('warned') !== 'false' && diffSs < maxSeconds) {
        //we set warned as false and use the value stored on it as the new label
        testBox.innerHTML = chat.getAttribute('warned');
        chat.setAttribute('warned', 'false');
      }
    }

  });
}

//the periodic execution
var intervalId = setInterval(warningOnChats, intervalSeconds * 1000);

//the first execution we usually want to happen faster just after loading
setTimeout(warningOnChats, firstExecutionSeconds * 1000);