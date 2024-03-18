import React from "react";
import Button from "react-bootstrap/Button";
import {
  get_auth,
  deleteAuthUser,
  addAuthUser,
  changeAdmin,
  getAdmin,
} from "../../api";
import { atom, useAtom } from "jotai";
import { userAtom } from "./atom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
export default function AdminPage() {
  const [authEmails, setAuthEmails] = useState([]);
  const [user, setUser] = useAtom(userAtom);
  const [form_select, setForm_select] = useState(" ");
  const [new_address, setNew_address] = useState(" ");
  const [new_super_address, setNew_super_address] = useState(" ");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [admin_state, setAdmin_state] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "Endringer du har valgt:"
  );
  useEffect(() => {
    async function g() {
      const temp = await get_auth();
      const values = Object.values(temp);
      setAuthEmails(values);
      let admin_json = await getAdmin();
      let admin_values = Object.values(admin_json[0]);
      setAdmin_state(admin_values);
    }
    g();
  }, []);

  function rickRoll() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
  function spinningDog() {
    window.location.href = "https://chihuahuaspin.com/";
  }

  function actually_submit(add, remove, transfer) {
    console.log("remove: ", JSON.stringify(remove));
    deleteAuthUser(remove);
    console.log("add: ", JSON.stringify(add));
    // Add is a email string
    // Need it to be {name: "email"}
    let key = add.split(".")[0];
    let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    let emailDict = {
      [capitalizedKey]: add,
    };
    addAuthUser(emailDict);
    let key2 = transfer.split(".")[0];
    let capitalizedKey2 = key2.charAt(0).toUpperCase() + key2.slice(1);
    let emailDict2 = {
      [capitalizedKey2]: transfer,
    };
    changeAdmin(emailDict2);
  }
  function SummaryModal({ remove, add, transfer }) {
    return (
      <div>
        <div>
          {remove != "decoy" && (
            <ul key={"suum1"}>
              <b>Fjerne rettigheter: </b> {remove}
            </ul>
          )}
          {add != "" && (
            <ul key={"suum2"}>
              <b>Gi rettigheter: </b>
              {add}
            </ul>
          )}
          {transfer != "" && (
            <ul key={"suum3"}>
              <b>Overføre SUPER admin (VELDIG SKUMMEL): </b>
              {transfer}
            </ul>
          )}
          {remove == "decoy" && add == "" && transfer == "" && (
            <ul>Ingenting valgt</ul>
          )}
        </div>
      </div>
    );
  }

  function are_you_sure_modal(evt) {
    evt.preventDefault();
    let form = evt.target;
    setForm_select(form.elements.form_select.value);
    setNew_super_address(form.elements.new_super_address.value);
    setNew_address(form.elements.new_address.value);
    form.elements.form_select.value = "decoy";
    form.elements.new_address.value = "";
    form.elements.new_super_address.value = "";
    setModalVisible(true);
  }
  return (
    <div>
      <Modal
        className=".modal"
        show={modalVisible2}
        onHide={() => setModalVisible2(false)}
        backdropClassName="custom-backdrop"
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <b>ER DU HELT SIKKER???</b>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Det er INGEN vei tilbake, anbefaler å være helt sikker på at
          innskriving er riktig.
          <br />
          <Button
            variant="danger"
            onClick={() => {
              actually_submit(new_address, form_select, new_super_address);
              setModalVisible2(false);
            }}
          >
            Jeg er HELT sikker
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisible2(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className=".modal"
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        backdropClassName="custom-backdrop"
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SummaryModal
            remove={form_select}
            add={new_address}
            transfer={new_super_address}
          ></SummaryModal>
        </Modal.Body>
        <Modal.Footer className="align-center">
          <div>
            <b>Dobbeltsjekk alle svar før du går videre</b>
            <br />
            <Button
              variant="primary"
              onClick={() => {
                setModalVisible(false);
                setModalVisible2(true);
              }}
            >
              Done
            </Button>
          </div>
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container mt-5">
        <div className="row justify-content-center">
          {admin_state.includes(user.email) && (
            <div className="col-md-6">
              <form onSubmit={are_you_sure_modal}>
                <div className="mb-3">
                  <label
                    htmlFor="textField1"
                    className="form-label"
                    style={{ color: "#cccccc" }}
                  >
                    Mail adresse til ny adminbruker (EN AV GANGEN TAKKSKARRUHA)
                  </label>
                  <div className="input-group">
                    <input
                      name="new_address"
                      type="text"
                      className="form-control"
                      id="textField1"
                    />
                    <button
                      style={{ zIndex: 0 }}
                      className="btn btn-primary ms-1"
                      onSubmit={are_you_sure_modal}
                    >
                      Legg til som admin
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="dropdown"
                    className="form-label"
                    style={{ color: "#cccccc" }}
                  >
                    Velg mail adresse for å fjerne rettigheter
                  </label>

                  {authEmails.length > 0 && (
                    <div className="input-group">
                      <select
                        className="form-select"
                        id="dropdown"
                        defaultValue={"decoy"}
                        name="form_select"
                      >
                        <option value="decoy">Ikke valgt</option>
                        {authEmails.map((e) => {
                          return (
                            <option value={e} key={e}>
                              {e}
                            </option>
                          );
                        })}
                        {/* Options for select dropdown */}
                      </select>
                      <button
                        style={{ zIndex: 0 }}
                        onSubmit={are_you_sure_modal}
                        className="btn btn-danger ms-1"
                      >
                        Fjern rettigheter
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="textField2"
                    className="form-label"
                    style={{ color: "#cccccc" }}
                  >
                    Mail til ny SUPER admin (Du overfører SUPER admin
                    rettighetene dine)
                  </label>
                  <div className="input-group">
                    <input
                      name="new_super_address"
                      type="text"
                      className="form-control"
                      id="textField2"
                    />
                    <button
                      style={{ zIndex: 0 }}
                      className="btn btn-danger ms-1"
                      onSubmit={are_you_sure_modal}
                    >
                      Overfør SUPER admin
                    </button>
                    {/* <button className="btn btn-primary ms-1" onSubmit={halla}>
                  Submit
                </button> */}
                  </div>
                </div>
              </form>
            </div>
          )}
          <div style={{ color: "#cccccc" }}>
            Jeg var sjefen,
            <br />
            hadde alt i min hånd,
            <br />
            men så sa jeg "del, la oss sammen stå i ånd".
            <br />
            makt ikke bare min,
            <br />
            alle kan ha litt,
            <br />
            da blir det gøyere,
            <br />
            vi kan dele og bli kvitt.{" "}
            <img
              src="src/assets/fireball.jpg"
              onClick={spinningDog}
              style={{
                borderRadius: "5%", // Makes the image round
                width: "20px", // Sets the width to a smaller size
                height: "40px", // Sets the height to the same as the width to maintain aspect ratio
                objectFit: "cover", // Ensures the image covers the area without stretching
                cursor: "pointer",
              }}
            />
            <br />
            <br />
            <i>- Sokrates 470 - 399 fvt</i>
            <br />
            <img
              onClick={rickRoll}
              style={{
                borderRadius: "50%", // Makes the image round
                width: "100px", // Sets the width to a smaller size
                height: "100px", // Sets the height to the same as the width to maintain aspect ratio
                objectFit: "cover", // Ensures the image covers the area without stretching
                cursor: "pointer",
              }}
              src="src/assets/Socrates_Louvre.jpg"
              alt="Sokrates"
            />
            <br />
            IKKE RØR MEG
          </div>
        </div>
      </div>
    </div>
  );
}
