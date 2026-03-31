import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ImPower } from "react-icons/im";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // input handle
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const userData = {
      email: form.email,
      name: form.email.split("@")[0],
    };

    login(userData); // context wala login
    navigate("/feed"); // redirect
  };

  return (
    <div className="flex justify-between">
      <div className="hidden lg:block flex-1 relative  bg-indigo-800">
        <div className=" absolute inset-0 opacity-100 bg-indigo-400/50">
          <div className="absolute w-64 top-1/4 left-1/4 h-64 rounded-full blur-3xl bg-indigo-300/50"></div>
          <div className="absolute w-90 top-1/3 left-1/3 h-90 rounded-full blur-3xl bg-indigo-300/50"></div>
        </div>
        <div className="relative z-10 flex flex-col gap-8 px-20 justify-center h-full text-white">
          <div className="flex gap-3 ">
            <div className="flex items-center gap-5">
              <div className="h-15 w-15 flex items-center justify-center bg-white/20 backdrop-blur-md text-3xl rounded-2xl">
                <ImPower />
              </div>
              <h2 className="font-bold text-4xl">Pulse</h2>
            </div>
          </div>
          <div className="text-2xl">
            <p>
              Where ideas spark conversations. Join a community of thinkers,
              builders, and creators.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center h-screen ">
        <form
          onSubmit={handleSubmit}
          className=" p-6 rounded-xl  w-120 h-120 flex flex-col gap-2 "
        >
          <div className="flex flex-col mb-4">
            <h2 className="text-3xl font-bold  ">Welcome back</h2>
            <h2 className="text-gray-400 text-lg">
              Sign in to continue to Pulse
            </h2>
          </div>
          <h2>Email</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border outline-none border-gray-300 h-13 rounded-xl"
          />
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 h-13 border outline-none border-gray-300 rounded-xl"
          />

          <button
            type="submit"
            className="w-full h-13 cursor-pointer bg-indigo-500 text-white font-semibold text-lg py-2 rounded-xl  hover:bg-indigo-400 hover:text-white"
          >
            Login
          </button>
          <div className="flex items-center justify-center mt-5 text-lg ">
            <p>
              <span className="text-gray-400 mx-1">Don't have an account?</span>
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-semibold text-indigo-600 cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
