// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
import { login } from './login';
import { navigate } from './navigation';
import {
  setupApiMocks,
  stubProductGroups,
  stubEmptyQueryService,
  stubSubscriptionsApi,
  stubFreeCreditsApi,
  stubRaaApi,
  stubTrademarkApi,
  stubMwp2Api
} from './setupApiMocks';
import { localizationSetup, getPseudoLocalization } from './localizationSetup';
import { testManageButton, testOptionsButton, testManageAllLink, testSetupButton } from './testButtons';

Cypress.Commands.add('login', login);
Cypress.Commands.add('navigate', navigate);

Cypress.Commands.add('setupApiMocks', setupApiMocks);
Cypress.Commands.add('stubProductGroups', stubProductGroups);
Cypress.Commands.add('stubEmptyQueryService', stubEmptyQueryService);
Cypress.Commands.add('stubSubscriptionsApi', stubSubscriptionsApi);
Cypress.Commands.add('stubRaaApi', stubRaaApi);
Cypress.Commands.add('stubFreeCreditsApi', stubFreeCreditsApi);
Cypress.Commands.add('stubTrademarkApi', stubTrademarkApi);
Cypress.Commands.add('stubMwp2Api', stubMwp2Api);

Cypress.Commands.add('localizationSetup', localizationSetup);
Cypress.Commands.add('getPseudoLocalization', getPseudoLocalization);

Cypress.Commands.add('testManageButton', testManageButton);
Cypress.Commands.add('testOptionsButton', testOptionsButton);
Cypress.Commands.add('testManageAllLink', testManageAllLink);
Cypress.Commands.add('testSetupButton', testSetupButton);
