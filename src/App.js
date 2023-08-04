import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar/SearchBar';
import SecondSearchBAr from './SearchBar/SecondSearchBAr';


function App() {
  return (
    <div className="App container">
      <h1 style={{fontWeight:"bold",textDecoration:"underLine"}}>Employees Data</h1>
      <div className='row'>
        <div className='col-md-6'>
          <SearchBar></SearchBar>
        </div>
          <div className='col-md-6'>
          <SecondSearchBAr></SecondSearchBAr>
          </div>
        </div>
    </div>
  );
}

export default App;
