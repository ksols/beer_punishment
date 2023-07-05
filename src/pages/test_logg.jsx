import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { getLog } from "../../api";
function List() {
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [items, setItems] = useState([
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
  ]);

  useEffect(() => {
    async function nested() {
      async function createLogList() {
        let d = await getLog();
        return d;
      }
      let logData = await createLogList();
      for (let x of logData) {
        console.log("Data: ", JSON.stringify(x));
        let comment =
          "" +
          Object.keys(x)[1] +
          " " +
          "+" +
          Object.values(x)[1] +
          " for " +
          Object.values(x)[2].toLowerCase();
        console.log("Comment: ", comment);
      }
    }
    nested();
  }, []);
  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleEdit = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };
  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    handleEdit(editIndex, editValue);
    setEditIndex(-1);
    setEditValue("");
  };

  const handleDeleteClick = (index) => {
    handleDelete(index);
  };

  const handleEditClick = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {editIndex === index ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </form>
              ) : (
                item
              )}
            </td>
            <td>
              <Button
                variant="primary"
                onClick={() => handleEditClick(index, item)}
              >
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDeleteClick(index)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default List;
