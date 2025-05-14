import { useState } from "react";

const App = () => {
  const [secret, setSecret] = useState("");
  const handleLogic = async () => {
    const response = await fetch("http://localhost:5002/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secret }),
    });
    try {
      const data = await response.json();
      console.log(data);
      console.log(secret);
      localStorage.setItem("adminToken", data.token);
    } catch (error) {
      console.log(error.mesage);
    }
  };
  return (
    <div>
      <input
        // type="password"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Enter secret"
      />
      <button onClick={handleLogic}>Login</button>
    </div>
  );
};
export default App;
