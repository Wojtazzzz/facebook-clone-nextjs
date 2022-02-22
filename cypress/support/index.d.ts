// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command definition for cy.waitUntil()
/// <reference types="cypress-wait-until" />

// typically custom commands are added in this support folder
// so it makes sense to put their TypeScript definitions here
// from the JavaScript specs loads this file using
// the triple slash "reference" comment like this:
//
// /// <reference path="../support/index.d.ts" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * Login process
		 */
		loginAndWaitForRequests(email: string, password: string, statusCode?: 204 | 422): Chainable<Element>;

		/**
		 * Clear database and create test user
		 */
		prepareDatabase(): Chainable<Element>;

		/**
		 * Check for user request from api
		 */
		checkUserRequest(alias: string, statusCode?: 200 | 401): Chainable<Element>;

		clickButtonAndExpectMessage(buttonTitle: string, message: string, route: 'accept' | 'reject', statusCode: 200 | 422): Chainable<Element>;
	}
}
