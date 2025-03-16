
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Clients from "@/pages/Clients";
import Cases from "@/pages/Cases";
import Documents from "@/pages/Documents";
import Calendar from "@/pages/Calendar";
import Finance from "@/pages/Finance";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "clients", element: <Clients /> },
      { path: "cases", element: <Cases /> },
      { path: "documents", element: <Documents /> },
      { path: "calendar", element: <Calendar /> },
      { path: "finance", element: <Finance /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
