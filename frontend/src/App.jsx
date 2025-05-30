import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import MyBlogList from "./pages/MyBlogList";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/blogs"
            element={
              <PrivateRoute>
                <MyBlogList />
              </PrivateRoute>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/blogs/new"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/:id/edit"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          />

          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
