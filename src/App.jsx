import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./scenes/Navbar";
import Homepage from "./scenes/Homepage";
function App() {
 
return(
<div className="app">
      <BrowserRouter>
       
          <Routes>
            <Route path="/" element={<Homepage />} />
            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;