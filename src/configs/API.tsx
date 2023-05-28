const API = {
  AUTH: {
    login: `/login`,
    register: `/register`,
    refresh: `/refresh-api`,
  },
  USER: {
    me: `/get-me`,
  },
  scan: `/scan_injection`,
  scan2: `/scan_traversal`,
  scan3: `/scan_command`,
  SEARCH: {
    result: `/result_data`,
  },
};

export default API;
