import * as Util from './utilities';
const problemName = window.location.href.split('/')[4];

// Create Textarea Element
export const createTextareaElement = () => {
    // Get cookie name
    const cookieName = Util.generateCookieForProblem(problemName, Util.PurposeEnum.notepad);

    // Create textarea elements
    const textarea = document.createElement("TEXTAREA");
    textarea.style.width = '100%';
    textarea.style.height = '70vh';
    textarea.placeholder = "Write your thoughts here..."
    textarea.value = Util.getCookie(cookieName);

    const onInputChange = Util.debounce((e) => {
        console.log(e);
        Util.setCookie(cookieName, e.target.value);
    }, 50);

    textarea.addEventListener('input', onInputChange);
    textarea.addEventListener('propertychange', onInputChange); // For IE8
    return textarea;
};

// Create Iframe Youtube Video
export const createYoutubeVideo = () => {
    const videoPlayer = document.createElement('IFRAME');
    videoPlayer.width = "560";
    videoPlayer.height = "315";
    videoPlayer.frameborder = "0";
    videoPlayer.allowfullscreen = true;
    videoPlayer.src = "https://www.youtube.com/embed/U6-X_QOwPcs";
    return videoPlayer;
};

export class TimerElement {
    constructor() {
        this.timerStarted = false;
        this.cookieName = Util.generateCookieForProblem(problemName, Util.PurposeEnum.timer);
        this.currentTime = Util.getCookie(Util.generateCookieForProblem(problemName, Util.PurposeEnum.timer) || 0);
        this.element = this.createTimerElement();
        this.addEventListeners();
        this.incrementTimer();
    }

    addEventListeners() {
        // Add onclick for timerEl
        this.element.addEventListener('click', () => {
            this.timerStarted = !this.timerStarted;

            if (!this.timerStarted) {
                this.element.style.backgroundColor = 'transparent';
            } else {
                this.element.style.backgroundColor = '#DDDDDD';
            }
        }); 

        this.element.addEventListener('mouseover', () => {
            this.element.style.border = "1px solid";
        });

        this.element.addEventListener('mouseout', () => {
            this.element.style.border = "none";
        });
    }

    createTimerElement() {
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
    
        console.log(this.currentTime);
        // Set Timer Text
        const timerText = document.createElement('P');
        timerText.innerText = Util.formatTime(this.currentTime);
        timerText.style.margin = 'auto';
        timerText.style.marginLeft = '2px';
    
        timerEl.appendChild(timerIcon);
        timerEl.appendChild(timerText);
    
        return timerEl;
    };

    incrementTimer() {
        if (this.timerStarted) {
            this.currentTime++;
            // Change the timer text
            this.element.lastChild.textContent = Util.formatTime(this.currentTime);

            // Set cookie to new time 
            Util.setCookie(this.cookieName, this.currentTime);
        }
        setTimeout(() => this.incrementTimer(), 1000);
    }
}
