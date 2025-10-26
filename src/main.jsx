import { createRoot } from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider.jsx";
import AppRouter from "./routes/routes.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster />
    <RouterProvider router={AppRouter} />
  </AuthProvider>
);
