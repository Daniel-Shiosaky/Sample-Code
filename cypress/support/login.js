import { getEnvParams } from './envTools';

const cacheFileName = './cypress/credentialCache.json';

function setCookies(domain, data, infotoken) {
  return cy.setCookie('auth_idp', data, {
    domain,
    path: '/',
    expiry: new Date().getTime() + 86400,
    httpOnly: true,
    secure: true
  }).setCookie('info_idp', infotoken, {
    domain,
    path: '/',
    expiry: new Date().getTime() + 86400
  }).setCookie('pwinteraction', 'Wed,%2023%20May%202018%2020:20:10%20GMT', { // this supresses the "this site uses cookies" notification
    name: 'pwinteraction',
    value: 'Wed,%2023%20May%202018%2020:20:10%20GMT',
    expiry: new Date().getTime() + 86400,
    domain,
    path: '/',
    secure: true
  }).setCookie('_dismissedBDF', 'true', { // this suppresses the "your browser is too old" modal
    name: '_dismissedBDF',
    value: 'true',
    domain,
    expiry: new Date().getTime() + 86400,
    path: '/',
    secure: false
  }).setCookie('market', 'en-US', {
    name: 'market',
    value: 'en-US',
    expiry: new Date().getTime() + 86400,
    path: '/',
    domain
  }).setCookie('currency', 'USD', {
    name: 'currency',
    value: 'USD',
    expiry: new Date().getTime() + 86400,
    path: '/',
    domain
  }).setCookie('_policy', '%7B%22restricted_market%22:false,%22tracking_market%22:%22none%22%7D', {
    name: '_policy',
    value: '%7B%22restricted_market%22:false,%22tracking_market%22:%22none%22%7D',
    expiry: new Date().getTime() + 86400,
    path: '/',
    domain
  });
}

export function login(profileName, useReseller) {
  profileName = profileName || 'generic';
  const privateLabel = (useReseller && 'reseller') || 'godaddy';
  const { envName, prefix } = getEnvParams();
  let url = `https://sso.${prefix}test.com/v1/api/token`, domain = `.${prefix}test.com`;
  if (privateLabel === 'reseller') {
    url = `https://sso.${prefix}test.net/v1/api/token`;
    domain = `.${prefix}test.net`;
  }

  return cy.readFile(cacheFileName, 'utf8', 100).then(cacheFile => {
    let cache = { created: new Date().toString(), creds: {} }; // define brand new cache
    if (cacheFile && cacheFile.creds && cacheFile.created) {
      const then = new Date(cacheFile.created);
      const now = new Date();
      const oneHourMilliseconds = 60 * 60 * 1000;
      if (now - then < oneHourMilliseconds) {
        // the cache on file is recent, use it instead of the new one
        cache = cacheFile;
      }
    }

    // we now have a cache, either brand new or recently on file
    if (cache.creds[envName] && cache.creds[envName][privateLabel] && cache.creds[envName][privateLabel][profileName]) {
      // our cache has credentials for this acct, use them
      const { data, infotoken } = cache.creds[envName][privateLabel][profileName];
      return setCookies(domain, data, infotoken);
    }
    // cache has nothing for this acct, send an SSO token request
    return cy.fixture('users').then(data => {
      const { name, password } = data[envName][privateLabel][profileName];
      return cy.request({
        method: 'POST',
        url,
        form: true,
        body: 'username=' + name + '&password=' + password + '&realm=idp&infotoken=true'
      }, { timeout: Cypress.env('longTimeout') }).then((response) => {
        const { data, infotoken } = response.body;
        cache.creds[envName] = cache.creds[envName] || {};
        cache.creds[envName][privateLabel] = cache.creds[envName][privateLabel] || {};
        cache.creds[envName][privateLabel][profileName] = { data, infotoken };
        cy.writeFile(cacheFileName, cache, 'utf8'); // write the cache with the new credential entry
        return setCookies(domain, data, infotoken);
      });
    });

  });
}
