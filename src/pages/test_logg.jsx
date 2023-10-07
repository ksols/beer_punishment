import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { getLog } from "../../api";
function List(name) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [log_liste, setLog_liste] = useState([]);
  let logData = [];
  const person_name = name["name"];
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
      logData = await createLogList();
      
      setLog_liste(logData[0]["log"]);
      let parset_log_liste = [];
      for (let log_object_in_list of logData[0]["log"]) {
        if (Object.keys(log_object_in_list)[0] === person_name) {
          let comment =
            " + " +
            log_object_in_list[person_name]["number"] +
            " for " +
            log_object_in_list[person_name]["comment"];
          parset_log_liste.push(comment);
        }
      }
    }
    nested();
  }, []);
  useEffect(()=>{
    console.log("Log_liste: ", JSON.stringify(log_liste));
  },[log_liste]);

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
    setEditValue(editValue);
  };

  const handleDeleteClick = (index) => {
    console.log("sletter på ", person_name);
    console.log("index ", index);
    console.log("Sletter da", JSON.stringify(log_liste[index][person_name]["number"]));
    log_liste.splice(index, 1);
    let newRenderList = log_liste;
    setLog_liste(newRenderList);
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
          <th>Straffe Logg</th>
          <th>Slett</th>
        </tr>
      </thead>
      <tbody>
      {log_liste.map((item, index) => (
        Object.keys(item)[0] === person_name && (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item[person_name]["number"]} {item[person_name]["comment"]}</td>
            <td>
              <Button variant="danger" onClick={() => handleDeleteClick(index)}>
              <span className={"material-symbols-outlined"}>
                delete
              </span>
              </Button>
            </td>
          </tr>
        )
      ))}

        {/* Mulig dette taes med senere men uvisst per nå */}
        {/* {log_liste.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
                {item}
            </td>
            <td>
              <Button variant="danger" onClick={() => handleDeleteClick(index)}>
                Delete
              </Button>
            </td>
          </tr>
        ))} */}
      </tbody>
    </Table>
  );
}

export default List;
