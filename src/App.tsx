import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/layout/Navbar";
import PrivateRoute from "@/routes/PrivateRoute";

import HomePage from "@/pages/HomePage";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

import NotFoundPage from "@/pages/NotFoundPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

import { clearT_M_E } from "@/store/slices/ticketSlice";
import { clearA_M_E } from "@/store/slices/authSlice";
import { AppDispatch, RootState } from "@/store";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { error: ticketError, message: ticketMessage } = useSelector(
    (state: RootState) => state.tickets
  );
  const { error: authError, message: authMessage } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const error = ticketError || authError;
    const message = ticketMessage || authMessage;

    if (error) toast.error(error);
    if (message) toast.success(message);

    return () => {
      dispatch(clearT_M_E());
      dispatch(clearA_M_E());
    };
  }, [ticketError, authError, ticketMessage, authMessage, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />
      <main className="py-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            {/* <Route path="/tickets/:id" element={<TicketDetail />} /> */}
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tickets" element={<AdminDashboard />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
