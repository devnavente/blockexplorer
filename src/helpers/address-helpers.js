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
 * Checks if the given string is a valid address.
 *
 * @param {string} x
 * @return {boolean} true if address exists
 *
 */
export async function isAddress(x) {
    try {
        const address = await alchemy.core.getBalance(x);

        return address !== null;
    } catch (err) {
        //console.log('error isAddress',err)
        return false;
    }
}

// FIXME: isContractAddress doesn't exist, version not matching docs?
export async function isContractAddress(address) {
    const result = await alchemy.core.isContractAddress(address); // Wrapped ETH address

    console.log('result',result);
}

/**
 * Checks if given address has ENS name associated.
 *
 * @param {string} address
 * @return {string|null}
 *
 */
export async function lookupAddress(address) {
    const name = await alchemy.core.lookupAddress(address);
    return name;
}

/**
 * Makes an address shorter, showing only the first 8 and last 8 characters
 *
 * @param {string} address
 * @return {string} shortened address
 *
 */
export function truncateAddress(address) {
    if (!address) return '';
    return address.slice(0, 8) + '...' + address.slice(-8);
}

/**
 * Given an address, returns its balance
 *
 * @param {string} address
 * @return {Object} BigNumber
 *
 */
export async function getBalance(address) {
    const balance = await alchemy.core.getBalance(address);

    return balance;
}