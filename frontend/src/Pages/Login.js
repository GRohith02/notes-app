import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      const res = await register(username, password);
      if (res.ok) {
        setIsRegister(false);
        setError("Registered! Now login.");
      } else {
        setError("Registration failed (username might be taken)");
      }
      return;
    }

    const res = await login(username, password);
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
          {isRegister ? "Already have an account? Login" : "New user? Register here"}
        </p>
      </div>
    </div>
  );
}

export default Login;