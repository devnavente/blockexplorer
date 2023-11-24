import { useState } from 'react';

function Search() {
    const [searchValue, setSearchValue] = useState('');

    return (<>
        <form className="Search">
            <label htmlFor="search" className="sr-only">Search:</label>
            <input 
                type="search" 
                placeholder="Block number, txn hash, address..."
                onChange={(val) => setSearchValue(val)}
                value={searchValue}
            />
            <button type="submit" className="flex--center">Find</button>
        </form>
    </>);
}

export default Search;