import { useEffect, useState } from 'react';
import { getBlockData, calculateGasPricesInBlock } from '../utils';

/** Components */
import { TransactionsList } from './TransactionsList';

function BlockDetail({match:{params:{number}}}) {
    const [block, setBlock] = useState();
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const getData = async () => {
            let data = await getBlockData(parseInt(number));
            setBlock(data);

            data = await calculateGasPricesInBlock(number);
            setPrices(data);

        }
        
        getData();
    }, [])

    return (<>
        {!block ? 'loading' : 
            (<section>
                <h1>{number}</h1>

                <dl>
                    <div>
                        <dt>Hash</dt>
                        <dd>{block.hash}</dd>
                    </div>
                    <div>
                        <dt>Miner</dt>
                        <dd>{block.miner}</dd>
                    </div>
                    <div>
                        <dt>Nonce</dt>
                        <dd>{block.nonce}</dd>
                    </div>
                    <div>
                        <dt>Parent hash</dt>
                        <dd>{block.parentHash}</dd>
                    </div>
                    <div>
                        <dt>Gas used</dt>
                        <dd>{block.intGasUsed} ({block.gasUsedPercentage} %)</dd>
                    </div>
                    <div>
                        <dt>Timestamp</dt>
                        <dd>{block.timestamp}</dd>
                    </div>
                </dl>

                <section>
                    <h2>Transactions</h2>

                    <dl>
                        <div>
                            <dt>Number of transactions</dt>
                            <dd>{block.height}</dd>
                        </div>    
                        <div>
                            <dt>Highest gas price</dt>
                            <dd>{prices && prices.highest ? prices.highest : 'loading'} Gwei</dd>
                        </div>                    
                        <div>
                            <dt>Lowest gas price</dt>
                            <dd>{prices && prices.lowest ? prices.lowest : 'loading'} Gwei</dd>
                        </div>                    
                        <div>
                            <dt>Average</dt>
                            <dd>{prices && prices.average ? prices.average : 'loading'} Gwei</dd>
                        </div>                    
                    </dl>
                </section>
            </section>)
        }
    </>)}

export default BlockDetail;