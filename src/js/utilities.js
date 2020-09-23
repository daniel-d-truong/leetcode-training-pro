export const getTwoDigits = (num) => ("0" + num).slice(-2);

export const formatTime = (currentTime) => `${(getTwoDigits(parseInt((currentTime/60)/60)))}:${(getTwoDigits(parseInt(currentTime/60)%60))}:${getTwoDigits(parseInt(currentTime%60))}`;

export const setCookie = (name, value) => {
    const today = new Date();
    const expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}

export const getCookie = (name) => {
    const re = new RegExp(name + "=([^;]+)");
    const value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

export const generateCookieForProblem = (problem) => `notes-for-${problem}`;

export const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
		const context = this, args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};