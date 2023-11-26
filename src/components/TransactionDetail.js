import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTransactionData, getTransactionFee, getTransactionValue } from '../helpers/transaction-helpers';
import { hexToETH } from '../helpers/gas-helpers';

function TransactionDetail({hash}) {
    const [transaction, setTransaction] = useState();

    useEffect(() => {
        const setData = async () => {
            const data = await getTransactionData(hash);
            data.txnFee = getTransactionFee(data.gasUsed, data.effectiveGasPrice);
            data.gasPrice = hexToETH(data.effectiveGasPrice['_hex']);

            data.value = await getTransactionValue(data.transactionHash);

            setTransaction(data);
        };

        setData();
    }, []);

    return (<>
        {!transaction ? 'loading' :
            (<section className="TransactionDetail">
                <dl>
                    <div>
                        <dt>Hash: </dt>
                        <dd className="breakline-anywhere">{hash}</dd>
                    </div>
                    <div>
                        <dt>Block number: </dt>
                        <dd><Link to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link></dd>
                    </div>
                    <div>
                        <dt>Block hash: </dt>
                        <dd  className="breakline-anywhere">{transaction.blockHash}</dd>
                    </div>
                    <div>
                        <dt>Index: </dt>
                        <dd>{transaction.transactionIndex}</dd>
                    </div>
                    <div>
                        <dt>From: </dt>
                        <dd className="breakline-anywhere">
                            <Link to={`/address/${transaction.from}`}>
                                {transaction.from}
                            </Link>
                        </dd>
                    </div>
                    <div>
                        <dt>To: </dt>
                        <dd className="breakline-anywhere">
                            <Link to={`/address/${transaction.to}`}>
                                {transaction.to}
                            </Link>
                        </dd>                    
                    </div>
                </dl>
                <dl>
                    <div>
                        <dt>Value: </dt>
                        <dd>{transaction.value ? transaction.value : 0} ETH</dd>
                    </div>
                    <div>
                        <dt>Gas used: </dt>
                        <dd>{parseInt(transaction.gasUsed, 16)}</dd>
                    </div>
                    <div>
                        <dt>Gas price: </dt>
                        <dd>{transaction.gasPrice}</dd>
                    </div>
                    <div>
                        <dt>Transaction fee: </dt>
                        <dd>{transaction.txnFee}</dd>
                    </div>
                </dl>
            </section>)
        }
    </>)
}

export default TransactionDetail;