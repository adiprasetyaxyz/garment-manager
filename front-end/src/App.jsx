import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarComponent from "./components/Sidebar";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className="font-bold">Hello world!</div>,
    },
    {
      path: "/2",
      element: <div className="font-bold">Hello world!2</div>,
    },
  ]);
  return (
    <div className="App flex flex-row">
      <SidebarComponent />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
