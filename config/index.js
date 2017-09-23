const path = require('path');
const config = require('config');

const rxntConfig = config.get('rxntConfig');

const defaults = {
  root: path.join(__dirname, '/..'),
};

if (!process.env.NODE_ENV) { console.log('loading default.json config because no NODE_ENV was provided. Please verify this is correct.'); } else { console.log(`loading config for: ${JSON.stringify(process.env.NODE_ENV)} environment. Please verify this is correct.`); }


module.exports = Object.assign(defaults, rxntConfig);
