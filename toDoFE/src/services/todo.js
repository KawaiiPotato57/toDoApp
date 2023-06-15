import axios from "axios";
import config from "../config";

const baseUrl = config.apiUrl;

async function getTasks() {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function postTask(newTodo) {
  try {
    const response = await axios.post(baseUrl, newTodo);
    return response.data;
  } catch (error) {}
}

async function deleteTask(id) {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function putTask(obj) {
  try {
    const response = await axios.put(`${baseUrl}/${obj.id}`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default { getTasks, postTask, deleteTask, putTask };
