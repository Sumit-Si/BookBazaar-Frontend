import {
  createBrowserRouter,
  Navigate,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Login from "../pages/auth/Login.jsx";
import ErrorPage from "../pages/error/ErrorPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import Profile from "../pages/Profile.jsx";
import Setting from "../pages/Setting.jsx";
import BooksPage from "../pages/books/BooksPage.jsx";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <BooksPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

export default AppRouter;
