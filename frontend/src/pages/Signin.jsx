import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/Inputbox";

const Signin = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/user/signin", formInputs)
      .then(function (response) {
        const token = response.data.token;
        if (token) {
          sessionStorage.setItem("token", token);
          return navigate("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="max-w-sm m-auto mt-20 p-10 flex flex-col  gap-3 shadow-custom rounded-md">
      <header className="text-center">
        <Heading heading="Sign In" />
        <SubHeading text="Enter your information " />
      </header>
      <main>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputBox
            label="Email"
            name="username"
            type="email"
            handleChange={handleChange}
          />
          <InputBox
            label="Password"
            name="password"
            type="password"
            handleChange={handleChange}
          />
          <button className="bg-gray-900 text-white p-3 rounded-md text-sm">
            Sign In
          </button>
        </form>
      </main>
      <footer className="text-center">
        <p>
          Don't have an account?
          <Link to="/signup" className="hover:underline">
            Register
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Signin;
