import cypressConfig from '../../libs/eslint-config/cypress.mjs';
import baseConfig from '../../eslint.config.mjs';

export default [...baseConfig, ...cypressConfig];
