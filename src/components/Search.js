import { useState } from 'react';
import { isBlock } from '../helpers/block-helpers';
import { isTransaction } from '../helpers/transaction-helpers';
import { isAddress } from '../helpers/address-helpers';


function Search() {
    const [searchValue, setSearchValue] = useState('');

    const find = async (e) => {
        e.preventDefault();

        const value = searchValue.trim();
        if (value === '') return ;

        const block = await isBlock(value);
        const transaction = await isTransaction(value);
        const address = await isAddress(value);

        let route = '';
        if (block) {
            route = `/block/${value}`;
        } else if (transaction) {
            route = `/tx/${value}`;
        } else if (address) {
            route = `/address/${value}`;
        } else {
            route = `/not-found`;
        }
        
        window.location = route;
    };

    return (<>
        <form className="Search">
            <label htmlFor="search" className="sr-only">Search:</label>
            <input 
                type="search" 
                placeholder="Block number, txn hash, address..."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
            />
            <button type="submit" className="flex--center" onClick={find}>Find</button>
        </form>
    </>);
}

export default Search;

/**
 * TODO:
 * Find out if the given value is an address, txn hash or block number
 * then redirect to the proper route
 */