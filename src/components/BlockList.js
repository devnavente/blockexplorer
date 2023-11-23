import { useEffect, useState } from 'react';
import { getLatestBlockNumber, getLastTenBlocksData } from '../helpers/block-helpers';
import { Link } from "react-router-dom";

function BlockList() {

    const [blocksData, setBlocksData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let latest = await getLatestBlockNumber();
            setBlocksData(await getLastTenBlocksData(latest));
        }

        getData();
      
    }, []);

    return (<>
        {blocksData.length === 0 ? 'loading' : 
            (<table>
                <thead>
                    <tr>
                        <th>Block</th>
                        <th>Mined by</th>
                        <th>Age</th>
                        <th>Txn</th>
                        <th>Gas used</th>
                    </tr>
                </thead>
                <tbody>
                    {blocksData.map((block) => (
                        <tr key={block.number}>
                            <td>
                                <Link to={`/block/${block.number}`}>
                                    {block.number}
                                </Link>
                            </td>
                            <td>{block.miner}</td>
                            <td>{block.age}</td>
                            <td>{block.height}</td>
                            <td>{block.intGasUsed} ({block.gasUsedPercentage} %)</td>
                        </tr>
                    ))}
                </tbody>

            </table>)
        }
    </>)
}

export default BlockList;