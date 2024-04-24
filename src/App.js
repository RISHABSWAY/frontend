import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Chats from './Pages/Chats';
import Admin from './Pages/Admin';
import {ChatState} from './Context/chatProvider.js';
import AdminUsers from './Admin/AdminUsers.jsx';
import AdminChats from './Admin/AdminChats.jsx';
import AdminMessages from './Admin/AdminMessages.jsx';

function AdminRoute({ element }) {
  const { user } = ChatState();

  // Check if user is authenticated and is an admin
  const isAdmin = user && user.isAdmin;

  if (!isAdmin) {
    // If user is not authenticated as an admin, redirect to login or home page
    return <Navigate to="/" />;
  }

  return element;
}
function App() {
  return (
    <>
    <div className='App'>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chats />} />
        <Route path='/admin' element={<AdminRoute element={<Admin />} />}>
          <Route path='users' element={<AdminUsers />} />
          <Route path='chats' element={<AdminChats />} />
          <Route path='messages' element={<AdminMessages />} />
        </Route>
      </Routes>
    
    </div>
    </>
  );
}

export default App;
