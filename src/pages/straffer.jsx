import React, { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { userAtom } from "./atom";
import get, { getLog } from "../../api";
import { modyfiDB, get_auth } from "../../api";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import List from "./test_logg";
const Straffer = () => {
  const [user, setUser] = useAtom(userAtom);
  let myDict = {};
  let authDictEmails = {};
  const [authEmails, SetAuthEmails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
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
          min: 0,
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
            point: {
            events: {
              click: function (evt) {
                setSelectedCategory(this.category);
                setModalVisible(true);
                },
              },
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
        colors: ["orange"],
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
      <Modal className=".modal"
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        backdropClassName="custom-backdrop"
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <List name={selectedCategory}></List>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
