export const nextIndex = (index, length, direction=1) => length ? ((index+direction)%length+length)%length : -1;
export const shouldResume = ({now,lastAction,playing,listenUntil}) => !playing && now-lastAction>=60000 && now>=listenUntil;
export const rotationItems = (items,videoMode) => items.filter(x=>x.eligible && (x.type==='photo'||x.type==='award'||x.type==='news'||(videoMode&&x.type==='video')));

export const videoIsActive = state => state === 1 || state === 3;
