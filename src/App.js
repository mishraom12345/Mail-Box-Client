import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUP from './Component/pages/SignUp';
import Login from './Component/pages/Login';
import Welcome from './Component/pages/Welcome';

function App() {
  return (
    
    <div>
      <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path = '/signup' element= {<SignUP/>}/>
      <Route path = '/welcome' element = {<Welcome/>}/>
      
     </Routes>
    </div>
   
  );
}

export default App;
