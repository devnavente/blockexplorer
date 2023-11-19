import { Alchemy, Network } from 'alchemy-sdk';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

/**
 * Gets the number of the last block in the blockchain
 * (at the moment the method is called).
 *
 * @return {number} Block number
 *
 */
export async function getLatestBlockNumber() {
    const blockNumber = await alchemy.core.getBlockNumber();
    return blockNumber;
}

/**
 * Given a block number, retrieves its data.
 *
 * @param {string} blockNumber
 * @return {Object} Block data
 *
 */
export async function getBlockData(blockNumber) {
    blockNumber = parseInt(blockNumber);
    const blockData = await alchemy.core.getBlock(blockNumber);

    const { gasLimit, gasUsed, transactions, timestamp } = blockData;

    blockData.intGasLimit = parseInt(gasLimit.toBigInt().toString());
    blockData.intGasUsed = parseInt(gasUsed.toBigInt().toString());
    blockData.gasUsedPercentage = Math.round(
        blockData.intGasUsed / (blockData.intGasLimit / 100)
    ).toFixed(2);

    blockData.height = transactions.length;
    blockData.age = getAgeStrFromTimestamp(timestamp);

    return blockData;
}

/**
 * Given a block number, retrieves data from this block and the previous 9.
 *
 * @param {string} blockNumber
 * @return {Array<Object>} 
 * 
 * Each object in the returned array contains the following properties:
 * - height (the number of transactions in the block)
 * - gasLimit (in Wei)
 * - gasUsed (in Wei)
 * - gasUsedPercentage (gasUsed / (gasLimit / 100))
 * - age (string of when the block was created, example: 2 days 20 hrs ago)
 * - number
 * - timestamp
 */
export async function getLastTenBlocksData(blockNumber) {
    const blocksData = [];

    let blockData = null;
    for (let i = 0; i < 10; i++) {
        blockData = await getBlockData(blockNumber - i);

        blocksData.push(blockData);
    }

    return blocksData;

}

export async function getTransactionsList(blockNumber) {
    const transactionsList = await alchemy.core.getBlockWithTransactions(blockNumber);

    return transactionsList;
}

export async function getTransactionData(tx) {
    const transactionData = await alchemy.core.getTransactionReceipt(tx);

    return transactionData;
}

export async function calculateGasPricesInBlock(blockNumber) {
    const blockData = await getBlockData(blockNumber);
    const { transactions } = blockData;

    let highest = -Infinity;
    let lowest = Infinity;
    let sum = 0;
    for (let tx of transactions) {
        let transactionData = await getTransactionData(tx);
        let gasPrice = getWeiValueFromGasObject(transactionData.effectiveGasPrice);
        let intGasPrice = parseInt(gasPrice);

        sum += intGasPrice;
        highest = Math.max(highest, intGasPrice);
        lowest = Math.min(lowest, intGasPrice);
    }

    let average =  Math.round(sum / transactions.length);

    return { highest, lowest, average };
}

/**
 * Transform objects (gas limit, gas use) into wei.
 *
 * @param {Object} gas
 * @return {string}  Value in wei
 *
 */
export function getWeiValueFromGasObject(gas) {
    return gas.toBigInt().toString();
}

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

    //console.log(output);

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