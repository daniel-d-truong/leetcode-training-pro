import * as Util from './utilities';

// Create Textarea Element
export const createTextareaElement = () => {
    const textarea = document.createElement("TEXTAREA");
    textarea.style.width = '100%';
    textarea.style.height = '100vh';
    textarea.placeholder = "Write your thoughts here..."
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


export const createTimerElement = () => {
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

    return timerEl;
};

export class TimerElement {
    constructor() {
        this.timerStarted = false;
        this.currentTime = 0;
        this.element = createTimerElement();
        this.addEventListeners();
        this.incrementTimer();
    }

    addEventListeners() {
        // Add onclick for timerEl
        this.element.addEventListener('click', () => {
            this.timerStarted = !this.timerStarted;

            console.log('on click')

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

    incrementTimer() {
        if (this.timerStarted) {
            this.currentTime++;
            // Change the timer text
            this.element.lastChild.textContent = Util.formatTime(this.currentTime);
        }
        setTimeout(() => this.incrementTimer()  , 1000);
    }
}
