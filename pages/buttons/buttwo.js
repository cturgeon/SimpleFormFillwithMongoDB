import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";

export default function ButtonTwo() {
  const [formData, setFormData] = useState([]);
  const enteredTitle = useRef();
  const enteredName = useRef();

  async function submitHandler(e, form) {
    e.preventDefault();
    let newData = form;

    const newArrayData = {
      title: enteredTitle.current.value,
      name: enteredName.current.value,
    };
    newData.dataArray.push(newArrayData);

    await fetch("/api/form", {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    enteredName.current.value = "";
    enteredTitle.current.value = "";
  }

  useEffect(() => {
    fetch("/api/form")
      .then((res) => res.json())
      .then((data) => setFormData(data.formData));
  }, []);

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
              <p>{form._id}</p>
              <p>{form.name}</p>
              <p>{form.title}</p>
              <p>{form.description}</p>
              <p>{form.value}</p>
              <ul>
                {form.dataArray.map((data) => (
                  <li>
                    <p>{data.title}</p>
                    <p>{data.name}</p>
                  </li>
                ))}
              </ul>
            </li>
            <button onClick={() => deleteHandler(form._id)}>Delete</button>
            <form>
              <div>
                <label htmlFor="title">Add a title to the array</label>
                <input type="title" id="title" ref={enteredTitle} />
              </div>
              <div>
                <label htmlFor="name">Add a name for the array</label>
                <input type="name" id="name" ref={enteredName} />
              </div>
              <button onClick={(e) => submitHandler(e, form)}>
                Add data to array
              </button>
            </form>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
