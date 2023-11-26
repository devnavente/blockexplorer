import { useEffect, useState } from 'react';
import { getLatestBlockNumber, getLastTenBlocksData } from '../helpers/block-helpers';
import { Link } from 'react-router-dom';

function BlockList() {

    const [blocksData, setBlocksData] = useState([]);
    const [nextBlock, setNextBlock] = useState();

    useEffect(() => {
        const getData = async () => {
            let latest = await getLatestBlockNumber();
            setBlocksData(await getLastTenBlocksData(latest));
            setNextBlock(latest - 10);
        }

        getData();

    }, []);

    const getTenMore = async (block) => {
        const cta = document.querySelector('button#moreBlocks');
        cta.innerText = '...';
        cta.setAttribute('disabled', 'disabled');

        const newBlocksData = await getLastTenBlocksData(block);
        setBlocksData([...blocksData, ...newBlocksData]);
        setNextBlock(block - 10);

        cta.innerText = 'More';
        cta.removeAttribute('disabled');
    }

    return (<>
        {blocksData.length === 0 ? 'loading' :
            (<div className="BlockList">
                <ul>
                    {blocksData.map((block) => <BlockSummary key={block.number} data={block}/>)}
                </ul>
                <button id="moreBlocks" className="cta" onClick={() => getTenMore(nextBlock)}>More</button>
            </div>)
        }
    </>)
}

function BlockSummary({ data }) {

    return (
        <li className="BlockSummary">
            <div>
                <p><Link to={`/block/${data.number}`}>{data.number}</Link></p>
                <p className="text--light">{data.age}</p>
            </div>
            <div>
                <p className="miner">Fee Recipient <Link className="breakline-anywhere" to={`/address/${data.miner}`}>{data.miner}</Link></p>
                <p><Link to={`/txns/${data.number}`}>{data.txns} txns</Link></p>
            </div>

            <p className="reward">{data.rewardETH} ETH</p>
        </li>
    )
}

export default BlockList;