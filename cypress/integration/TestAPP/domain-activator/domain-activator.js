// <reference types='Cypress' />

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
  cy.navigate();
});

describe('[CXAP-644] domain activator section #godaddy', () => {
  it('displays the domain activator', () => {
    cy.get('.domain-activator')
      .should('be.visible');
  });

  it('displays the four buttons', () => {
    cy.get('.clickable')
      .contains('Build a website')
      .should('be.visible');

    cy.get('.clickable')
      .contains('Set up an email account')
      .should('be.visible');

    cy.get('.clickable')
      .contains('Connect to an existing site')
      .should('be.visible');

    cy.get('.clickable')
      .contains('Add Privacy')
      .should('be.visible');
  });

  it('[CXAP-660] redirects correctly when clicking on website builder', () => {
    cy.get('.clickable')
      .contains('Build a website')
      .click();

    cy.url()
      .should('contain', 'dcc')
      .and('contain', 'activator');
  });

  it('redirects correctly when clicking on email', () => {
    cy.get('.clickable')
      .contains('Set up an email account')
      .click();

    cy.url()
      .should('contain', 'dcc')
      .and('contain', 'setup/email');
  });

  it('redirects correctly when clicking on existing site', () => {
    cy.get('.clickable')
      .contains('Connect to an existing site')
      .click();

    cy.url()
      .should('contain', 'dcc')
      .and('contain', 'setup/forwarding');
  });

  it('[CXAP-661] redirects correctly when clicking on privacy', () => {
    cy.get('.clickable')
      .contains('Add Privacy')
      .click();

    cy.url()
      .should('contain', 'dcc')
      .and('contain', 'manage');
  });
});
