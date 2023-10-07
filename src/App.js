import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./layouts/nav/Header";
import Footer from "./layouts/Footer";
import SignIn from './pages/SignIn';
import ComponentsRoutes from "./layouts/ComponentsRoutes";

const App = () => {
  const selectIsAuthenticated = (state) => state.authReducer.isAuthenticated;
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
   
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
     
    }
  }, []);
  return (
    <div>
       {isAuthenticated ? (
      <>
      <Header />
      <div className="content-wrapper">
        <ComponentsRoutes />
      </div>
      <Footer />
      </>
       ) : (
        
        <SignIn />
      )}
    </div>
  );
};

export default App;