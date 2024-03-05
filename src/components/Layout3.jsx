import React from "react";

export default function Layout3({ children }) {
  return (
    <div className="grid grid-cols-2">
      <div className="w-80 h-screen bg-blue-500 text-white">Posts</div>
      {children}
    </div>
  );
}
