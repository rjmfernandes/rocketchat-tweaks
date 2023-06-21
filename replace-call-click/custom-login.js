function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    let oldValue = mutation.oldValue;
    let newValue = mutation.target.textContent;
    if (oldValue !== newValue) {
    	let oldbs=document.querySelectorAll(".rcx-box.rcx-box--full.rcx-button--tiny-square.rcx-button--square.rcx-button--icon.rcx-button.rcx-button-group__item.rcx-css-ll6zd0");
		if(oldbs.length>0){
			let oldb=oldbs[0];
			if(oldb.getAttribute("title")!=='Call2'){
				let newb=oldb.cloneNode(true);
				newb.setAttribute('title','Call2');
				oldb.style.display='none';
				oldb.parentNode.prepend(newb);
				let rid=document.querySelectorAll(".rcx-box.rcx-box--full.rcx-css-xoqav3")[0].getAttribute("data-qa-rc-room");
				newb.addEventListener("click", function () {
					let url = '/api/v1/commands.run';
					var data = JSON.stringify({
					  "command": "pexip-meeting",
					  "roomId": rid
					});
				    const Http = new XMLHttpRequest();
				    Http.withCredentials = true;
				    Http.open("POST", url);
				    Http.setRequestHeader("X-User-Id", getCookie('rc_uid'));
				    Http.setRequestHeader("X-Auth-Token", getCookie('rc_token'));
				    Http.setRequestHeader("Content-Type", "application/json");
				    Http.setRequestHeader("Authorization", "Basic ZGVtbzpkZW1v");
				    Http.send(data);
				});
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