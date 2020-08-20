// <reference types="Cypress" />

before(() => {
  cy.login();
});

beforeEach(() => {
  cy.setupApiMocks();
  cy.stubProductGroups('businessRegistration');
  cy.stubEmptyQueryService();
  cy.stubSubscriptionsApi('domainProducts-all-products');
  cy.navigate();
});

describe('Domain Products Section #godaddy', () => {

  it('displays the products inside the card correctly', () => {
    cy.get('#Domain-Products')
      .should('be.visible')
      .and('contain', 'Business Registration')
      .and('contain', 'Premium DNS monthly')
      .and('contain', 'Domain Backorder')
      .and('contain', 'Auctions Membership');
  });

  it('redirects to the correct url when clicking manage for Business Registration', () => {
    const buttonElement = ':nth-child(2) > .col-sm-12 > .row > .col-xs-12 > .btn';
    const urlString1 = 'https://directory';
    const urlString2 = '';
    // clicks the Manage button
    cy.testManageButton(buttonElement, urlString1, urlString2);
  });

  it('redirects to the correct url when clicking manage button for Premium DNS Monthly', () => {
    const buttonElement = ':nth-child(3) > .col-sm-12 > .row > .col-xs-12 > .manage-setup';
    const urlString1 = 'https://dcc';
    const urlString2 = '';
    // clicks the Manage button
    cy.testManageButton(buttonElement, urlString1, urlString2);
  });

  it('redirects to the correct url when clicking manage for Domain Backorder', () => {
    const buttonElement = ':nth-child(4) > .col-sm-12 > .row > .col-xs-12 > .btn';
    const urlString1 = 'https://dcc';
    const urlString2 = '';
    // clicks the Manage button
    cy.testManageButton(buttonElement, urlString1, urlString2);
  });

  it('redirects to the correct url when clicking manage for Auctions Membership', () => {
    const buttonElement = ':nth-child(5) > .col-sm-12 > .row > .col-xs-12 > .btn';
    const urlString1 = 'https://auctions';
    const urlString2 = '';
    // clicks the Manage button
    cy.testManageButton(buttonElement, urlString1, urlString2);
  });
});
