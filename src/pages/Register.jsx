// import axios from "axios";
// import { useForm } from "react-hook-form";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const submissions = async (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("password", data.password);

//     try {
//       const response = await axios.post(
//         "https://final-hackthon-frontend.vercel.app/api/user/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("User registered successfully:", response.data);
//     } catch (error) {
//       console.error("Error registering user:", error);
//       if (error.response) {
//         console.error("API response error:", error.response.data);
//       } else if (error.request) {
//         console.error("Network error: No response received", error.request);
//       } else {
//         console.error("Error:", error.message);
//       }
//     }
//   };

//   return (
//     <>
//      <div className="flex justify-center items-center min-h-screen p-6">
//     <form
//       className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6 border border-gray-200 max-h-screen"
//       onSubmit={handleSubmit(submissions)}
//     >
//       <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-wide animate__animated animate__zoomIn">
//         Create an Account
//       </h1>

//       {/* Name Input */}
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700" htmlFor="name">
//           Username
//         </label>
//         <input
//           className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//           {...register("name", { required: "Name is required" })}
//           type="text"
//           id="name"
//           placeholder="Enter your username"
//         />
//         {errors.name && (
//           <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//         )}
//       </div>

//       {/* Email Input */}
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700" htmlFor="email">
//           Email
//         </label>
//         <input
//           className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//           {...register("email", { required: "Email is required" })}
//           type="email"
//           id="email"
//           placeholder="Enter your email"
//         />
//         {errors.email && (
//           <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//         )}
//       </div>

//       {/* Password Input */}
//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700" htmlFor="password">
//           Password
//         </label>
//         <input
//           className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
//           {...register("password", { required: "Password is required" })}
//           type="password"
//           id="password"
//           placeholder="Create your password"
//         />
//         {errors.password && (
//           <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-lg text-white font-semibold shadow-lg hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl focus:outline-none"
//         type="submit"
//       >
//         Register Now
//       </button>

//       {/* Terms and Conditions */}
//       <p className="text-center text-sm text-gray-600 mt-6">
//         By registering, you agree to our{" "}
//         <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
//           Terms & Conditions
//         </a> and{" "}
//         <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
//           Privacy Policy
//         </a>.
//       </p>
//     </form>
//   </div>

//     </>
//   );
// };

// export default Register;







import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnic: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://final-hackthon-backend-teal.vercel.app/api/register', formData);
      setSuccess(response.data.message);
      console.log('User Data:', formData);
      setFormData({ name: '', email: '', cnic: '', role: 'user' });
      setShowModal(true); // Show the success modal
    } catch (err) {
      setError(err.response.data.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 pt-16 mb-[20px]">
      {/* Main content area */}
      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-1/2 lg:w-1/3 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-3xl  text-center text-gray-800 mb-6 font-bold">Create an Account</h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 placeholder-gray-400"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="youremail@example.com"
                required
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 placeholder-gray-400"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC</label>
              <input
                type="text"
                id="cnic"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="12345-6789012-3"
                required
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 placeholder-gray-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-5 py-3 text-white bg-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ${loading && 'opacity-50'}`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all duration-300">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96 transform transition-all duration-300">
            <h3 className="text-2xl font-semibold text-teal-600 text-center">Registration Successful!</h3>
            <p className="text-center mt-4 text-gray-700">Welcome aboard! Your registration was successful.</p>
            <div className="flex justify-center mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-white bg-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
