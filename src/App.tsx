import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import League from "./pages/League";
import './App.css'

function App() {

  return (
   
    <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="home" />}  />
          <Route path="home" element={<Home />} />
          <Route path="league/:id" element={<League />} />
        </Routes>
    </BrowserRouter>
 
      
 
  )
}

export default App
