import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
    }).then((response) => {
      setUsers(response.data.user)
    })
  }, [filter])

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full px-2 py-1 border-2 rounded border-slate-500 outline-none"
          onChange={e => {
            setFilter(e.target.value)
          }}
        />
      </div>
      <div>
        {users.map((user) => {
          return <User user={user} />;
        })}
      </div>
    </div>
  );
}

export function User({ user }) {

  const navigate = useNavigate();
  
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

      <div>
        <Button onClick={e => {
          navigate("/sendmoney?id="+ user._id+"&name="+ user.firstName)
        }} label={"Send Money"} />
      </div>
    </div>
}
