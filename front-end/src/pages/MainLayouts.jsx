import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LoginPage from "./LoginPage";

export default function MainLayout({
  children,
  setMessage,
  setShowNotification,
  setShowDangerNotification,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("login");
    if (savedLogin) {
      setLogin(JSON.parse(savedLogin));
    }
  }, []);

  const handleLogin = (status) => {
    setLogin(status);
    localStorage.setItem("login", JSON.stringify(status));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {login ? (
        <>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Header
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setLogin={handleLogin}
            />
            <main>{children}</main>
          </div>
        </>
      ) : (
        <div className="flex align-middle justify-center w-full">
          <LoginPage
            setLogin={handleLogin}
            setMessage={setMessage}
            setShowNotification={setShowNotification}
            setShowDangerNotification={setShowDangerNotification}
          />
        </div>
      )}
    </div>
  );
}
