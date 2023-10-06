let url =
  "https://eu-central-1.aws.data.mongodb-api.com/app/application-0-ilufl/endpoint/get";
export default async function get() {
  let data = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
  let nytt_dict = {};
  for (let x of Object.keys(data[0])) {
    if (x != "_id") {
      let key = x;
      nytt_dict[key] = data[0][key];
    }
  }
  data = nytt_dict;
  return data;
}
let url_auth =
  "https://eu-central-1.aws.data.mongodb-api.com/app/application-0-ilufl/endpoint/auth";
export async function get_auth() {
  let data = await fetch(url_auth)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
  let nytt_dict = {};
  for (let x of Object.keys(data[0])) {
    if (x != "_id") {
      let key = x;
      nytt_dict[key] = data[0][key];
    }
  }
  data = nytt_dict;
  return data;
}

let url_post =
  "https://eu-central-1.aws.data.mongodb-api.com/app/application-0-ilufl/endpoint/Post";
export async function modyfiDB(key, value) {
  let old_data = await get();
  if (Object.keys(old_data).includes(key)) {
    let my_data = {};
    my_data[key] = value;
    await fetch(url_post, {
      method: "POST",
      body: JSON.stringify(my_data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    });
  }
  return null;
}

export async function getLog() {
  let log_url =
    "https://eu-central-1.aws.data.mongodb-api.com/app/application-0-ilufl/endpoint/log";
  let log_data = await fetch(log_url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
  return log_data;
}

export async function changeLog() {
  // TODO: Sette inn endring av kommentarer.
  // Skal man endre antallet må man slette også legge inn vanlig igjen fordi jeg ikke orker
  // let log_url = TBD
  let log_data = await fetch(log_url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
  return log_data;
}

export async function deleteLog() {
  // TODO: Sette inn endring av kommentarer / ølstraff antall
  // let log_url = TBD
  let log_data = await fetch(log_url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error(error));
  return log_data;
}
