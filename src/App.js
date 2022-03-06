import { Home } from './pages/Home';
import Register from './pages/Register';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreatePlan from './components/CreatePlan';


function App() {
  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route path={"/about"} element={<Home/>}/>
      <Route path={"/"} element={<Register/>}/>
      <Route path={"/creaete-plan"} element={<CreatePlan/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
    
  );
}

export default App;
