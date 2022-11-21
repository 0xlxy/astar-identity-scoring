import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Leaderboard from './components/Leaderboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path='/leaderboard' element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
