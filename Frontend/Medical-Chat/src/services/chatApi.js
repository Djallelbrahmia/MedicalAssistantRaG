import axios from "axios";
import { API_BASE } from "../utils/constants";

export async function startChat() {
  try {
console.log(`${API_BASE}/start_chat`);
    const res = await axios.get(`${API_BASE}/start_chat`);
    return res.data; 
  } catch (err) {
    throw new Error("Failed to start chat");
}
}

export async function sendMessage(message, token) {
  try {
    const res = await axios.post(
      `${API_BASE}/chat`,
      { message },
      {
        headers: {
          Authorization: token, 
        },
      }
    );
    return res.data; 
  } catch (err) {
        if (err.response && err.response.status === 401) {
        throw new Error("Unauthorized");
      }
        throw new Error( "Failed to send message");}
}

export async function clearHistory(token) {
  try {
    const res = await axios.post(
      `${API_BASE}/clear`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data; 
  } catch (err) {
      if (err.response && err.response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to clear history");
  }
}
export async function getChatHistory(token){
  try {
    const res = await axios.get(
      `${API_BASE}/history`,

      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data; 
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to get chat history");
  }
}

