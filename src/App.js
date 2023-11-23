import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
/** Pages */
import Home from './pages/Home';
import Block from './pages/Block';
import Transactions from './pages/Transactions';
import Transaction from './pages/Transaction';
import Address from './pages/Address';
/** Styles */
import './App.css';

/**
 * TODO: Components
 * 
 * - SearchBlock
 * - BlockList
 * - BlockSummary
 * - BlockDetails
 * - TransactionsTable (by address / by block)
 * - TransactionDetails
 * - AddressDetails
 * 
 * NOTES:
 * - typing on search input changes form's action=
 */

function App() {

  return (
    <Router>
      <Header />
      <main className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/block/:number"  component={Block} />
          <Route path="/txs?block=:number"  component={Transactions} />
          <Route path="/tx/:hash"  component={Transaction} />
          <Route path="/address/:address"  component={Address} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
