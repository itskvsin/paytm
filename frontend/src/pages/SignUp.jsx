import { useState } from "react";
import axios from "axios";
import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import { Heading } from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center rounded-lg capitalize">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center px-4">
          <Heading label={"SignUp"} />
          <SubHeading label={"Enter Your Information To Create An Account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name: "}
            placeholder={"Kevin"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name: "}
            placeholder={"Solanki"}
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email: "}
            placeholder={"kevin@gmail.com"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password: "}
            placeholder={"e.g: 123"}
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                axios({
                  method: "post",
                  url: "http://localhost:3000/api/v1/user/signup",
                  data: {
                    username,
                    firstName,
                    lastName,
                    password,
                  },
                });
              }}
              label={"Sign Up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}
