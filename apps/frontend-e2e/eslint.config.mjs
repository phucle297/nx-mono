import cypressConfig from '../../tools/eslint-config/cypress.mjs';
import baseConfig from '../../eslint.config.mjs';

export default [...baseConfig, ...cypressConfig];
