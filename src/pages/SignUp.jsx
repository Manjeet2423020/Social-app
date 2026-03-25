import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      <div className="flex-1 relative  bg-sky-600">
        <div className=" absolute inset-0 opacity-100 bg-sky-600">
          <div className="absolute w-64 top-1/4 left-1/4 h-64 rounded-full blur-3xl bg-sky-300/50"></div>
          <div className="absolute w-90 top-1/3 left-1/3 h-90 rounded-full blur-3xl bg-sky-300/50"></div>
        </div>
        <div className="relative z-10 flex flex-col gap-8 px-20 justify-center h-full text-white">
          <div className="flex gap-3 ">
            <h1>logo</h1>
            <h2>pulse</h2>
          </div>
          <div className="dvi">
            <p>
              Where ideas spark conversations. Join a community of thinkers,
              builders, and creators.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center h-screen bg-sky-100">
        <form
          onSubmit={handleCreateAccount}
          className="bg-sky-200/50 p-6 rounded-xl shadow-md w-120 h-120 flex flex-col gap-2 "
        >
          <div className="flex flex-col mb-4">
            <h2 className="text-2xl font-bold  ">Create your account</h2>
            <h2>Join the conversation today</h2>
          </div>
          <h2>Display name</h2>
          <input
            type="name"
            name="displayname"
            placeholder="Enter name"
            value={form.displayname}
            onChange={handleChange}
            className="w-full mb-3 p-2 border h-13 rounded-xl"
          />
          <h2>handle</h2>
          <input
            type="name"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border h-13 rounded-xl"
          />
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-4 p-2 h-13 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full h-13 bg-sky-400/50 text-black py-2 rounded-xl hover:bg-sky-600 hover:text-white"
          >
            Create account
          </button>
          <div className="flex items-center justify-center mt-5">
            <p>
              Already have an account ?
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-sky-600"
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
