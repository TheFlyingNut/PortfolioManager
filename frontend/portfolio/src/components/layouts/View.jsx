import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const View = () => {
  return (
    <>
      <section className="h-full">
        <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default View;
