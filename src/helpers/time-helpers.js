const millisecondsInA = {
    day: 86400000,
    hour: 3600000,
    minute: 60000,
    second: 1000
};

/**
 * Transform a timestamp into age.
 *
 * @param {int} timestamp
 * @return {string} example: 2 days 20 hrs ago
 *
 */
export function getAgeStrFromTimestamp(timestamp) {

    let now = Date.now();

    // unix time -> date -> js timestamp
    timestamp = new Date(timestamp * 1000).getTime();

    const difference = now - timestamp;
    const age = getAgeObjFromMilliseconds(difference);

    return getAgeStrFromObject(age);
}

/**
 * Transform milliseconds to days + hours + minutes + seconds
 *
 * @param {int} milliseconds
 * @return {Object} properties: days, hours, minutes, seconds
 *
 */
function getAgeObjFromMilliseconds(milliseconds) {
    const age = {};

    if (milliseconds > millisecondsInA.day) { // days + hours
        age.days = transformMilliseconds(milliseconds, 'day');
        milliseconds = milliseconds - (millisecondsInA.day * age.days);
    } 
    
    if (milliseconds > millisecondsInA.hour) { // hours + minutes
        age.hours = transformMilliseconds(milliseconds, 'hour');
        milliseconds = milliseconds - (millisecondsInA.hour * age.hours);
    }
    
    if (milliseconds > millisecondsInA.minute) { // minutes
        age.minutes = transformMilliseconds(milliseconds, 'minute');
        milliseconds = milliseconds - (millisecondsInA.minute * age.minutes);
    } 
    
    if (milliseconds > 0) { // seconds
        age.seconds = transformMilliseconds(milliseconds);
    }

    return age;
}

/**
 * Given an object with days, hours, minutes and seconds, transforms it into a string.
 *
 * @param {Object} age
 * @return {string} example: 2 days 20 hrs ago
 *
 */
function getAgeStrFromObject(age) {

    let str = '';

    if (age.days) {
        str += age.days.toString();
        str += age.days === 1 ? ` day `: ` days `;
    }

    if (age.hours) {
        str += age.hours.toString();
        str += age.hours === 1 ? ` hr `: ` hrs `;
    }

    if (!age.days && age.minutes) {
        str += age.minutes.toString();
        str += age.minutes === 1 ? ` min `: ` mins `;
    }

    if (!age.days && !age.hours && age.seconds) {
        str += age.seconds.toString();
        str += age.seconds === 1 ? ` sec `: ` secs `;
    }

    return str + 'ago';
}

/**
 * Transforms milliseconds into a different unit.
 *
 * @param {int} milliseconds
 * @param {string} unit
 * @return {int} 
 * 
 * @example transformMilliseconds(1000) === 1; 
 *
 */
function transformMilliseconds(milliseconds, unit = 'second') {
    const reference = millisecondsInA[unit];
    
    let output = Math.floor(milliseconds / reference);

    return output;
}

