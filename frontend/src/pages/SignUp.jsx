import BottomWarning from "../Components/BottomWarning";
import Button from "../Components/Button";
import { Heading } from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";


export default function SignUp(){
    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center rounded-lg capitalize">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center px-4">
                    <Heading label={"SignUp"} />
                    <SubHeading label={"Enter Your Information To Create An Account"} />
                    <InputBox label={"First Name: "} placeholder={"Kevin"} />
                    <InputBox label={"Last Name: "} placeholder={"Solanki"} />
                    <InputBox label={"Email: "} placeholder={"kevin@gmail.com"} />
                    <InputBox label={"Password: "} placeholder={"e.g: 123"} />
                    <div className="pt-4">
                        <Button label={"Sign Up"}/>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>    
            </div>            
        </div>
    )
}