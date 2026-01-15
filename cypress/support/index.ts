declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
      searchInput(): Chainable<JQuery<HTMLInputElement>>
      listingContainer(): Chainable<JQuery<HTMLElement>>
      loader(): Chainable<JQuery<HTMLElement>>
      error(): Chainable<JQuery<HTMLElement>>
      profileListItem(): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('searchInput', () => {
  return cy.get('input._searchInput_1nt7h_1')
})

Cypress.Commands.add('listingContainer', () => {
  return cy.get('._container_k18rm_1')
})

Cypress.Commands.add('loader', () => {
  return cy.get('._loader_vo7ua_1')
})

Cypress.Commands.add('error', () => {
  return cy.get('._error_62oy0_27')
})

Cypress.Commands.add('profileListItem', () => {
  return cy.get('._container_xycei_1')
})

export { };