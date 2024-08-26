import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getAllUsers } from "../apis/apiUtils";

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
    <div>
      <nav>
        <Heading heading="Payments App" />
        <div>Profile</div>
      </nav>
      <main>
        <section>Your Balance</section>
        <section>
          <h3>Users</h3>
          <div>
            {users.map((user) => (
              <p key={user._id}>{user.firstname}</p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
