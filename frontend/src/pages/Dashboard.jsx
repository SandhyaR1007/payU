import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getAllUsers } from "../apis/apiUtils";
import Avatar from "../components/Avatar";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
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
      <nav className="flex items-center py-3 px-10 justify-between shadow-md bg-violet-50">
        <Heading heading="PayU" />
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
            {users.map((user) => (
              <p key={user._id}>
                <Avatar user={user.firstname} />
                {user.firstname}
              </p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
