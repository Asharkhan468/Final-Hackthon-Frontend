import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const loanOptions = {
    "Wedding Loan": ["Valima", "Furniture", "Valima Food", "Jahez"],
    "Home Construction Loan": ["Structure", "Finishing"],
    "Business Startup Loan": ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    "Education Loan": ["University Fees", "Child Fees Loan"],
  };
  const navigate = useNavigate()

  const [loanType, setLoanType] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");

  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("https://boiler-plate-mu.vercel.app/api/loan/loan", {
  //       loanType,
  //       subcategory,
  //       amount,
  //       duration,
  //     });
  //     console.log(response);
  //     alert("Loan application submitted successfully!");
  //     navigate("/Register")

  //   } catch (error) {
  //     console.error("Error applying for loan:", error);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/loan/loan", {
        loanType,
        subcategory,
        amount,
        duration,
      });
      console.log(response);
      alert("Loan application submitted successfully!");
      navigate("/Register");
    } catch (error) {
      console.error("Error applying for loan:", error);
      alert("Failed to submit the loan application. Please try again.");
    }
  };
  

  return (
    <div className="p-8 max-w-lg mx-auto mt-16 bg-white shadow-lg rounded-lg h-[40rem]">
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Apply for a Loan</h1>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block mb-2 text-lg font-semibold text-gray-700">Loan Type</label>
      <select
        value={loanType}
        onChange={(e) => {
          setLoanType(e.target.value);
          setSubcategory(""); 
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>Select Loan Type</option>
        {Object.keys(loanOptions).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>

    {loanType && (
      <div>
        <label className="block mb-2 text-lg font-semibold text-gray-700">Subcategory</label>
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Select Subcategory</option>
          {loanOptions[loanType].map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>
    )}

    <div>
      <label className="block mb-2 text-lg font-semibold text-gray-700">Amount (PKR)</label>
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
      <label className="block mb-2 text-lg font-semibold text-gray-700">Duration (Years)</label>
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
</div>

  );
};

export default Home;