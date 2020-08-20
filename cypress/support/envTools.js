export function getEnvParams() {
  const envConfig = Cypress.env('envParams'); // values from cypress.json
  const envKey = Cypress.env('envKey'); // env var set during command execution
  const params = envConfig[envKey];
  return params;
}

export function isDeepSeeEnabled() {
  return new Cypress.Promise(resolve => {
    cy.get('#app').then(() => { // make sure the root component is mounted before trying to get config
      const Config = Cypress.env('my-products-config'); // this is set by the application, in pages/products componentDidMount
      resolve(Config && Config.appConfig && Config.appConfig.DeepSee);
    });
  });
}
