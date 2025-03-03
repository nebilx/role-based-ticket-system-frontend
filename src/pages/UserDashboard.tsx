import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTickets } from "@/store/thunk/ticketThunk";
import { AppDispatch, RootState } from "@/store/index";
import TicketList from "../components/tickets/TicketList";
import TicketForm from "../components/tickets/TicketForm";
import { Plus, X } from "lucide-react";

const UserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showTicketForm, setShowTicketForm] = useState(false);

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  const toggleTicketForm = () => {
    setShowTicketForm((prev) => !prev);
  };

  const handleTicketCreated = () => {
    setShowTicketForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-600 mt-1">Manage your tickets</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Your Tickets</h2>
        <button
          onClick={toggleTicketForm}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {showTicketForm ? (
            <>
              <X className="h-5 w-5 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-5 w-5 mr-2" />
              New Ticket
            </>
          )}
        </button>
      </div>

      {showTicketForm && (
        <div className="mb-8">
          <TicketForm onSuccess={handleTicketCreated} />
        </div>
      )}

      <TicketList />
    </div>
  );
};

export default UserDashboard;
