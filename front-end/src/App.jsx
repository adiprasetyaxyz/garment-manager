import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./css/style.css";

import "./charts/ChartjsConfig";
import ProductStock from "./pages/ProductStock";
import MainLayout from "./pages/MainLayouts";
import ProductSold from "./pages/ProductSold";
import FabricStock from "./pages/FabricStock";
import Finance from "./pages/Finance";
import MakeReport from "./pages/MakeReport";
import { useEffect, useState } from "react";
import Succes from "./components/notification/succes";
import Danger from "./components/notification/Danger";

function App() {
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Hide the notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showNotification]);
  const [showDangerNotification, setShowDangerNotification] = useState(false);
  useEffect(() => {
    if (showDangerNotification) {
      const timer = setTimeout(() => {
        setShowDangerNotification(false);
      }, 3000); // Hide the notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showDangerNotification]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      ),
    },
    {
      path: "/products",
      element: (
        <MainLayout>
          <ProductStock
            setMessage={setMessage}
            setShowNotification={setShowNotification}
            setShowDangerNotification={setShowDangerNotification}
          />
        </MainLayout>
      ),
    },
    {
      path: "/products/sold",
      element: (
        <MainLayout>
          <ProductSold />
        </MainLayout>
      ),
    },
    {
      path: "/material/fabric-stock",
      element: (
        <MainLayout>
          <FabricStock
            setMessage={setMessage}
            setShowNotification={setShowNotification}
            setShowDangerNotification={setShowDangerNotification}
          />
        </MainLayout>
      ),
    },
    {
      path: "/finance/report",
      element: (
        <MainLayout>
          <Finance
            setMessage={setMessage}
            setShowNotification={setShowNotification}
            setShowDangerNotification={setShowDangerNotification}
          />
        </MainLayout>
      ),
    },
    {
      path: "/finance/make-report",
      element: (
        <MainLayout>
          <MakeReport
            setMessage={setMessage}
            setShowNotification={setShowNotification}
            setShowDangerNotification={setShowDangerNotification}
          />
        </MainLayout>
      ),
    },
  ]);

  return (
    <div className="App  bg-[#EDEDED] dark:bg-[#202532]">
      {showNotification && (
        <div className="absolute top-20 right-7 z-50 animate-slide-in">
          <Succes message={message} />
        </div>
      )}
      {showDangerNotification && (
        <div className="absolute top-20 right-7 z-50 animate-slide-in">
          <Danger message={message} />
        </div>
      )}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
