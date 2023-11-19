import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

/** Components */
import BlockList from './components/BlockList';
import BlockDetail from "./components/BlockDetail";
/** Styles */
import './App.css';

/**
 * TODO:
 * 
 * - when clicked on the block
 * - show more info about the block:
 * -- age (timestamp) 
 * -- transactions list
 * 
 *  * 
 * - when clicked on the transaction, show:
 * -- txn hash
 * -- block
 * -- age (timestamp comes only if transaction has been mined)
 * -- sender
 * -- recipient (EOA or contract?)
 * -- value
 *
 * - when clicked on an address (sender, recipient, miner, etc.)
 * -- show balance
 * -- take to profile on ethereum
 * 
 * - when clicked on the address of a contract, 
 * -- show balance
 * -- show deployer (clicking works the same as "when clicked on an address")
 * -- take to profile on ethereum
 * 
 * - STYLES

 */

function App() {

  return <Router>
    <header>
      <Link to="/">
        Block explorer
      </Link>
    </header>
    <main className="App">
      <Switch>
        <Route path="/" exact component={BlockList} />
        <Route path="/block/:number"  component={BlockDetail} />
      </Switch>
    </main>
  </Router>;
}

export default App;
