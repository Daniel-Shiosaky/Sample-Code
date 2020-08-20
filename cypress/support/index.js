// You can read more here:
// https://on.cypress.io/configuration

import './commands';

Cypress.Cookies.defaults({
  whitelist: ['auth_idp', 'info_idp', 'pwinteraction', '_dismissedBDF', 'market', 'currency', '_policy']
});

/* -
auth_idp is the main cookie used by products to determine actual auth state and user identity. However, it's not available client side.
info_idp was created as the client side version for display purposes.
pwinteraction suppresses the "this site uses cookies" message.
-*/
