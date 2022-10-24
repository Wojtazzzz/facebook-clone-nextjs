import { useDatabaseMigrations } from 'cypress-laravel';

describe('Profile intro tests', () => {
    useDatabaseMigrations();

    it("visit friend's profile, check intro section shows all required data", () => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');

        cy.visit('/profile/1');

        cy.wait('@user');

        cy.injectAxe();

        cy.get('[data-testid="asideInfo-intro"]').within(() => {
            cy.get('[aria-label="Works at"]').should('contain.text', 'Works at');
            cy.get('[aria-label="Went to"]').should('contain.text', 'Went to');
            cy.get('[aria-label="Lives in"]').should('contain.text', 'Lives in');
            cy.get('[aria-label="From"]').should('contain.text', 'From');
            cy.get('[aria-label="Joined on"]').should('contain.text', 'Joined on');
            cy.get('[aria-label="Marital status"]').should('not.be.empty');
        });

        cy.checkPageA11y();
    });
});
