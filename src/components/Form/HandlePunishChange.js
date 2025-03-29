import { getLog } from "../../../api";
import { modyfiDB, addToLog } from "../../../api";

async function handleForm(event) {
  event.preventDefault();
  let form = event.target;
  let navn = form.elements.navn.value;
  let straffer = form.elements.antall1.value;
  let kommentar = form.elements.comment.value;
  await modyfiDB(navn, Number(straffer));
  let log_object = {};
  log_object[navn] = {
    number: Number(straffer),
    comment: kommentar,
    c_date: new Date().toLocaleDateString() + "",
  };
  let tidligere_log = await getLog();
  let temp = tidligere_log[0]["log"];
  let nye_log_object = [...temp];
  nye_log_object.unshift(log_object);
  await addToLog({ log: nye_log_object });
  await createData();
  window.location.href = "/straffer";
}
export default handleForm;
