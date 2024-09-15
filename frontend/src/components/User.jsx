import React from "react";
import Avatar from "./Avatar";

const User = ({ user }) => {
  return (
    <div className="flex items-center justify-between py-3 shadow-sm hover:bg-neutral-50">
      <div className="flex items-center gap-4">
        {" "}
        <Avatar user={user.firstname} />
        <span>{user.firstname}</span>
      </div>
      <div>
        <button className="btn">Send Money</button>
      </div>
    </div>
  );
};

export default User;
