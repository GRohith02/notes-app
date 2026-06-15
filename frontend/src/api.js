const API_URL = "https://localhost:7215/api";

export const register = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res;
};

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res;
};

export const getNotes = async (token) => {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
};

export const addNote = async (token, title, content) => {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  return res.json();
};

export const deleteNote = async (token, id) => {
  await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
};