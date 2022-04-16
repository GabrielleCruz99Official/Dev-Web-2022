import logo from './logo.svg';
import './App.css';
import { testcomp1 as T1, testcomp2 as T2 } from './components/testcomp1';
import { Click } from './components/Click';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Header here</h1>
        <Click />
      </header>
    </div>
  );
}

export default App;
