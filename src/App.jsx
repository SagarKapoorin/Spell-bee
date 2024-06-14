import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./scenes/Navbar";
import Homepage from "./scenes/Homepage";
function App() {
 
return(
<div className="app">
      <BrowserRouter>
       
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/Faq"
              element={isAuth ? <FAQ /> : <Navigate to="/" />}
            />
             <Route
              path="/Contact"
              element={isAuth ? <Contact /> : <Navigate to="/" />}
            /> */}
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;