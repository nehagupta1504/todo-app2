import { React, useState, useEffect } from "react";
import "./style.css";

//Get local storage data to set items
const getLocalStorageData = () => {
  const localData = localStorage.getItem("myTodoList");
  if (localData) {
    return JSON.parse(localData);
  } else {
    return [];
  }
};

const Todo = () => {
  //State creation
  const [inputData, setinputData] = useState("");
  const [items, setItems] = useState(getLocalStorageData());
  const [isEditItem, setEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  //Add items function
  const addItems = () => {
    if (!inputData) {
      alert("Plz fill the data");
    } else if (inputData && toggleButton) {
      items.map((curEle) => {
        if (curEle.id === isEditItem) {
          curEle.name = inputData;
        } else {
          return curEle;
        }
        setinputData("");
        setEditItem(null);
        setToggleButton(false);
      });
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setinputData("");
    }
  };

  //Delete Items
  const deleteItem = (id) => {
    const updatedItems = items.filter((curEle) => {
      return curEle.id !== id;
    });
    console.table(updatedItems);
    setItems(updatedItems);
  };

  //editItem
  const editItem = (id) => {
    const item_todo_edited = items.find((curEle) => {
      return curEle.id === id;
    });
    setinputData(item_todo_edited.name);
    setEditItem(id);
    setToggleButton(true);
  };
  //removeAll
  const removeAll = () => {
    setItems([]);
  };

  //useEffect hook to save data in local storage whenever items state changes it is called automatically
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);
  //Return of todo component
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo" />
            <figcaption>Add Your List Here ✌️ </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => {
                setinputData(event.target.value);
              }}
            />
            {/* Ternary condition to show plus or edit button in input box */}
            {toggleButton ? (
              <i
                className="far fa-edit"
                onClick={() => {
                  addItems();
                }}
              ></i>
            ) : (
              <i
                className="fa fa-plus"
                onClick={() => {
                  addItems();
                }}
              ></i>
            )}
          </div>
          {/* Show our items */}
          <div className="showItems">
            {items.map((curEle, index) => {
              return (
                <div className="eachItem" key={curEle.id}>
                  <h3>{curEle.name}</h3>

                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItem(curEle.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteItem(curEle.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all butoon */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => {
                removeAll();
              }}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
