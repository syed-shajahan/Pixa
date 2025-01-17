import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import routes from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        aria-label="Notification Area"
      />

    </>
  );
}

export default App;
