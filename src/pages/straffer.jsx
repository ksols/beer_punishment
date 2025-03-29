import React, { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { userAtom } from "./atom";
import get from "../../api";
import { get_auth } from "../../api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import List from "./test_logg";
import coolDarkTheme from "../components/Table/TableTheme";
import handleForm from "../components/Form/HandlePunishChange";

const Straffer = () => {
  const [user] = useAtom(userAtom);
  const [newCategories, setNewCategories] = useState([]);
  const [newValues, setNewValues] = useState([]);
  const [minimumValue, setMinimumValue] = useState(0);
  const [authEmails, setAuthEmails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await get_auth();
        setAuthEmails(Object.values(authResponse));

        const myDict = await get();
        const sortedEntries = Object.entries(myDict).sort(
          (a, b) => b[1] - a[1]
        );
        const sortedDict = Object.fromEntries(sortedEntries);

        const categories = Object.keys(sortedDict);
        const values = Object.values(sortedDict);
        const minValue = values.length > 0 ? values[values.length - 1] : 0;

        setNewCategories(categories);
        setNewValues(values);
        setMinimumValue(minValue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    Highcharts.setOptions(coolDarkTheme);
    Highcharts.chart(chartRef.current, {
      chart: { type: "bar" },
      title: { text: "LaBamba ølstraffer", align: "left" },
      xAxis: { categories: newCategories, title: { text: null } },
      yAxis: {
        min: minimumValue,
        title: { text: "Ølstraffer (antall)", align: "high" },
        labels: { overflow: "justify" },
      },
      tooltip: { valueSuffix: " Ølstraffer" },
      plotOptions: {
        bar: {
          dataLabels: { enabled: true },
          borderWidth: 0,
          point: {
            events: {
              click: function () {
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
        y: 0,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#EEEEEE",
        shadow: true,
      },
      credits: { enabled: false },
      colors: ["#eb9500"],
      series: [
        {
          name: `Totalt: ${newValues.reduce((a, b) => a + b, 0)} ølstraffer`,
          data: newValues,
        },
      ],
    });
  }, [newCategories, newValues, minimumValue]);

  function goToAdmin() {
    window.location = "/admin";
  }

  return (
    <div>
      <Modal
        show={modalVisible}
        onHide={() => {
          console.log("setModalVisible kjører");
          setModalVisible(false);
        }}
        className=".modal"
        backdropClassName="custom-backdrop"
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List name={selectedCategory} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <div style={{ color: "#cccccc" }}>
          {user.given_name
            ? `Hallais ${user.given_name}`
            : "Uten login med tilgang får du se, men ikke røre"}
        </div>
        <figure className="highcharts-figure">
          <div id="container" ref={chartRef}></div>
        </figure>
      </div>

      {authEmails.includes(user.email) && (
        <form onSubmit={(e) => handleForm(e)}>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label" style={{ color: "#cccccc" }}>
                  Navn på person (som skrevet over)
                </label>
                <input
                  type="text"
                  required
                  name="navn"
                  className="form-control"
                />
                <div className="form-text" style={{ color: "#cccccc" }}>
                  Husk stor bokstav på navn
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#cccccc" }}>
                  Endring i straffer:
                </label>
                <input
                  type="number"
                  required
                  name="antall1"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#cccccc" }}>
                  Kommentar
                </label>
                <input
                  type="text"
                  required
                  name="comment"
                  className="form-control"
                />
                <div className="form-text" style={{ color: "#cccccc" }}>
                  Hvorfor man fikk / fjernet straffen (Må med)
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="col"></div>
          </div>
        </form>
      )}

      <br />
      {authEmails.includes(user.email) && (
        <Button variant="danger" onClick={goToAdmin}>
          Admin settings
          <div className="form-text" style={{ color: "#cccccc" }}>
            Skummel knapp (Farlig åsånn)
          </div>
        </Button>
      )}
    </div>
  );
};

export default Straffer;
