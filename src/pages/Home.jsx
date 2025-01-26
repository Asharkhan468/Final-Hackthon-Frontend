import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const loanOptions = {
    "Wedding Loan": ["Valima", "Furniture", "Valima Food", "Jahez"],
    "Home Construction Loan": ["Structure", "Finishing"],
    "Business Startup Loan": [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    "Education Loan": ["University Fees", "Child Fees Loan"],
  };
  const navigate = useNavigate();

  const [loanType, setLoanType] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [modal, setModal] = useState({ show: false, type: "", message: "" });

  const handleModalClose = () => {
    setModal({ show: false, type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://final-hackthon-backend-teal.vercel.app/api/loans/loanApplication",
        {
          loanType,
          subcategory,
          amount,
          duration,
        }
      );
      console.log(response.data); // Log success response
      setModal({
        show: true,
        type: "success",
        message: "Loan application submitted successfully!",
      });
      setTimeout(() => navigate("/Register"), 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error("Error applying for loan:", error.response?.data || error); // Log error
      setModal({
        show: true,
        type: "error",
        message: "Failed to submit the loan application. Please try again.",
      });
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto mt-16 bg-white shadow-lg rounded-lg h-[40rem]">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Apply for a Loan
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Loan Type
          </label>
          <select
            value={loanType}
            onChange={(e) => {
              setLoanType(e.target.value);
              setSubcategory("");
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select Loan Type
            </option>
            {Object.keys(loanOptions).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {loanType && (
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-700">
              Subcategory
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Subcategory
              </option>
              {loanOptions[loanType].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Amount (PKR)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter loan amount"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">
            Duration (Years)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter duration in years"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Submit Loan Application
        </button>
      </form>

      {/* Modal */}
      {modal.show && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
            modal.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2
              className={`text-xl font-bold ${
                modal.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {modal.type === "success" ? "Success" : "Error"}
            </h2>
            <p className="mt-4">{modal.message}</p>
            <button
              onClick={handleModalClose}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
