// import Button from "../Components/Button";
import { Heading } from "../Components/Heading";
import InputBox from "../Components/InputBox";

export default function SendMoney() {
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="flex justify-center items-center w-full ">
        <div className="w-1/4 flex flex-col gap-4 bg-slate-300 p-10 rounded-lg">
          <Heading label={"Send Money"} />
            <InputBox label={"Enter Amount"} placeholder={"Rs. 1000"} />
          {/* <input type="number" name="amount" id="amount" placeholder="Enter your amount" className="outline-none px-2 py-1 border rounded-lg "/> */}
          <button type="button" className="w-full bg-green-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:border-gray-700">Enter</button>
        </div>
      </div>
    </div>
  );
}
