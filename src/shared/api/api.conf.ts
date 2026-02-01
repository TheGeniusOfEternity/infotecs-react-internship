export const apiConf = {
  admin: {
    login: process.env.ADMIN_LOGIN || "admin",
    password: process.env.ADMIN_PASSWORD || "admin",
  },
  endpoint:
    process.env.API_ENDPOINT || "",
};
