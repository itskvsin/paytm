import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import { Heading } from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";


export default function SignIn(){
    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center rounded-lg capitalize">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center px-4">
                    <Heading label={"SignIn"} />
                    <SubHeading label={"Enter Your credentials to access your account"} />
                    <InputBox label={"Email: "} placeholder={"kevin@gmail.com"} />
                    <InputBox label={"Password: "} placeholder={"e.g: 123"} />
                    <div className="pt-4">
                        <Button label={"Sign In"}/>
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
                </div>    
            </div>            
        </div>
    )
}