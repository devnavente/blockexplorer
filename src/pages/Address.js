import { useParams } from 'react-router-dom';
import AddressDetail from '../components/AddressDetail';

function Address() {
    const { address } = useParams();

    return (<>
        <div className="Address max-width--900 margin--auto padding--25">
            <div className="bg--white border-radius--15px padding--25">
                <h1>Address details</h1>

                <AddressDetail address={address}/>
            </div>
        </div>
    </>);
}

export default Address;