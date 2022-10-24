const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        mongodb_username: "admin",
        mongodb_password: "admin",
        mongodb_clustername: "cluster0",
        mongodb_database: "test",
      },
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: "admin",
      mongodb_password: "admin",
      mongodb_clustername: "cluster0",
      mongodb_database: "test",
    },
  };
};
