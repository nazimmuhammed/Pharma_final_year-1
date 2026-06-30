import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/Homepage'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import DrugRegistration from './Pages/DrugRegistration'
import Profile from './Pages/Profile'
import HowItWorks from './Pages/HowItWorks'


function App() {
  return(
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path='/drug-registration' element={<DrugRegistration/>}/>
      <Route path='/profile' element={<Profile/>}/>



      <Route path='/how-it-works' element={<HowItWorks/>}/>

    </Routes>
    </>
  )
}

export default App
