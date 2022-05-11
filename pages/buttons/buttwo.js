import { useState, useEffect } from "react";
import { Fragment } from "react";

export default function ButtonTwo() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetch("/api/form")
      .then((res) => res.json())
      .then((data) => setFormData(data.formData));
  }, [formData]);

  async function deleteHandler(id) {
    await fetch("/api/form", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div align="center">
      <h1>Welcome to Buttwo!</h1>
      <h3>Here is some data from the backend!</h3>
      <ul>
        {formData.map((form) => (
          <Fragment key={form._id}>
            <li>
              <p>{form.name}</p>
              <p>{form.title}</p>
              <p>{form.description}</p>
              <p>{form.value}</p>
            </li>
            <button onClick={() => deleteHandler(form._id)}>Delete</button>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
