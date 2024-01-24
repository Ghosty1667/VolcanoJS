import { useEffect, useState } from "react";

const API_URL = process.env.API_URL;

export function useVolcanoes(country, populatedWithin) {
  const [loading, setLoading] = useState(true);
  const [volcanoData, setVolcanoData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVolcanoesByQuery(country, populatedWithin)
      .then((volcanoes) => {
        setVolcanoData(volcanoes);
        setLoading(false);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [country, populatedWithin]);

  return {
    loading,
    volcanoData,
    error
  };
}

function getVolcanoesByQuery(country, populatedWithin) {
  let url = `${API_URL}/volcanoes?country=${country}`
  if (populatedWithin) {
    url += `&populatedWithin=${populatedWithin}`
  }
  return (
    fetch(url)
      .then(res => res.json())
      .then(data => data.map(volcanoes => {
        return {
          id: volcanoes.id,
          name: volcanoes.name,
          country: volcanoes.country,
          region: volcanoes.region,
          subregion: volcanoes.subregion
        };
      })
      ))
}

export function useVolcano(id) {
  const [loading, setLoading] = useState(true);
  const [volcanoData, setVolcanoData] = useState({});
  const [error, setError] = useState(null);
  const [login] = useState(localStorage.getItem("token") !== null ? true : false)

  let url = `${API_URL}/volcano/${id}`

  useEffect(() => {
    getVolcanoByQuery(url, login)
      .then((volcanoes) => {
        setVolcanoData(volcanoes);
        setLoading(false);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, []);

  return {
    loading,
    volcanoData,
    error,
    login
  };
}

function getVolcanoByQuery(url, login) {

  if (login === true) {

    const token = localStorage.getItem("token")
    console.log(`It was here PogChamp: ${token}`)
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
    return (fetch(url, { headers })
      .then(res => res.json())
    )
  }
  else {
    console.log("It was here")
    return (fetch(url)
      .then(res => res.json()))
  }
}




export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    getCountriesByQuery()
      .then((countries) => {
        setCountries(countries);
      })
      .catch((err) => setError(err.message));
  }, []);

  return {
    countries,
    error
  };
}


function getCountriesByQuery() {
  return (
    fetch(`${API_URL}/countries`)
      .then(res => res.json()))
}

export function postLogin(email, password) {
  const query = `${API_URL}/user/login`
  return fetch(query,
    {
      method: "POST",
      headers: { accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    })
}

export function postRegister(email, password) {
  const query = `${API_URL}/user/register`
  return fetch(query,
    {
      method: "POST",
      headers: { accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    })
}