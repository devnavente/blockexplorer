import BlockList from '../components/BlockList';

function Home() {
    return (<>
        <div className="Home max-width--900 margin--auto padding--25">
            <div className="bg--white border-radius--15px padding--25">
                <h1>Latest blocks</h1>

                <BlockList />
            </div>
        </div>
    </>);
}

export default Home;