import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const result = await response.json();
      console.log("result", result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
    setUsername(""); // clears form to default value
    setPassword("");
  }

  return (
    <div className="wrapper">

      <form onSubmit={handleSubmit}>
        <h1>Sign Up </h1>
        {error && <p>{error}</p>}{" "}
        {submitted && <p> Click "Authenticate Token" to complete sign up.</p>}

        <div>
          <label>
            {/* Username:{" "} */}
            <input
              className="input-box"
              value={username} // updates as state updates
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              minLength={"8"}
              required
            />
            <div className="user-icon"><FaUser /></div>
          </label>
        </div>

        <div>
          <label>
            {/* Password:{" "} */}
            <input
              className="input-box"
              type="password"
              value={password} // updates as state updates
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <div className="lock-icon"><FaLock /></div>
          </label>
        </div>

        <button className="btn"> Submit</button>
      </form>
    </div>
  );
}
