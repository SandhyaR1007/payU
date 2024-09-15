import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/Inputbox";
import { baseUrl } from "../apis/apiUtils";

const Signup = () => {
  const [formInputs, setFormInputs] = useState({
    firstname: "",
    lastname: "",
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
      .post(`${baseUrl}user/signup`, formInputs)
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
        <Heading heading="Sign Up" />
        <SubHeading text="Enter your information to create an account" />
      </header>
      <main>
        <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputBox
            label="First Name"
            name="firstname"
            handleChange={handleChange}
          />
          <InputBox
            label="Last Name"
            name="lastname"
            handleChange={handleChange}
          />
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
          <button className="btn">Sign up</button>
        </form>
      </main>
      <footer className="text-center">
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="hover:underline">
            Login
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Signup;
