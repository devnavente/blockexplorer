import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlockData } from '../helpers/block-helpers';
import { calculateGasPricesInBlock } from '../helpers/gas-helpers';

function BlockDetail({ number }) {
    const [block, setBlock] = useState();
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const setData = async () => {
            let block = await getBlockData(parseInt(number));
            setBlock(block);

            let prices = await calculateGasPricesInBlock(block.hash);
            setPrices(prices);
        }

        setData();
    }, [number])

    return (<>
        {!block ? 'loading' :
            (<section className="BlockDetail">
                <h2>Block details</h2>
                <dl>
                    <div>
                        <dt>Hash: </dt>
                        <dd className="breakline-anywhere">{block.hash}</dd>
                    </div>
                    <div>
                        <dt>Miner: </dt>
                        <dd className="breakline-anywhere">
                            <Link to={`/address/${block.miner}`}>{block.miner}</Link>
                        </dd>
                    </div>
                    <div>
                        <dt>Nonce: </dt>
                        <dd>{block.nonce}</dd>
                    </div>
                    <div>
                        <dt>Parent hash: </dt>
                        <dd className="breakline-anywhere">{block.parentHash}</dd>
                    </div>
                    <div>
                        <dt>Gas used: </dt>
                        <dd>{block.intGasUsed} ({block.gasUsedPercentage} %)</dd>
                    </div>
                    <div>
                        <dt>Gas limit: </dt>
                        <dd>{block.intGasLimit}</dd>
                    </div>
                    <div>
                        <dt>Timestamp: </dt>
                        <dd>{block.age} ({block.date})</dd>
                    </div>
                </dl>
                <dl>
                    <div>
                        <dt>Txns: </dt>
                        <dd><Link to={`/txns/${number}`}>{block.txns} transactions</Link></dd>
                    </div>
                    <div>
                        <dt>Highest gas price: </dt>
                        <dd>{prices && prices.highest ? prices.highest : '0'} Gwei</dd>
                    </div>
                    <div>
                        <dt>Lowest gas price: </dt>
                        <dd>{prices && prices.lowest ? prices.lowest : '0'} Gwei</dd>
                    </div>
                    <div>
                        <dt>Average: </dt>
                        <dd>{prices && prices.average ? prices.average : '0'} Gwei</dd>
                    </div>
                </dl>
            </section>)
        }
    </>)
}

export default BlockDetail;