const intervalSeconds = 10; //how long to wait before checking if updating status message

//get cookies
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

//gets user info and update personStatusLabel with response
function getUserInfo(personName, personStatusLabel) {
    let url = '/api/v1/users.info?username=' + personName;
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.setRequestHeader("X-User-Id", getCookie('rc_uid'));
    Http.setRequestHeader("X-Auth-Token", getCookie('rc_token'));
    Http.send();

    Http.onload = (e) => {
        let responseTxt = Http.responseText;
        let responseObj = JSON.parse(responseTxt);
        if (responseObj.user && (responseObj.user.statusText || responseObj.user.status)) {
            if (personStatusLabel) {
                //default statuses might not have statusText use status/presence in this case
                let status = responseObj.user.statusText ? responseObj.user.statusText : responseObj.user.status;
                personStatusLabel.setAttribute('title', status);
                personStatusLabel.setAttribute('data-title', status);
            }
        }
    }
}

function processPeople() {
    let nowDate = new Date();
    //get persons rows
    let persons = document.querySelectorAll('a.rc-box.rcx-box--full.rcx-sidebar-item.rcx-sidebar-item--clickable');
    if (persons.length == 0) {
        //for the search menu get people as well
        persons = document.querySelectorAll('.rcx-box.rcx-box--full.rcx-status-bullet');
    }
    persons.forEach(person => {
        //check if element really is an entry poiting to a person dm chat
        if (person.getAttribute("href") && person.getAttribute("href").indexOf('/direct') === 0) {
            //if never checked status ser laststatus to 0
            if (!person.getAttribute("lastStatus")) {
                person.setAttribute("lastStatus", 0);
            }
            //get date corresponding to last status
            let personDate = new Date(parseInt(person.getAttribute("lastStatus")));
            let diffSs = (nowDate.getTime() - personDate.getTime()) / 1000;//seconds
            //if has passed longer than intervalSeconds update
            if (diffSs > intervalSeconds) {
                //get person label
                let personLabel = person.querySelector('.rc-box.rcx-box--full.rcx-sidebar-item__title');
                let personName = personLabel.innerHTML;
                //get person status label
                let personStatusLabel = person.querySelector('.rcx-box.rcx-box--full.rcx-status-bullet');
                getUserInfo(personName, personStatusLabel);
                //update last status as now date
                person.setAttribute("lastStatus", nowDate.getTime());
            }
        }
    });
}

let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        let oldValue = mutation.oldValue;
        let newValue = mutation.target.textContent;
        if (oldValue !== newValue) {
            processPeople();
        }
    });
});


observer.observe(document.body, {
    characterDataOldValue: true,
    subtree: true,
    childList: true,
    characterData: true
});


//do a first process after some time for loading
setTimeout(processPeople, 3 * 1000);




