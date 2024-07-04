import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./css/style.css";

import "./charts/ChartjsConfig";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/2",
      element: <div className="font-bold">Hello world!2</div>,
    },
  ]);

  return (
    <div className="App flex flex-row">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
