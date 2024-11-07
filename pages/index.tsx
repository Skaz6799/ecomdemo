import React from "react";
import Navbar from "./component/Navbar";
import Products from "./component/Products";


const HomePage = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <Products />
    </div>
  );
}

export default HomePage;