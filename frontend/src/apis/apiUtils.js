import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1/";
const signIn = async () => {};

export const getAllUsers = async (token) => {
  try {
    const users = await axios.get(`${baseUrl}user/bulk`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return users;
  } catch (error) {
    return false;
  }
};
