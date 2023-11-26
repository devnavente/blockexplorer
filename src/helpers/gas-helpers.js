import { getTransactionData } from './transaction-helpers';
import { Alchemy, Network, Utils } from 'alchemy-sdk';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const weiInGwei = 1000000000;

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

/**
 * Calculates highest, lowest and average gas price in the block (in Gwei)
 *
 * @param {string} hash of the block
 * @return {Object}  {highest, lowest, average}
 *
 */
export async function calculateGasPricesInBlock(hash) {
    const transactions = await alchemy.core.getTransactionReceipts({blockNumber: hash});

    if (!transactions.receipts || transactions.receipts.length === 0) return 0;

    const { receipts } = transactions;

    let highest = -Infinity;
    let lowest = Infinity;
    let sum = 0;
    for (let tx of receipts) {
        let gasPrice = parseInt(tx.effectiveGasPrice, 16);

        sum += gasPrice;
        highest = Math.max(highest, gasPrice);
        lowest = Math.min(lowest, gasPrice);
    }

    let average =  Math.round(sum / receipts.length / weiInGwei );
    highest /= weiInGwei;
    lowest /= weiInGwei;

    return { highest, lowest, average };
}

/**
 * Provided a transaction hash, returns the amount of gas used in Wei.
 *
 * @param {string} hash of the transaction
 * @return {string}  gas used in wei
 *
 */
export async function getGasUsage(tx) {
    let transactionData = await getTransactionData(tx);
    return getWeiValueFromGasObject(transactionData.gasUsed);
}

/**
 * Transforms an hexadecimal Wei value into ETH.
 *
 * @param {string} hex hexadecimal value
 * @return {string}  value in ETH
 *
 */
export function hexToETH(hex) {
    const int = parseInt(hex, 16);
    const ETH = Utils.formatEther(int.toString());
    return ETH;

}
