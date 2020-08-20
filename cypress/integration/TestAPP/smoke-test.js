import { getEnvParams } from '../../support/envTools';
const { prefix } = getEnvParams();

before(() => {
  cy.login('smoke-tester');
});

describe('GoDaddy smoke test #godaddy #smoke', () => {
  // eslint-disable-next-line max-statements
  it('checks that products page load', () => {
    cy.navigate();

    cy.url()
      .should('contain', prefix)
      .and('contain', 'godaddy.com');

    cy.contains('Home').should('be.visible'); // update test to use markup when deepSee header v1 gets released

    cy.get('.logo')
      .should('be.visible');

    cy.get('.nav-bottom')
      .should('be.visible')
      .and('contain', 'My Products');

    cy.get('#Websites')
      .should('be.visible');

    if (prefix === 'test-') {
      cy.get('#Websites_clickable')
        .click();
    }

    cy.get('#appheader-footer > .container')
      .should('be.visible');

    cy.get('#Managed-WordPress')
      .should('be.visible')
      .and('contain', 'Manage All');

    cy.get('#free-credits')
      .should('be.visible');
    cy.get('#undefined_clickable')
      .click();
    // skipping because it takes too long
    // cy.request('https://account.godaddy.com/products/api/free-credit').then((response) => {
    //    expect(response.status).to.eq(200)})
    // cy.get(':nth-child(1) > :nth-child(2) > .row')
    //   .should('be.visible')
    //   .and('contain', 'Redeem');

    cy.get('#Domains .manage-setup')
      .first()
      .click();

    cy.url()
      .should('contain', 'godaddy.com/manage');
  });
});
