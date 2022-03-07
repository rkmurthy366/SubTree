import { Home } from './pages/Home';
import Register from './pages/Register';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreatePlan from './pages/CreatePlan';
import CreateSpecialPlan from './components/CreateSpecialPlan';
import GetPlanDetails from './components/GetPlanDetails';
import BuyPlan from './pages/BuyPlan';

function App() {
  return (
    <>
    <BrowserRouter>

    <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/buy-plans"} element={<BuyPlan/>}/>
      <Route path={"/create-plan"} element={<CreatePlan/>}/>
      <Route path={"/create-special-plan"} element={<CreateSpecialPlan/>}/>
      <Route path={"/get-plan-details"} element={<GetPlanDetails/>}/>
    </Routes>
    
    </BrowserRouter>
    </>
    
  );
}

export default App;
