import React from "react";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Authentication />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Route>
  )
);

const App = () => {
  return (
    <>
      <div className="content !p-5 text-white !font-rale">
        {/* Your component content goes here */}

        
        <RouterProvider router={router} />
      </div>

      <style>
        {`
          .content {
            position: relative;
            height: 100vh;
          }

          .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
            background-image: url('https://thumbs.gfycat.com/DearestCautiousGordonsetter-size_restricted.gif');
            background-repeat: no-repeat;
            background-size: cover;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8); /* Adjust the opacity as needed */
          }
        `}
      </style>

      <div className="background">
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default App;
