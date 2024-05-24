// const HOST = 'http://localhost:3200';
// export const BASE_URL = `${HOST}/api/v1/app/`;
export const BASE_URL = import.meta.env.VITE_API_URL || '/';
export default BASE_URL;
