import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');

describe('Navigation links tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('Home link redirects to home page, marketplace link redirects to marketplace page, profile link redirects to profile page, logo redirects to home page', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="desktop-navbar"]').within(() => {
            cy.get('[aria-label="Home page"]').click();
            cy.url().should('be.eq', `${APP_URL}/`);
        });

        cy.get('[data-testid="desktop-navbar"]').within(() => {
            cy.get('[aria-label="Marketplace page"]').click();
            cy.url().should('include', '/marketplace');
        });

        cy.get('[data-testid="desktop-navbar"]').within(() => {
            cy.get('[aria-label="Profile page"]').click();
            cy.url().should('include', '/profile/1');
        });

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[data-testid="nav-logo"]').click();
            cy.url().should('be.eq', `${APP_URL}/`);
        });
    });
});
