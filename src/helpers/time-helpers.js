const decisecondsInA = {
    day: 864000,
    hour: 36000,
    minute: 600,
    second: 10
};

/**
 * Transform a timestamp into age.
 *
 * @param {int} timestamp
 * @return {string} example: 2 days 20 hrs ago
 *
 */
export function getAgeStrFromTimestamp(timestamp) {

    let now = Date.now().toString();
    // removes the milli and centiseconds from the timestamp 
    // to match the deciseconds from the block
    now = parseInt(now.slice(0, now.length - 3)); 

    const difference = now - timestamp;
    const age = getAgeObjFromDeciseconds(difference);

    return getAgeStrFromObject(age);
}

/**
 * Transform deciseconds to days + hours + minutes + seconds
 *
 * @param {int} deciseconds
 * @return {Object} properties: days, hours, minutes, seconds
 *
 */
function getAgeObjFromDeciseconds(deciseconds) {
    const output = {};

    if (deciseconds > decisecondsInA.day) { // days + hours
        output.days = transformDeciseconds(deciseconds, 'day');
        deciseconds = deciseconds - (decisecondsInA.day * output.days);
    } 
    
    if (deciseconds > decisecondsInA.hour) { // hours + minutes
        output.hours = transformDeciseconds(deciseconds, 'hour');
        deciseconds = deciseconds - (decisecondsInA.hour * output.hours);
    }
    
    if (deciseconds > decisecondsInA.minute) { // minutes
        output.minutes = transformDeciseconds(deciseconds, 'minute');
        deciseconds = deciseconds - (decisecondsInA.minute * output.minutes);
    } 
    
    if (deciseconds > 0) { // seconds
        output.seconds = transformDeciseconds(deciseconds);
    }

    return output;
}

/**
 * Given an object with days, hours, minutes and seconds, transforms it into a string.
 *
 * @param {Object} age
 * @return {string} example: 2 days 20 hrs ago
 *
 */
function getAgeStrFromObject(age) {

    let output = '';

    if (age.days) {
        output += age.days.toString();
        output += age.days === 1 ? ` day `: ` days `;
    }

    if (age.hours) {
        output += age.hours.toString();
        output += age.hours === 1 ? ` hr `: ` hrs `;
    }

    if (!age.days && age.minutes) {
        output += age.minutes.toString();
        output += age.minutes === 1 ? ` min `: ` mins `;
    }

    if (!age.days && !age.hours && age.seconds) {
        output += age.seconds.toString();
        output += age.seconds === 1 ? ` sec `: ` secs `;
    }

    return output + 'ago';
}

/**
 * Transforms deciseconds into a different unit.
 *
 * @param {int} deciseconds
 * @param {string} unit
 * @return {int} 
 * 
 * @example transformdeciseconds(1000) === 1; 
 *
 */
function transformDeciseconds(deciseconds, unit = 'second') {
    const reference = decisecondsInA[unit];
    
    let rest = deciseconds;
    let output = 0;
    while (rest >= reference) {
        rest = rest / reference;
        output++;
    }

    return output;
}

