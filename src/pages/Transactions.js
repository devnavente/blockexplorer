import { useParams, Link } from 'react-router-dom';
import TransactionsList from '../components/TransactionsList';

function Transactions() {
    const { number } = useParams();

    return (<>
        <div className="Transactions max-width--900 margin--auto padding--25">
            <div className="bg--white border-radius--15px padding--25">
                <h1>Transactions in block <Link to={`/block/${number}`}>{number}</Link>
                </h1>

                <TransactionsList number={number}/>
            </div>
        </div>
    </>);}

export default Transactions;