import { baseUrl } from "./consts";
// const baseUrl = "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    const data = res.json();
    return data;
  } else {
    return Promise.reject(res);
  }
}

const getReadingsFromDb = async () => {
  const res = await fetch(
    `${baseUrl}/readings`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  });
  return checkResponse(res);
}

const getForecast = async () => {
  const res = await fetch(
    `${baseUrl}/forecast`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  });
  return checkResponse(res);
}

export { getReadingsFromDb, getForecast };