function Home() {
    return (<>
        <div className="max-width--1200 margin--auto padding--25">
            <div className="bg--white border-radius--5px">
                <h1>Latest blocks</h1>

                <ul></ul>
            </div>
        </div>
    </>);
}

export default Home;

/**
 * TODO: Views / routes
 * 
 * # Home / block explorer: 
 * -- explorer (search)
 * -- last 10 blocks with info:
 * ---> block number
 * ---> block age
 * ---> miner
 * ---> number of transactions
 * ---> transactions time (how long between 1st and last)
 * ---> reward 
 * -------------------------------------------------------
 * 
 */