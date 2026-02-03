export const apiConf = {
  admin: {
    login: process.env.ADMIN_LOGIN || "admin",
    password: process.env.ADMIN_PASSWORD || "admin",
  },
  endpoint:
    process.env.API_ENDPOINT ||
    "https://697f3761d1548030ab656fb6.mockapi.io",
};
