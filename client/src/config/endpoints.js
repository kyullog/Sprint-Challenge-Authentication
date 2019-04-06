const baseUrl = "http://localhost:3300";

export default (endpoints = {
  register: `${baseUrl}/api/register`,
  login: `${baseUrl}/api/login`,
  jokes: `${baseurl}/api/jokes`
});
