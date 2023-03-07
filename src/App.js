import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUP from './Component/pages/SignUp';
import Login from './Component/pages/Login';
import Welcome from './Component/pages/Welcome';
import Header from './Component/Header/Header';
import Sentbox from './Component/pages/Sentbox';

function App() {
  return (
    
    <div>
      <Header/>
      <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path = '/signup' element= {<SignUP/>}/>
      <Route path = '/welcome' element = {<Welcome/>}/>
      <Route path='/sentbox' element = {<Sentbox/>} />
      
     </Routes>
    </div>
   
  );
}

export default App;
