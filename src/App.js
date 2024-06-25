import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Task from './components/Task';
import View from './components/View';
import './App.css'


function App() {
  return (
    <Router>
    {/* <Pre load={load} /> */}
    {/* <ScrollToTop/> */}
    {/* <NavBar/> */}
   {/* <div className="App" id={load ? "no-scroll" : "scroll"}> */}
     <Routes>
       <Route path="/" element={<Task />} />
       <Route path="/view/:index" element={<View />} />

     
     </Routes>
    
   {/* </div> */}
 </Router>
  );
}

export default App;
