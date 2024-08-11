
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './views/Home'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
      </Routes>
    </Router>
  )
}

export default App