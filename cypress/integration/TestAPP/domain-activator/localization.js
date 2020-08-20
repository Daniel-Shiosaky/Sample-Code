// <reference types="Cypress" />

before(() => {
  cy.login();
});

beforeEach(() => {
  cy.setupApiMocks();
  cy.stubProductGroups('domains');
  cy.stubEmptyQueryService();
  cy.stubSubscriptionsApi('domain-activator-domain');
  cy.route({
    method: 'POST',
    url: /dccapi\/api\/v4\/domains\/get/,
    status: 200,
    response: {
      domains: [
        {
          id: 23027526,
          name: 'fgrthrydjtfkugilhkyjthregwq.info',
          internationalDisplayName: 'fgrthrydjtfkugilhkyjthregwq.info',
          expirationDate: '2019-09-18T21:06:38',
          activated: false,
          hosting: 'parked',
          email: 'none'
        }
      ]
    }
  });
  cy.getPseudoLocalization();
  cy.localizationSetup('qa-PS');
  cy.navigate();
});

describe('Domain Activator Localization', function () {
  it('displays domain activator with correct button text', () => {
    cy.get('.domain-activator')
      .should('be.visible');

    cy.get('@pseudoLocalization').then(messages => {
      cy.get('.clickable')
        .contains(messages.buildWebsite)
        .should('be.visible');

      cy.get('.clickable')
        .contains(messages.getEmailAccount)
        .should('be.visible');

      cy.get('.clickable')
        .contains(messages.connectExistingSite)
        .should('be.visible');

      cy.get('.clickable')
        .contains(messages.addPrivacyButton)
        .should('be.visible');
    });
  });
});
