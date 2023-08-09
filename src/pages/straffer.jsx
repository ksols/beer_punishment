import React, { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { userAtom } from "./atom";
import get from "../../api";
import { modyfiDB, get_auth } from "../../api";
import { BarList, Card, Title, Bold, Flex, Text } from "@tremor/react";
const Straffer = () => {
  const [user, setUser] = useAtom(userAtom);
  let myDict = {};
  let tempDataVarElns = [];
  const [authEmails, SetAuthEmails] = useState([]);
  const [data, setData] = useState([]);

  async function createData() {
    myDict = await get();
    const entries = Object.entries(myDict);
    entries.sort((a, b) => b[1] - a[1]);

    tempDataVarElns = [];
    for (const e of entries) {
      tempDataVarElns.push({ name: e[0], value: e[1] });
    }
    setData([]);
    // Populating the actual BarList
    setData(tempDataVarElns);
  }
  useEffect(() => {
    const fetchAuthEmails = async () => {
      // Fetch authEmails asynchronously
      const response = await get_auth();
      // Update component state with fetched authEmails
      SetAuthEmails(Object.values(response));
    };
    fetchAuthEmails();
    createData();
  }, []);

  function handleForm(event) {
    event.preventDefault();
    let form = event.target;
    let navn = form.elements.navn.value;
    let straffer = form.elements.antall1.value;
    modyfiDB(navn, Number(straffer));
    createData();
  }
  console.log("data: ", JSON.stringify(data));
  return (
    <div>
      <div>
        <div>
          {user.given_name
            ? "Hallais " + user.given_name
            : "Uten login med tilgang får du se, men ikke røre"}
        </div>
        {/* <figure className="highcharts-figure">
          <div id="container"></div>
        </figure> */}
        <Card className="max-w bg-emphasis">
          <Title>Website Analytics</Title>
          <Flex className="mt-4">
            <Text>
              <Bold>Source</Bold>
            </Text>
            <Text>
              <Bold>Visits</Bold>
            </Text>
          </Flex>
          <BarList
            data={data}
            className="mt-2"
            barClassName="bg-orange-500 border border-solid border-tremor-brand-emphasis"
          />
        </Card>
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
