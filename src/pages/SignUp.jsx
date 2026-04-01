import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ImPower } from "react-icons/im";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    displayname: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (!form.displayname || !form.username || !form.password) {
      alert("Please fill all");
      return;
    }

    const userData = {
      displayname: form.displayname,
    };
    login(userData);
    navigate("/feed");
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
          onSubmit={handleCreateAccount}
          className=" p-6 rounded-xl  lg:w-120 w-80  h-120 flex flex-col gap-2 transition-all duration-300 "
        >
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2 mb-3 lg:hidden">
              <div className="h-10 w-10 flex items-center justify-center bg-violet-200/50 backdrop-blur-md text-xl rounded-xl">
                <ImPower />
              </div>
              <h2 className="font-bold text-2xl">Pulse</h2>
            </div>
            <h2 className="lg:text-3xl font-bold text-xl  ">
              Create your account
            </h2>
            <h2 className="text-gray-400 lg:text-lg text-baselg:">
              Join the conversation today
            </h2>
          </div>
          <h2>Display name</h2>
          <input
            type="name"
            name="displayname"
            placeholder="Enter name"
            value={form.displayname}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 outline-none lg:h-13 h-10 rounded-xl"
          />
          <h2>Handle</h2>
          <input
            type="name"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 outline-none lg:h-13 h-10 rounded-xl"
          />
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 lg:h-13 h-10 border border-gray-300 outline-none rounded-xl"
          />

          <button
            type="submit"
            className="w-full cursor-pointer lg:h-13 h-10 bg-indigo-500 text-white font-semibold text-lg py-2 rounded-xl hover:bg-indigo-400 hover:text-white"
          >
            Create account
          </button>
          <div className="flex items-center justify-center mt-5">
            <p>
              Already have an account ?
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-indigo-600 cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
