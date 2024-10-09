import { useState } from "react";
import { registerUser } from "./registerUser";

let host = "http://localhost:";
let port = "8081";
export const Registration = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      data: {
        email: email.toLocaleLowerCase(),
        password: password,
        name: name,
      },
    });
  };
  const onLoginClick = () => {
    window.location.href = `${host}${port}/login/`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Full name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
        <h3>Already got a user?</h3>
        <button onClick={() => onLoginClick()}>Login</button>
      </div>
    </div>
  );
};
