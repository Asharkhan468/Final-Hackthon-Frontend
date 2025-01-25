import axios from "axios";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submissions = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await axios.post(
        "https://final-hackthon-backend-teal.vercel.app/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("User registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response) {
        console.error("API response error:", error.response.data);
      } else if (error.request) {
        console.error("Network error: No response received", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
     <div className="flex justify-center items-center min-h-screen p-6">
    <form
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6 border border-gray-200 max-h-screen"
      onSubmit={handleSubmit(submissions)}
    >
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-wide animate__animated animate__zoomIn">
        Create an Account
      </h1>

      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="name">
          Username
        </label>
        <input
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          {...register("name", { required: "Name is required" })}
          type="text"
          id="name"
          placeholder="Enter your username"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          {...register("email", { required: "Email is required" })}
          type="email"
          id="email"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          {...register("password", { required: "Password is required" })}
          type="password"
          id="password"
          placeholder="Create your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-lg text-white font-semibold shadow-lg hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl focus:outline-none"
        type="submit"
      >
        Register Now
      </button>

      {/* Terms and Conditions */}
      <p className="text-center text-sm text-gray-600 mt-6">
        By registering, you agree to our{" "}
        <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
          Terms & Conditions
        </a> and{" "}
        <a href="#" className="text-blue-500 hover:text-blue-700 font-semibold">
          Privacy Policy
        </a>.
      </p>
    </form>
  </div>

    </>
  );
};

export default Register;
