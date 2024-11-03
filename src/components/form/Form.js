import React, { useState } from "react";
import "./Form.css";

export default function Form({ setUserInput }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    const value = event.target.value;

    if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
      setError("Only alphanumeric characters are allowed.");
    } else {
      setError("");
      setInput(value);
      setUserInput(value);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={onChangeHandler}
        placeholder="Search products..."
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
