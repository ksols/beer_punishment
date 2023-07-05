import React from "react";
import { useState, useEffect } from "react";
export default function () {
  const [overskrifter, setOverskrifter] = useState([]);
  const [data, setData] = useState([[]]);
  useEffect(() => {
    setOverskrifter(["Id", "First", "Last", "Handle"]);
    setData([
      ["1", "Mark", "Otto", "@mdo"],
      ["2", "Jacob", "Thornton", "@fat"],
      ["3", "Larry", "the Bird", "@twitter"],
    ]);
  }, []);
  return (
    <table class="table table-dark">
      <thead>
        <tr>
          {overskrifter.map((e) => {
            return <th scope="col">{e}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((e) => {
          return (
            <tr>
              {e.map((f) => {
                return <td scope="row">{f}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
