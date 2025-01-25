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
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      setSuccess(response.data.message);
      setFormData({ name: '', email: '', cnic: '', role: 'user' });
    } catch (err) {
      setError(err.response.data.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Register</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC</label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading && 'opacity-50'}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;









