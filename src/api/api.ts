import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://ec2-52-79-187-32.ap-northeast-2.compute.amazonaws.com/api/'
    : '/api';

const logOnDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

const api = axios.create({
  baseURL: BASE_URL,
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;

  const token = localStorage.getItem('token');

  config.headers.Authorization = token;

  logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request`);

  return Promise.resolve(config);
};

const onResponse = (response: AxiosResponse): AxiosResponse['data'] => {
  const { config, status } = response;

  logOnDev(
    `[API] ${config.method?.toUpperCase()} ${config.url} | Response ${status}`,
  );

  const token = response.headers.authorization;

  if (token) {
    localStorage.setItem('token', token);
  }

  return response.data;
};

const onError = (error: AxiosError | Error): AxiosResponse['data'] | Error => {
  if (axios.isAxiosError(error) && error.response) {
    const { message } = error;
    const { method, url } = error.config as AxiosRequestConfig;
    const { status, statusText } = error.response as AxiosResponse;

    logOnDev(
      `[API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}\n`,
    );
    logOnDev(
      `${error.response.data.result.result_code} | ${error.response.data.result.result_message}`,
    );

    return error.response.data;
  }

  throw new Error();
};

const setUpInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponse, onError);

  return instance;
};

export default setUpInterceptors(api);
