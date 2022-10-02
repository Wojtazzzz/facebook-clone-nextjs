import { useDatabaseMigrations } from 'cypress-laravel';

describe('Profile intro tests', () => {
    useDatabaseMigrations();

    it("visit friend's profile, check intro section shows all required data", () => {
        cy.loginRequest();

        cy.visit('/profile/1');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.get('[data-testid="asideInfo-intro"]').within(() => {
            cy.get('[aria-label="Works at"]').should('contain.text');
            cy.get('[aria-label="Went to"]').should('contain.text');
            cy.get('[aria-label="Lives in"]').should('contain.text');
            cy.get('[aria-label="From"]').should('contain.text');
            cy.get('[aria-label="Joined on"]').should('contain.text');
            cy.get('[aria-label="Marital status"]').should('contain.text');
        });
    });
});
