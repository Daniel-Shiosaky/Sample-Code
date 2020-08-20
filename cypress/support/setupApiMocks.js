export function setupApiMocks() {
  cy.server();
  // any shared api mocks for integration tests go here
}

export function stubProductGroups(groupKey, count = 1) {
  cy.route({
    method: 'GET',
    url: /platapi\/v1\/subscriptions\/productGroups\?/,
    status: 200,
    response: [{ productGroupKey: groupKey, subscriptionCount: count }]
  });
}

export function stubEmptyQueryService() {
  cy.route({
    method: 'GET',
    url: /entitlements\/getEntitlementCountByProductFamily/,
    status: 200,
    response: []
  });
  cy.route({
    method: 'GET',
    url: /subscriptions\/getSubscriptions/,
    status: 200,
    response: []
  });
}

function stubSubsApi(data) {
  cy.route({
    method: 'GET',
    url: /platapi\/v1\/subscriptions\?/,
    status: 200,
    response: { subscriptions: data }
  });
}

function stubFCapi() { // stub free credits api
  cy.route({
    method: 'GET',
    url: /products\/api/,
    status: 200,
    response: [{
      subscriptionId: '274369:536',
      parent: 'Reseller Plan 274369 (prog_id: 274369) -  Online Store - Monthly',
      parentType: '56',
      productName: 'Website Builder',
      productPfid: 958799
    },
    {
      subscriptionId: '274370:536',
      parent: 'Reseller Plan 274370 (prog_id: 274370) -  Online Store - Monthly',
      parentType: '56',
      productName: 'Website Builder',
      productPfid: 958799
    }]
  });
}
function mwpApi(data) {

  cy.route({
    method: 'GET',
    url: /mwpapi\/api\/v1\/mwp\/sites/,
    status: 200,
    response: data
  });
}
function mwp2Api(data) {

  cy.route({
    method: 'GET',
    url: /mwp2api\/api\/v1\/mwp\/sites/,
    status: 200,
    response: data
  });
}


function stubRaa(data) {
  cy.route({
    method: 'GET',
    url: /platapi\/v1\/domains\?/,
    status: 200,
    response: data
  });
}

// cypress handles the async/awaiting for us
export function stubSubscriptionsApi(fileNameOrArray) {
  if (typeof (fileNameOrArray) === 'string') {
    cy.fixture('subscriptions/' + fileNameOrArray).then(data => {
      stubSubsApi(data);
    });
  } else {
    stubSubsApi(fileNameOrArray);
  }
}

export function stubFreeCreditsApi(fileNameOrArray) {
  if (typeof (fileNameOrArray) === 'string') {
    cy.fixture('subscriptions/' + fileNameOrArray).then(data => {
      stubFCapi(data);
    });
  } else {
    stubFCapi(fileNameOrArray);
  }

}

export function stubRaaApi(fileNameOrArray) {
  if (typeof (fileNameOrArray) === 'string') {
    cy.fixture('subscriptions/' + fileNameOrArray).then(data => {
      stubRaa(data);
    });
  } else {
    stubRaa(fileNameOrArray);
  }
}

export function stubTrademarkApi(domains) {

  const response = domains.map(function (domain, index) {
    return {
      id: index,
      enabled: true,
      name: domain,
      nextCapture: 1562684456,
      owner: ' ',
      title: domain
    };
  });

  cy.route({
    method: 'GET',
    url: /trademarkapi/,
    status: 200,
    response
  });
}
export function stubMwp2Api(fileNameOrArray) {
  if (typeof (fileNameOrArray) === 'string') {
    cy.fixture('subscriptions/' + fileNameOrArray).then(data => {
      mwpApi(data);
      mwp2Api(data);
    });
  } else {
    mwpApi(fileNameOrArray);
    mwp2Api(fileNameOrArray);
  }
}
