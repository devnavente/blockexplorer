import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { getAgeStrFromTimestamp } from './time-helpers';
import { getTransactionData } from './transaction-helpers';

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

    const { gasLimit, gasUsed, transactions, timestamp, baseFeePerGas, hash } = blockData;

    blockData.intGasLimit = parseInt(gasLimit.toBigInt().toString());
    blockData.intGasUsed = parseInt(gasUsed.toBigInt().toString());
    blockData.gasUsedPercentage = Math.round(
        blockData.intGasUsed / (blockData.intGasLimit / 100)
    ).toFixed(2);

    blockData.txns = transactions.length;
    blockData.age = getAgeStrFromTimestamp(timestamp);

    blockData.reward = await getBlockReward({
        //number: blockNumber,
        //transactions,
        baseFeePerGas,
        gasUsed,
        hash
    });

    blockData.rewardETH = Utils.formatEther(blockData.reward.toString()).slice(0, 7);

    return blockData;
}

/**
 * Given a block number, retrieves data from this block and the previous 9.
 *
 * @param {string} blockNumber
 * @return {Array<Object>} 
 * 
 * Each object in the returned array contains the following properties:
 * - txns (the number of transactions in the block)
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

async function getBlockReward(blockData) {

    let tips = [];
    let sumTips = 0;
    
    //The response returns the transaction receipts of the `blockNumber`
    let { receipts } = await alchemy.core.getTransactionReceipts({blockNumber: blockData.hash});

    for (const tx of receipts) {
        //const data = await getTransactionData(tx);
        //const { gasUsed } = await alchemy.core.getTransactionReceipt(tx.hash);
        const totalFee = parseInt(tx.gasUsed, 16) * parseInt(tx.effectiveGasPrice, 16);

        tips.push(Number(totalFee.toString()));
    }

    if (tips.length > 0) {
        sumTips = tips.reduce(
            (total, current) => total + current
        );
    }

    const burnedFee = blockData.gasUsed * blockData.baseFeePerGas;

    // nephew rewards
    const baseBlockReward = 2;
    /*
    const nephewReward = baseBlockReward / 32;
    const uncleCount = await alchemy.core.getBlock(blockData.number); // getUncleCountByBlockNumber
    const totalNephewReward = uncleCount * nephewReward;
    */

    // TODO: uncle rewards

    const blockReward = baseBlockReward + (sumTips - Number(burnedFee));

    return blockReward;

}

async function getUncleBlock(hash) {
    const blockData = await alchemy.core.getBlockByHash(hash);
    return blockData;
}



