import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUP from './Component/pages/SignUp';

function App() {
  return (
    
    <div>
      <Routes>
      <Route path = '/' element= {<SignUP/>}/>
     </Routes>
    </div>
   
  );
}

export default App;
