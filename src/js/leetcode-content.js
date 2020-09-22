/* in-content.js
*
* This file has an example on how to communicate with other parts of the extension through a long lived connection (port) and also through short lived connections (chrome.runtime.sendMessage).
*
* Note that in this scenario the port is open from the popup, but other extensions may open it from the background page or not even have either background.js or popup.js.
* */

/*
// Extension port to communicate with the popup, also helps detecting when it closes
let port = null;

// Send messages to the open port (Popup)
const sendPortMessage = data => port.postMessage(data);

// Handle incoming popup messages
const popupMessageHandler = message => console.log('in-content.js - message from popup:', message);

// Start scripts after setting up the connection to popup
chrome.extension.onConnect.addListener(popupPort => {
    // Listen for popup messages
    popupPort.onMessage.addListener(popupMessageHandler);
    // Set listener for disconnection (aka. popup closed)
    popupPort.onDisconnect.addListener(() => {
        console.log('in-content.js - disconnected from popup');
    });
    // Make popup port accessible to other methods
    port = popupPort;
    // Perform any logic or set listeners
    sendPortMessage('message from leetcode-content.js');
});

// Response handler for short lived messages
const handleBackgroundResponse = response =>
    console.log('leetcode-content.js - Received response:', response);

// Send a message to background.js
chrome.runtime.sendMessage('Message from leetcode-content.js!', handleBackgroundResponse);
*/




let timerStarted = false; 
let currentTime = 0; 

// Create Textarea Element
const createTextareaElement = () => {
    const textarea = document.createElement("TEXTAREA");
    textarea.style.width = '100%';
    textarea.style.height = '100vh';
    textarea.placeholder = "Write your thoughts here..."
    return textarea;
};

// Create Iframe Youtube Video
const createYoutubeVideo = () => {
    const videoPlayer = document.createElement('IFRAME');
    videoPlayer.width = "560";
    videoPlayer.height = "315";
    videoPlayer.frameborder = "0";
    videoPlayer.allowfullscreen = true;
    videoPlayer.src = "https://www.youtube.com/embed/U6-X_QOwPcs";
    return videoPlayer;
};

const createTimerElement = () => {
    const timerEl = document.createElement('BUTTON');
    timerEl.setAttribute("type", "ghost");
    timerEl.classList.add('css-1nonhw5-ghost-xs');
    timerEl.style.marginRight = '5px';

    // Set Timer Icon
    const timerIcon = document.createElement('IMG');
    timerIcon.setAttribute('src', 'https://img.icons8.com/android/24/000000/clock.png');
    timerIcon.style.width = '12px';
    timerIcon.style.height = '12px';
    timerIcon.style.marginRight = '2px';

    // Set Timer Text
    const timerText = document.createElement('P');
    timerText.innerText = '00:00:00';
    timerText.style.margin = 'auto';
    timerText.style.marginLeft = '2px';

    timerEl.appendChild(timerIcon);
    timerEl.appendChild(timerText);

    // Add onclick for timerEl
    timerEl.addEventListener('click', () => {
        timerStarted = !timerStarted;

        if (!timerStarted) {
            timerEl.style.backgroundColor = 'transparent';
        } else {
            timerEl.style.backgroundColor = '#DDDDDD';
        }
        
        console.log('button clicked');
    });

    return timerEl;
};

// Create iframe youtube video 
const toggledNotepadElement = [createTextareaElement()];
const toggledVideoElement = [createYoutubeVideo()];
const timerElement = createTimerElement();

let notepadClicked = false;
let videoClicked = false; 
let colorDict = {
    false: 'css-1lelwtv-TabHeader',
    true: 'css-19j86kk-TabHeader'
};

// Timer Stuff
const getTwoDigits = (num) => ("0" + num).slice(-2);

const formatTime = () => `${(getTwoDigits(parseInt(currentTime/60)/60))}:${(getTwoDigits(parseInt(currentTime/60)%60))}:${getTwoDigits(parseInt(currentTime%60))}`;

// Perform Loop to Increment Timer 
const incrementTimer = () => {
    if (timerStarted) {
        currentTime++;
        // Change the timer text
        timerElement.lastChild.textContent = formatTime();

        console.log(timerElement.lastChild.innerText);
        console.log(timerElement.lastChild);
    }
    setTimeout(incrementTimer, 1000);
};

// Get content element
const getContentElement = () => {
    return document.getElementsByClassName('question-content__JfgR')[0];
}

const problemContent = getContentElement();
const notepadContent = createTextareaElement();
const videoContent = createYoutubeVideo();

// Add Panels
setTimeout(() => {
    // Logic goes here
    const tabsPanel = document.getElementsByClassName('e5i1odf2')[0];
    
    // Create Notepad Tab with onclick
    const notepadTab = tabsPanel.lastChild.cloneNode(true);
    notepadTab.firstChild.firstChild.firstChild.firstChild.lastChild.innerText = "Notepad";
    notepadTab.firstChild.setAttribute("href", "javascript:void(0)"); 
    notepadTab.firstChild.addEventListener('click', () => {
        // Toggle recent element 
        const recentElement = toggledNotepadElement.pop();

        // Goes back and forth 
        const contentEl = getContentElement();
        toggledNotepadElement.push(contentEl.firstChild);
        contentEl.removeChild(contentEl.firstChild);
        contentEl.appendChild(recentElement);

        notepadTab.classList.remove(colorDict[notepadClicked]);
        notepadTab.classList.add(colorDict[!notepadClicked]);

        notepadClicked = !notepadClicked;   
    });

    // Create Video Tab
    const videoTab = tabsPanel.lastChild.cloneNode(true);
    videoTab.firstChild.firstChild.firstChild.firstChild.lastChild.innerText = "Video";
    videoTab.firstChild.setAttribute("href", "javascript:void(0)"); 
    videoTab.firstChild.addEventListener('click', () => {
        // Toggle recent element
        const recentElement = toggledVideoElement.pop();

        // Goes back and forth
        const contentEl = getContentElement();
        toggledVideoElement.push(contentEl.firstChild);
        contentEl.removeChild(contentEl.firstChild);
        contentEl.appendChild(recentElement);

        videoTab.classList.remove(colorDict[videoClicked]);
        videoTab.classList.add(colorDict[!videoClicked]);

        videoClicked = !videoClicked;   
    });

    // Create Timer Element
    const timerEl = timerElement;
    const topContainerEl = document.getElementsByClassName('container__2zYY')[0];
    topContainerEl.insertBefore(timerEl, topContainerEl.firstChild);

    tabsPanel.appendChild(notepadTab);
    tabsPanel.appendChild(videoTab);

}, 2000);

incrementTimer();