import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUP from './Component/pages/SignUp';
import Login from './Component/pages/Login';
import Welcome from './Component/pages/Welcome';
//import Header from './Component/Header/Header';
import Sentbox from './Component/pages/Sentbox';
import Inbox from './Component/pages/Inbox';

function App() {
  return (
    
    <div style={{backgroundColor:'lightgreen'}}>
      
      <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path = '/signup' element= {<SignUP/>}/>
      <Route path = '/welcome' element = {<Welcome/>}/>
      <Route path='/sentbox' element = {<Sentbox/>} />
      <Route path = '/inbox' element = {<Inbox/>}/>
      
     </Routes>
    </div>
   
  );
}

export default App;
