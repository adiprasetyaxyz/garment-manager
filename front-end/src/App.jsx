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

function App() {
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
          <ProductStock />
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
          <FabricStock />
        </MainLayout>
      ),
    },
    {
      path: "/finance/report",
      element: (
        <MainLayout>
          <Finance />
        </MainLayout>
      ),
    },
    {
      path: "/finance/make-report",
      element: (
        <MainLayout>
          <MakeReport />
        </MainLayout>
      ),
    },
  ]);

  return (
    <div className="App  bg-[#EDEDED] dark:bg-[#202532]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
