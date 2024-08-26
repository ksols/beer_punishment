import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useAtom } from "jotai";
import { userAtom } from "./atom";
import { getLog, deleteLog, modyfiDB, get_auth } from "../../api";
function List(name) {
  const [log_liste, setLog_liste] = useState([]);
  const [user, setUser] = useAtom(userAtom);
  const [authEmails, SetAuthEmails] = useState([]);
  let logData = [];
  const person_name = name["name"];

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
  
  useEffect(() => {
    const fetchAuthEmails = async () => {
      // Fetch authEmails asynchronously
      const response = await get_auth();
      // Update component state with fetched authEmails
      SetAuthEmails(Object.values(response));
    };
    fetchAuthEmails();
  }, []);

  const handleDeleteClick = async (index) => {
    let newRenderList = [...log_liste];
    const amount_to_remove = newRenderList[index][person_name]["number"];
    newRenderList.splice(index, 1);
    await deleteLog({"log": newRenderList});
    let modded_number = Number(0) - Number(amount_to_remove);
    await modyfiDB(person_name, modded_number);
    setLog_liste(newRenderList);    
  };

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Dato</th>
          <th>Kommentar</th>
          <th>Slett</th>
        </tr>
      </thead>
      <tbody>
      {log_liste.map((item, index) => (
        Object.keys(item)[0] === person_name && (
          <tr key={index}>
            <td>{item[person_name]["c_date"]}</td>
            <td>{item[person_name]["number"]} {item[person_name]["comment"]}</td>
            {authEmails.includes(user.email) ? (
            <td>
              <Button variant="danger" onClick={() => handleDeleteClick(index)}>
              <span className={"material-symbols-outlined"}>
                delete
              </span>
              </Button>
            </td>)
          : <td>Du har ikke tilgang til å slette</td>  
          }
          </tr>
        )
      ))}
      </tbody>
    </Table>
    </div>
  );
}

export default List;
