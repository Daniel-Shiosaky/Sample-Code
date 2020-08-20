import { getEnvParams } from './envTools';

export function navigate(customUrl, useReseller) {
  const { url, urlReseller } = getEnvParams();
  if (useReseller) {
    cy.visit(urlReseller + (customUrl || ''));
  } else {
    cy.visit(url + (customUrl || ''));
  }
}
