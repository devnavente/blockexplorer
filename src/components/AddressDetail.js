import { useEffect, useState } from 'react';
import { getBalance, lookupAddress } from '../helpers/address-helpers'
import { hexToETH } from '../helpers/gas-helpers';

function AddressDetail({address}) {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const setData = async () => {    
            const balance = await getBalance(address);
            const balanceETH = hexToETH(balance['_hex']);

            const name = await lookupAddress(address);

            setDetails({balanceETH, name});
        };
        
        setData();
    }, [address])

    return (<>
        {!details ? 'loading' : 
            (<section className="AddressDetail">
                <dl>
                    <div>
                        <dt>ENS Name: </dt>
                        <dd>{details.name ? details.name : 'None'}</dd>
                    </div>
                    <div>
                        <dt>Address: </dt>
                        <dd className="breakline-anywhere">{address}</dd>
                    </div>
                    <div>
                        <dt>Balance: </dt>
                        <dd>{details.balanceETH} ETH</dd>
                    </div>
                </dl>
            </section>)
        }
    </>)
}

export default AddressDetail;