import RequestData from "../models/Request";

const API_URL = 'http://localhost:4000/api';

const getAllUsers = async ( requestData: RequestData<{}>) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'token': requestData.token || ''
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data.users;
  } else {
    throw Error(data.message || response.statusText);
  }
}

const getUser = async ( requestData: RequestData<{}>) => {
  const response = await fetch(`${API_URL}/users/${requestData.id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'token': requestData.token || ''
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data.user;
  } else {
    throw Error(data.message || response.statusText);
  }
}

const updateUser =  async (requestData: RequestData<{fullName: string, email: string, role: string}>) => {
  const response = await fetch(`${API_URL}/edit-user/${requestData.id}`, {
    method: 'PUT',
    body: JSON.stringify(requestData.body),
    headers: {
      'Content-type': 'application/json',
      'token': requestData.token || ''
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw Error(data.message || response.statusText)
  }
}

const addUser =  async (requestData: RequestData<{fullName: string, email: string, role: string, password: string}>) => {
  const response = await fetch(`${API_URL}/add-user`, {
    method: 'POST',
    body: JSON.stringify(requestData.body),
    headers: {
      'Content-type': 'application/json',
      'token': requestData.token || ''
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw Error(data.message || response.statusText)
  }
}

const removeUser =  async (requestData: RequestData<{}>) => {
  const response = await fetch(`${API_URL}/delete-user/${requestData.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'token': requestData.token || ''
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data.users;
  } else {
    throw Error(data.message || response.statusText)
  }
}

const signIn =  async(requestData: RequestData<{email: string, password: string}>) => {
  const response = await fetch(`${API_URL}/signIn`, {
    method: 'POST',
    body: JSON.stringify(requestData.body),
    headers: {
      'Content-type': 'application/json'
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw Error(data.message || response.statusText)
  }
}

const signUp =  async(requestData: RequestData<{fullName: string, role: string, password: string, email: string}>) => {
  const response = await fetch(`${API_URL}/signUp`, {
    method: 'POST',
    body: JSON.stringify(requestData.body),
    headers: {
      'Content-type': 'application/json'
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw Error(data.message || response.statusText)
  }
}

export { getAllUsers,removeUser, signIn, signUp, getUser, updateUser, addUser };