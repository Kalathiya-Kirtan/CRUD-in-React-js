import logo from './logo.svg';
import './App.css';
import Main from './files/Main.js'
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Page from './files/Page.js';


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Main />}>
          </Route>
          <Route path='/page/:id' element={<Page />}>
          </Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
