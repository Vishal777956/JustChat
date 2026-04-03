import React from "react";
import LandingPage from "./pages/Landing.jsx";
import Auth from "./pages/Auth.jsx";
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import VideoMeet from "./pages/VideoMeet.jsx";
import { io } from "socket.io-client";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";


function App() {
  
  return (
    <>
      <Router>

        <AuthProvider>

        <Routes>

          <Route path='/' element={< LandingPage />}></Route>
          <Route path='/auth' element={< Auth />}></Route>
          <Route path='/home' element={< Home />}></Route>
          {/* <Route path='/:url' element={< VideoMeet/>}></Route> */}
          <Route path='/room/:roomId' element={<VideoMeet />} />
          <Route path='/history' element={< History/>}></Route>

        </Routes>
        
        </AuthProvider>

      </Router>
    </>
  )
}

export default App;
