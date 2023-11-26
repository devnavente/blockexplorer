import { Alchemy, Network, Utils } from 'alchemy-sdk';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

/**
 * Returns the list of transactions in a block
 *
 * @param {number} blockNumber
 * @return {Array} list of transactions
 *
 */
export async function getTransactionsList(blockNumber) {
    const transactionsList = await alchemy.core.getBlockWithTransactions(blockNumber);

    return transactionsList;
}

/**
 * Returns the data of a transaction
 *
 * @param {string} tx transaction hash
 * @return {Object} data
 *
 */
export async function getTransactionData(tx) {
    const transactionData = await alchemy.core.getTransactionReceipt(tx);

    return transactionData;
}

/**
 * Checks if the given string is a valid transaction hash.
 *
 * @param {string} x
 * @return {boolean} true if transaction exists
 *
 */
export async function isTransaction(x) {
    try {
        const transaction = await alchemy.core.getTransactionReceipt(x)
        return transaction !== null;
    } catch (err) {
        return false;
    }
}

/**
 * Gets all transactions in a given block
 *
 * @param {string} blockNumber
 * @return {Array<Object>} data
 *
 */
export async function getTransactionsInBlock(blockNumber) {
    blockNumber = parseInt(blockNumber);
    const blockData = await alchemy.core.getBlock(blockNumber);
    const data = await alchemy.core.getTransactionReceipts({blockNumber: blockData.hash});
    
    if (!data.receipts || data.receipts.length === 0) return [];

    const { receipts } = data;
    
    return receipts;
}

/**
 * Calculates and returns the transaction fee in ETH
 *
 * @param {string} gasUsed hexadecimal value
 * @param {string} effectiveGasPrice hexadecimal value
 * @return {string}
 *
 */
export function getTransactionFee(gasUsed, effectiveGasPrice) {
    const totalFee = parseInt(gasUsed, 16) * parseInt(effectiveGasPrice, 16);
    const totalFeeETH = Utils.formatEther(totalFee.toString());//.slice(0, 7);
    return totalFeeETH;
}

/**
 * Returns the value of a transaction in ETH
 *
 * @param {string} tx transaction hash
 * @return {string|null}
 *
 */
export async function getTransactionValue(tx) {
    const data = await alchemy.transact.getTransaction(tx).then(data => data);

    if (data.value) {
        const value = parseInt(data.value, 16);
        const valueETH = Utils.formatEther(value.toString());

        return valueETH;
    } 

    return null;
}
