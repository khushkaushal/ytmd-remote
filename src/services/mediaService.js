import axios from "axios";

export async function getTrack(url) {
  const response = await axios.get(`${url}/query/track`);
  return response.data
}

export async function getPlayer(url) {
  const response = await axios.get(`${url}/query/player`);
  return response.data
}
