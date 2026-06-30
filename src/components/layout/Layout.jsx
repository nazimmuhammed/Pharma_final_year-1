import { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {

  // SHARED SIDEBAR STATE
  const [collapsed, setCollapsed] =
    useState(false);

  return (

    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #050c1a 0%, #060f1f 60%, #07111f 100%)",

        color: "#fff",

        fontFamily:
          "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >

      {/* NAVBAR */}
      <Navbar collapsed={collapsed} />



      {/* BODY */}
      <div className="flex flex-1 pt-16">

        {/* SIDEBAR */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />



        {/* MAIN CONTENT */}
        <main
          className={`
                    flex-1
                    min-w-0
                    overflow-x-hidden
                    transition-all
                    duration-300

                    ${
                      collapsed
                        ? "lg:ml-[72px]"
                        : "lg:ml-[270px]"
                    }
                  `}
        >
          {children}
        </main>

      </div>



      {/* FOOTER */}
      <Footer />

    </div>
  );
}