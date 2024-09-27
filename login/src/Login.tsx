import { useState } from "react";
import { checkCred } from "./checkCred";
let host = "http://localhost:";
let port = "8081";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameToLower = username.toLocaleLowerCase();
    checkCred({ data: { email: usernameToLower, password: password } });
    console.log({ username, password });
  };
  const onRegistrationClick = () => {
    window.location.href = `${host}${port}/registration/`;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
      <div>
        <h3>Not register yet?</h3>
        <button onClick={() => onRegistrationClick()}>Registration</button>
      </div>
    </div>
  );
};
