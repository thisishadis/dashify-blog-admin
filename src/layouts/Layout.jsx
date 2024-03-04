import React from "react";

export default function layout({ children }) {
  return (
    <div className="grid grid-cols-7">
      <div className="fixed bg-blue-500 col-span-1  flex flex-col gap-4 h-screen w-60 text-white">
        <h1 className="text-2xl p-2">Products</h1>
        <div className="w-full">
          <div className="btn-ghost p-3 m-0 ">All Products</div>
          <div className="btn-ghost p-3 m-0 ">Edit Products</div>
        </div>
      </div>
      <div className="col-span-6 ml-64">{children}</div>
    </div>
  );
}
