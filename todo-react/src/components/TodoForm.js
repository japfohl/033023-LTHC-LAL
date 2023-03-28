import { useState } from "react";

export default function TodoForm({ onSave }) {
  const [description, setDescription] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(description);
    setDescription("");
  };

  return (
    <section>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          className="todo-form--input"
          type="text"
          name="todoInput"
          id="todoInput"
          placeholder="What has to be done?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </form>
    </section>
  );
}
