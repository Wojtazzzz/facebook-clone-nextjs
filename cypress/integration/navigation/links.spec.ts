const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');


describe('Navigation links', () => {
    beforeEach(() => {
        cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrf');
        cy.intercept('POST', `${BACKEND_URL}/login`).as('login');

        cy.visit('/login');

        cy.get('input[name="email"]').type(TEST_EMAIL);
        cy.get('input[name="password"]').type(TEST_PASSWORD);

        cy.get('button[type="submit"]').click();

        cy.wait('@csrf').then(() => {
            cy.wait('@login').then(() => {
                cy.url().should('eq', `${BASE_URL}/`);
            });
        });
    });

    afterEach(() => {
        cy.get('span').contains('This page isn\'t available').should('not.exist');
    });


    it('Check / redirect exists', () => {
        cy.visit('/marketplace');

        cy.get('nav > div[class="w-1/3 hidden md:block"]').within(() => {
            cy.get('a[aria-label="Home redirect"]').should('be.visible').click();
        });

        cy.url().should('eq', `${BASE_URL}/`);
    });

    it('Check /marketplace redirect exists', () => {
        cy.visit('/');

        cy.get('nav > div[class="w-1/3 hidden md:block"]').within(() => {
            cy.get('a[aria-label="Marketplace redirect"]').should('be.visible').click();
        });

        cy.url().should('eq', `${BASE_URL}/marketplace`);
    });

    it('Check /profile redirect exists', () => {
        cy.visit('/');

        cy.wait(1000); // waiting for fetch user data

        cy.get('nav > div[class="w-1/3 hidden md:block"]').within(() => {
            cy.get('a[aria-label="User profile redirect"]').should('be.visible').click();
        });

        cy.wait(10000); // waiting for fetch user data

        cy.url().should('eq', `${BASE_URL}/profile/1`);
    });
});

export { };