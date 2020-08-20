// <reference types="Cypress" />

before(() => {
  cy.login();
});

beforeEach(() => {
  cy.setupApiMocks();
  cy.stubProductGroups('businessRegistration');
  cy.stubEmptyQueryService();
  cy.stubSubscriptionsApi('domainProducts-all-products');
  cy.getPseudoLocalization();
  cy.localizationSetup('qa-PS');
  cy.navigate();
});

describe('Domain Products Section #godaddy #localization', function () {

  it.skip('checks that Domain Products Card is displayed ', function () {
    cy.get('@pseudoLocalization').then(messages => {
      cy.get('#Domain-Products')
        .should('be.visible')
        .and('contain', messages['groupTitle.domainProducts']);

      cy.get('#Domain-Products')
        .should('be.visible')
        .and('contain', 'Business Registration')
        .and('contain', 'Premium DNS monthly')
        .and('contain', messages['groupTitle.domainBackordering'])
        .and('contain', 'Auctions Membership');

      cy.get('.btn_options')
        .should('have.text', messages.optionsButton);

      cy.get(':nth-child(2) > .col-sm-12 > .row > .col-xs-12 > .btn')
        .should('contain', messages.manageButton);
    });
  });
});
