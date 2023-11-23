import { Alchemy, Network } from 'alchemy-sdk';
import { getAgeStrFromTimestamp } from './time-helpers';

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



