import { useParams } from 'react-router-dom';
import TransactionDetail from '../components/TransactionDetail';

function Transaction() {
    const { hash } = useParams();

    return (<>
        <div className="Transaction max-width--900 margin--auto padding--25">
            <div className="bg--white border-radius--15px padding--25">
                <h1>Transaction details</h1>

                <TransactionDetail hash={hash}/>
            </div>
        </div>
    </>);
}

export default Transaction;