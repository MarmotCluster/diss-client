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
  scan4: `/scan_sqlinjection`,
  cancel: `/scan_cancel`,
  SEARCH: {
    result: `/result_data`,
  },
  list: `/lists`,
};

export default API;
