import { useState } from "react";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                body: JSON.stringify({username, password})
                },
        );
        const result = await response.json(); 
        console.log(result);

    } catch (error) {
        setError(error.message)
    }
    //set" "
  }

  return (
    <>
      <h2>Sign Up </h2>
      {error && <p>{error}</p>} {/* '&&' evaluates to 'true' if both are true, it evaluates to false. The double && is being used for conditional rendering: it renders the <p> element only if error is truthy*/}

      <form onSubmit={handleSubmit}>

        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />

        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <button> Submit</button>
      </form>
    </>
  );
}
