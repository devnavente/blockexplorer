import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTransactionsInBlock, getTransactionFee, getTransactionValue } from '../helpers/transaction-helpers';
import { truncateAddress } from '../helpers/address-helpers';

function TransactionsList({ number }) {
    const [transactions, setTransactions] = useState([]);
    const [backupText, setBackupText] = useState('loading');

    useEffect(() => {
        const setData = async () => {
            const transactionsData = await getTransactionsInBlock(number);
            setTransactions(transactionsData);
            setBackupText('No transactions were found');
        }

        setData();
    }, [])

    return (<>
        {!transactions.length ? backupText : <TransactionsTable transactions={transactions} />}
    </>)
}

function TransactionsTable({ transactions, block = false }) {
    return (<table>
        <thead>
            <tr>
                <th>Txn hash</th>
                {block && <th>Block</th>}
                <th>From</th>
                <th>To</th>
                <th>Txn fee</th>
            </tr>
        </thead>
        <tbody>
            {transactions.map((tx) => (
                <TransactionRow tx={tx} block={block}  key={tx.transactionHash}/>
            ))}
        </tbody>
    </table>)
}

function TransactionRow({ tx, block = false }) {

    tx.blockNumber = block ? parseInt(tx.blockNumber, 16) : null;
    tx.truncatedFrom = truncateAddress(tx.from);
    tx.truncatedTo = truncateAddress(tx.to);
    tx.txnFee = getTransactionFee(tx.gasUsed, tx.effectiveGasPrice);

    return (
        <tr>
            <td>
                <Link to={`/tx/${tx.transactionHash}`} className="ellipsis-overflow">{tx.transactionHash}</Link>
            </td>
            {block && <td><Link to={`/block/${tx.blockNumber}`}>{tx.blockNumber}</Link></td>}
            <td>
                <Link to={`/address/${tx.from}`}>
                    {tx.truncatedFrom}
                </Link>
            </td>
            <td>
                <Link to={`/address/${tx.to}`}>
                    {tx.truncatedTo}
                </Link>
            </td>
            <td>{tx.txnFee} ETH</td>
        </tr>
    );
}

export default TransactionsList;