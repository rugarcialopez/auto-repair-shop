import RequestData from "../models/Request";

const API_URL = 'http://localhost:4000/api/';

const getAllUsers = async ( requestData: RequestData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'token': requestData.token
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data.users;
  } else {
    throw Error(data.message || response.statusText);
  }
}

const removeUser =  async (requestData: RequestData) => {
  const response = await fetch(`http://localhost:4000/api/delete-user/${requestData.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'token': requestData.token
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data.users;
  } else {
    throw Error(data.message || response.statusText)
  }
}

export { getAllUsers,removeUser };