import { useEffect, useState } from 'react';
import { getLatestBlockNumber, getLastTenBlocksData } from '../helpers/block-helpers';
import { Link } from 'react-router-dom';

function BlockList() {

    const [blocksData, setBlocksData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let latest = await getLatestBlockNumber();
            setBlocksData(await getLastTenBlocksData(latest));
        }

        getData();

    }, []);

    return (<>
        {blocksData.length === 0 ? 'loading' :
            (<ul className="BlockList">
                {blocksData.map((block) => <BlockSummary key={block.number} data={block}/>)}
            </ul>)
        }
    </>)
}

function BlockSummary({ data }) {
    // 0xF156665C07b0D5396470b790763D5586979aDF49
    return (
        <li className="BlockSummary">
            <div>
                <p><Link to={`/block/${data.number}`}>{data.number}</Link></p>
                <p className="text--light">{data.age}</p>
            </div>
            <div>
                <p className="miner">Fee Recipient <Link to={`/address/${data.miner}`}>{data.miner}</Link></p>
                <p><Link to={`/txns?block=${data.number}`}>{data.txns} txns</Link></p>
            </div>

            <p className="reward">{data.rewardETH} ETH</p>
        </li>
    )
}

export default BlockList;

/**
 * TODO:
 * - MORE cta loads prev 10 blocks
 */