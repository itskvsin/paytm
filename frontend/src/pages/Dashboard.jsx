import AppBar from "../Components/AppBar";
import Balance from "../Components/Balance";
import Users from "../Components/Users";

export default function Dashboard(){
    return <div>
        <AppBar />
        <div className="ml-4">
            <Balance balance={1000}/>
        </div>
        <div className="ml-4 mr-4">
            <Users />
        </div>
    </div>
}