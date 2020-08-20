import { getEnvParams } from './envTools';

export function localizationSetup(locale) {
  const { prefix } = getEnvParams();
  cy.clearCookie('location');
  cy.setCookie('location', locale, {
    domain: `.${prefix}test.com`,
    path: '/'
  });
}

export function getPseudoLocalization() {
  cy.readFile('locales/qa-PS.json').as('pseudoLocalization');
}
