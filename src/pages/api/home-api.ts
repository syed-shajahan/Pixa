import axios from "axios";
import { IpropsData } from "../../utils/types/types";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export const fetchPixaApi = async ({ pageParam = 1 }): Promise<IpropsData[]> => {
  const accessKey = process.env.REACT_APP_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("REACT_APP_ACCESS_KEY is not defined");
  }

  const API_URL = `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${pageParam}`;
  const { data } = await axios.get(API_URL);
  return data;
};

