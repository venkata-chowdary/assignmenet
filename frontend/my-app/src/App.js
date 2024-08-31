import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import './index.css'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Profile from './components/Profile'
function App() {

  return (
    <UserProvider>
      <div className='app bg-gray-900 h-screen'>
        <Router>
          <Routes>
            <Route path='/' element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} exact/>
              <Route path="/profile" element={<Profile/>} exact/>
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>

  )
}

export default App