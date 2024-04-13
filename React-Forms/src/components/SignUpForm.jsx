import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

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
    <>
      <h2>Sign Up </h2>
      {error && <p>{error}</p>}{" "}
      {/* The double && is being used for conditional rendering: it renders the <p> element only if error is truthy*/}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username} // updates as state updates
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />

        <label>
          Password:{" "}
          <input
            type="password"
            value={password} // updates as state updates
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <button> Submit</button>
      </form>
    </>
  );
}
