import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getAllUsers } from "../apis/apiUtils";
import Avatar from "../components/Avatar";
import User from "../components/User";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const { getLocalStorage } = useLocalStorage();
  useEffect(() => {
    const token = getLocalStorage("token");
    (async () => {
      try {
        const data = await getAllUsers(token);
        if (data) {
          setUsers(data.data.users);
        }
      } catch (err) {
        console.log("Error occured when fetching users");
      }
    })();

    return () => {};
  }, []);
  return (
    <div className="">
      <nav className="flex items-center py-3 px-10 justify-between shadow-sm ">
        <Heading heading="ManaPay" />
        <div className="flex gap-3 items-center">
          <span className="font-semibold"> Hello User</span>
          <Avatar />
        </div>
      </nav>
      <main className="px-10 py-5">
        <section>Your Balance</section>
        <section>
          <h3>Users</h3>
          <div>
            <input
              className="w-full py-2 px-4 border border-neutral-200 outline-none rounded-md shadow-sm"
              type="search"
              name=""
              id=""
              placeholder="Search users..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
          <div>
            {users
              .filter((u) =>
                u.firstname.toLowerCase().includes(query.toLowerCase())
              )
              .map((user) => (
                <User user={user} key={user._id} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
