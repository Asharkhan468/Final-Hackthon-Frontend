import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/reducer/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://final-hackthon-backend-teal.vercel.app/api/auth/login",
        data,
        { withCredentials: true }
      );

      reset();

      if (response.data && response.data.accessToken) {
        const { accessToken, user } = response.data;

        dispatch(setUser({ userId: user.id, accessToken }));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", user.id);

        setModalMessage("Successfully logged in!");
        setModalType("success");
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigate("/Dashboard");
        }, 2000);
      } else {
        setModalMessage("Access token not returned. Please try again.");
        setModalType("error");
        setShowModal(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Network error. Please try again.";
      setModalMessage(errorMessage);
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg transition-transform transform ${
              modalType === "success" ? "border-green-500" : "border-red-500"
            } border-t-4`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                modalType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {modalType === "success" ? "Success" : "Error"}
            </h2>
            <p className="text-gray-700 mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 hover:shadow-2xl transition duration-500 border border-3"
        onSubmit={handleSubmit(login)}
      >
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Welcome Back!
        </h1>

        <div className="relative mb-6">
          <input
            className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition ease-in-out duration-300 text-lg"
            {...register("cnic", { required: "CNIC is required" })}
            type="text"
            placeholder="Enter your CNIC"
            maxLength="15"
          />
          {errors.cnic && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              {errors.cnic.message}
            </p>
          )}
        </div>

        <div className="relative mb-6">
          <input
            className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition ease-in-out duration-300 text-lg"
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 ml-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Forgot password?
          </a>
        </div>

        {loading ? (
          <button
            className="w-full py-3 rounded-lg bg-blue-500 text-lg text-white font-semibold shadow-md transition-all duration-300"
            type="submit"
          >
            Authenticating...
          </button>
        ) : (
          <button
            className="btn bg-gradient-to-r from-blue-500 to-teal-400 w-full text-lg text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            type="submit"
          >
            LOGIN
          </button>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
