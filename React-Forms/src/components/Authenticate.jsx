import { useState } from "react";

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("result", result);
      setSuccessMessage(result.message);

      setUsername(result.data.username)

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="wrapper">
      <h2>Authenticate</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {username && <p className="welcome-message"> Welcome  {username}  </p>}

      {error && <p className="error-message">{error}</p>}

      <button className="btn" onClick={handleClick}> Authenticate Token!</button>
    </div>
  );
}
