import { useSelector } from "react-redux";
import { Link } from "react-router";
import { RootState } from "../store";
import { Tickets } from "lucide-react";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  return (
    <div className="max-h-screen bg-gray-50 flex  justify-center">
      <div className="bg-blue-600 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <Tickets className="h-14 w-14 text-white mx-auto" />{" "}
            {/* Centered icon */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              RB Ticket Management System
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Manage your ticket easily with the system.
            </p>
            <div className="mt-8">
              {isAuthenticated ? (
                <Link
                  to={userRole === "admin" ? "/admin/dashboard" : "/dashboard"}
                  className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-block bg-transparent text-white border-2 border-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
