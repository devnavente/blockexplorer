import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLatestBlockNumber } from '../helpers/block-helpers';
import BlockDetail from '../components/BlockDetail';

function Block() {
    const { number } = useParams();
    const [prev, setPrev] = useState();
    const [next, setNext] = useState();

    useEffect(() => {
        const setData = async () => {
            let int = parseInt(number);

            if (int > 0) {
                setPrev(int - 1);
            } else {
                setPrev(null);
            }

            const latest = await getLatestBlockNumber();

            if (int < latest) {
                setNext(int + 1);
            } else {
                setNext(null);
            }
        }

        setData();
    }, [number])

    return (<>
        <div className="Home max-width--900 margin--auto padding--25">
            <div className="bg--white border-radius--15px padding--25">
                <h1>{number}</h1>

                <BlockDetail number={number}/>

                <div className="nextprev-wrapper">
                    {prev !== null && <Link to={`/block/${prev}`} className="cta">👈 {prev}</Link>}
                    {next && <Link to={`/block/${next}`} className="cta">{next} 👉</Link>}                                        
                </div>
            </div>
        </div>
    </>);
}

export default Block;