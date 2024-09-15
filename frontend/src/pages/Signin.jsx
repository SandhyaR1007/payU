import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/Inputbox";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { baseUrl } from "../apis/apiUtils";

const Signin = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setLocalStorage } = useLocalStorage();
  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}user/signin`, formInputs)
      .then(function (response) {
        const token = response.data.token;
        if (token) {
          setLocalStorage("token", token);
          return navigate("/dashboard");
        }
      })
      .catch(function (error) {
        console.log("Some error occurred", error);
      });
  };
  return (
    <div className="max-w-sm m-auto mt-[10%] p-10 flex flex-col  gap-3 shadow-custom rounded-md">
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
          <button className="btn">Sign In</button>
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
