import React, { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { userAtom } from "./atom";
import get from "../../api";
import { modyfiDB, get_auth } from "../../api";
const Straffer = () => {
  const [user, setUser] = useAtom(userAtom);
  let myDict = {};
  let authDictEmails = {};
  const [authEmails, SetAuthEmails] = useState([]);

  useEffect(() => {
    const fetchAuthEmails = async () => {
      // Fetch authEmails asynchronously
      const response = await get_auth();
      // Update component state with fetched authEmails
      SetAuthEmails(Object.values(response));
    };
    fetchAuthEmails();
  }, []);

  async function createData() {
    myDict = await get();
    const entries = Object.entries(myDict);
    entries.sort((a, b) => b[1] - a[1]);
    const sortedDict = Object.fromEntries(entries);

    const newCategories = Object.keys(sortedDict);

    const newValues = Object.values(sortedDict);
    
    const minimum_value = newValues[newValues.length-1];
    $(document).ready(function () {
      Highcharts.chart("container", {
        chart: {
          type: "bar",
        },
        title: {
          text: "LaBamba ølstraffer",
          align: "left",
        },
        xAxis: {
          categories: newCategories,
          title: {
            text: null,
          },
        },
        yAxis: {
          min: minimum_value,
          title: {
            text: "Ølstraffer (antall)",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
        },
        tooltip: {
          valueSuffix: " Ølstraffer",
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        colors: ["#feab00"],
        series: [
          {
            name:
              "Totalt: " + newValues.reduce((a, b) => a + b, 0) + " ølstraffer",
            data: newValues,
          },
        ],
      });
      // Create the chart
    });
  }
  createData();
  function handleForm(event) {
    event.preventDefault();
    let form = event.target;
    let navn = form.elements.navn.value;
    let straffer = form.elements.antall1.value;
    modyfiDB(navn, Number(straffer));
    createData();
  }
  return (
    <div>
      <div>
        <div>
          {user.given_name
            ? "Hallais " + user.given_name
            : "Uten login med tilgang får du se, men ikke røre"}
        </div>
        <figure className="highcharts-figure">
          <div id="container"></div>
        </figure>
      </div>
      {authEmails.includes(user.email) && (
        <form onSubmit={(e) => handleForm(e)}>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">
                  Navn på person (som skrevet over)
                </label>
                <input
                  type="Name"
                  name="navn"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  Husk stor bokstav på navn
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Straffer (totalt)</label>
                <input
                  type="Number"
                  name="antall1"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="col"></div>
          </div>
        </form>
      )}
    </div>
  );
};
export default Straffer;
