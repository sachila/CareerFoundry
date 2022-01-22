import axios, { AxiosResponse } from "axios";

export const ApiUrl = "https://private-37dacc-cfcalendar.apiary-mock.com/";

export const UseRemote = () => {
  interface FetchOptions {
    headers?: Record<string, string>;
  }
  interface GetOptions extends FetchOptions {}

  const getJsonHeaders = (
    extras: Record<string, string> = {
      "Content-Type": "application/json",
    }
  ) => {
    return {
      ...extras,
    };
  };

  // type ResponseError = string;
  const handleResponse = async <T>(
    response: AxiosResponse<T>,
    options: FetchOptions = {}
  ): Promise<T> => {
    if (!response) return Promise.reject(`Unexpected error`);

    const data: T = response?.data;

    return Promise.resolve(data);
  };

  const fetchPost = <REQUEST, RESPONSE>(
    url: string,
    body: REQUEST
  ): Promise<RESPONSE> => {
    const requestOptions = {
      headers: getJsonHeaders(),
    };

    return axios
      .post(url, body, requestOptions)
      .then((response) => handleResponse<RESPONSE>(response, requestOptions));
  };
  const fetchPatch = <REQUEST, RESPONSE>(
    url: string,
    body: REQUEST
  ): Promise<RESPONSE> => {
    const requestOptions = {
      headers: getJsonHeaders(),
    };

    return axios
      .patch(url, body, requestOptions)
      .then((response) => handleResponse<RESPONSE>(response, requestOptions));
  };

  function fetchGet<RESPONSE>(
    url: string,
    options: GetOptions = {}
  ): Promise<RESPONSE> {
    const requestOptions = {
      headers: getJsonHeaders(options.headers),
    };

    return axios
      .get(url, requestOptions)
      .then((response) => handleResponse<RESPONSE>(response, requestOptions));
  }

  function fetchDelete<RESPONSE>(
    url: string,
    options: GetOptions = {}
  ): Promise<RESPONSE> {
    const requestOptions = {
      headers: getJsonHeaders(options.headers),
    };

    return axios
      .delete(url, requestOptions)
      .then((response) => handleResponse<RESPONSE>(response, requestOptions));
  }

  return {
    fetchPost,
    fetchPatch,
    fetchGet,
    fetchDelete,
  };
};
