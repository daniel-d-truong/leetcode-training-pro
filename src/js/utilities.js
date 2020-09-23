export const getTwoDigits = (num) => ("0" + num).slice(-2);

export const formatTime = (currentTime) => `${(getTwoDigits(parseInt((currentTime/60)/60)))}:${(getTwoDigits(parseInt(currentTime/60)%60))}:${getTwoDigits(parseInt(currentTime%60))}`;
