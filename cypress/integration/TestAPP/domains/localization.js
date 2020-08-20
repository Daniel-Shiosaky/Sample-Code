// <reference types='Cypress' />

before(() => {
  cy.login();
});

beforeEach(() => {
  cy.setupApiMocks();
  cy.stubProductGroups('domains');
  cy.stubEmptyQueryService();
  cy.stubSubscriptionsApi('single-domain');
  cy.getSpanishLocale();
  cy.localizationSetup('es-US');
  cy.navigate();
});

describe('domain section #godaddy #localization', function ()  {
  it.skip('displays the domain section with correct Translation', function () {
    cy.get('#Domains')
      .should('be.visible')
      .and('contain', this.spanish.domains.charAt(0).toUpperCase() + this.spanish.domains.slice(1));

    cy.get('.nav-text')
      .should('be.visible')
      .and('contain', this.spanish.manageAllLink);

    cy.get('.btn_dns')
      .should('be.visible')
      .and('contain', this.spanish.dnsButton);

    cy.get('.manage-setup')
      .should('be.visible')
      .and('contain', this.spanish.manageButton);

    cy.get('.btn_protection')
      .should('be.visible')
      .and('contain', 'Agrega protección');
    // .and('contain', this.spanish.addProtectionButton); // localization string is different from the one in the UI
  });
});
