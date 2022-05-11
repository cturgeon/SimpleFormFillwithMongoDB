import { useState, useRef } from "react";
import { Modal, Button, Group } from "@mantine/core";

async function sendFormData(newData) {
  const response = await fetch("/api/form", {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

export default function ModalPage() {
  const [opened, setOpened] = useState(false);
  const [buttonValue, setButtonValue] = useState(0);

  const enteredName = useRef(null);
  const enteredTitle = useRef(null);
  const enteredDescription = useRef(null);

  function increase() {
    setButtonValue(++buttonValue);
  }
  function decrease() {
    setButtonValue(--buttonValue);
  }

  async function submitHandler(event) {
    event.preventDefault();

    // TODO: Could add some front end validation

    const newData = {
      name: enteredName.current.value,
      title: enteredTitle.current.value,
      description: enteredDescription.current.value,
      value: buttonValue,
    };

    try {
      await sendFormData(newData);
    } catch (error) {
      // TODO set and Error
    }
    enteredName.current.value = "";
    enteredTitle.current.value = "";
    enteredDescription.current.value = "";
    setButtonValue(0);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        {
          <div align="center">
            <h1>Welcome to Buttone!</h1>
            <p>Enter some data below</p>
            <form onSubmit={submitHandler}>
              <div>
                <label>
                  Enter a name:
                  <input type="text" name="name" ref={enteredName} />
                </label>
              </div>
              <div>
                <label>
                  Enter a title:
                  <input type="text" name="title" ref={enteredTitle} />
                </label>
              </div>
              <div>
                <label>
                  Enter a description:
                  <input
                    type="text"
                    name="description"
                    ref={enteredDescription}
                  />
                </label>
              </div>
              <div>
                {`Value: ${buttonValue}`}
                <button type="button" onClick={increase}>
                  +
                </button>
                <button type="button" onClick={decrease}>
                  -
                </button>
                <div>
                  <button>Submit</button>
                </div>
              </div>
            </form>
          </div>
        }
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}
