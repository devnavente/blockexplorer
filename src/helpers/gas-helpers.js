import { getBlockData } from './block-helpers';
import { getTransactionData } from './transaction-helpers';

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

export async function calculateGasPricesInBlock(blockNumber) {
    console.log('gas prices!');
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
    console.log('gas prices!', highest, lowest, average);
    return { highest, lowest, average };
}