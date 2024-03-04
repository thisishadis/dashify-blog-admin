import React from "react";

export default function Toast() {
  return (
    <div className="toast toast-top toast-start">
      <div className="alert alert-info">
        <div>Oops!</div>
        <p>your email or password is incorrect.</p>
      </div>
    </div>
  );
}
