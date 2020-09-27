'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
