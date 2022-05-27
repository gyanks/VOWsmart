import { BrowserRouter } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom'

import ReadXlsSbom from './component/ReadXlsSbom';
import ResponsiveAppBar from './component/ui/ResponsiveAppBar';
import SignInSide from './component/ui/SignInSide';
import ViewDashboard from './component/projects/ProjectDashboard';
import ComponentCvesScan from './component/scan/ComponentCvesScan';
import DisplayScanResults from './component/scan/DisplayScanResults';
//import ReadXlsSbom from './component/ReadXlsSbom'
import RegisterUser from './component/ui/user/RegisterUser';
import AdminHomePage from './component/admin/AdminHomePage';
import SmartScan from './smart/SmartScan';
import AssignProject from './component/admin/AssignProject';
import AddProject from './component/admin/AddProject';
import './App.css';




function App() {
  const navigate = useNavigate();
  // const history =useNavigate();
  return (

    <div className="App">
      <Routes>
        <Route path="/login" element={<SignInSide />}> </Route>
        <Route path="/home" element={<ResponsiveAppBar />}></Route>
        <Route path="/home/project/dashboard" element={<ViewDashboard />}></Route>
        <Route path="/home/project/scan" element={<ComponentCvesScan />}></Route>
        <Route path="/home/project/scan/smart" element={<SmartScan />}></Route>
        <Route path="/home/project/scan/results" element={<DisplayScanResults />}></Route>
        <Route path="/home/project/sbom" element={<ReadXlsSbom />}></Route>
        <Route path="/home/project/sbom/:project" element={<ReadXlsSbom />}></Route>
        <Route path="/home/user/registration" element={<RegisterUser />}></Route>
        <Route path="/home/admin" element={<AdminHomePage />}></Route>
        <Route path="/home/admin/assign" element={<AssignProject />}></Route>
        <Route path="/home/admin/project/add" element={<AddProject />}></Route>

      </Routes>


    </div>


  );

}


export default App;
