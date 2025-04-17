import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Principal from './pages/Principal'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </Router>
  )
}

export default App
