import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; 
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import UserInfo from './Components/User/UserInfo';
import UserList from './Components/User/UserList';
import UserRegister from './Components/User/UserRegister';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/user_info" element={<UserInfo/>} />
            <Route path="/user_register" element={<UserRegister/>} />
            <Route path="/user_list" element={<UserList/>} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;