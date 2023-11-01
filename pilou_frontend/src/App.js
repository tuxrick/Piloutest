import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import UserInfo from './Components/UserInfo/UserInfo';
import UserRegister from './Components/UserRegister/UserRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user_info" element={<UserInfo/>} />
        <Route path="/user_register" element={<UserRegister/>} />
      </Routes>
    </Router>
  );
}

export default App;