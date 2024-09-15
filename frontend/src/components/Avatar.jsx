import React from "react";

const Avatar = ({ user }) => {
  const firstLetter = (user && user.slice(0, 1).toUpperCase()) || "U";
  const color = colors[Math.trunc(Math.random(0, 1) * colors.length)];

  return (
    <span
      className={`w-12 h-12 rounded-full flex items-center justify-center ${color}  font-bold`}
    >
      {firstLetter}
    </span>
  );
};

export default Avatar;

const colors = ["bg-purple-300", "bg-emerald-300", "bg-red-300", "bg-blue-300"];
