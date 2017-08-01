import path from 'path';

const env = process.env.DeploymentEnv || 'development';

const config = require(`./${env}`); // eslint-disable-line import/no-dynamic-require

const defaults = {
  root: path.join(__dirname, '/..'),
};

export default Object.assign(defaults, config);
