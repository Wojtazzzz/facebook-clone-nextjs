import { useDatabaseMigrations } from 'cypress-laravel';

describe('Profile intro tests', () => {
    useDatabaseMigrations();

    it('visit self profile, check intro section is visible and shows all required data', () => {
        cy.loginRequest({
            works_at: 'Simple company',
            went_to: 'Simple uniwersity',
            lives_in: 'Simple city',
            from: 'Simple town',
            marital_status: 'Widowed',
            created_at: '2016-07-17 04:48:13',
        });

        cy.visit('/profile/1');

        cy.intercept('/api/user').as('user');
        cy.reload();
        cy.wait('@user');

        cy.get('[data-testid="profile-intro"]')
            .should('be.visible')
            .within(() => {
                cy.get('[aria-label="Works at"]')
                    .should('be.visible')
                    .should('contain.text', 'Works at Simple company');
                cy.get('[aria-label="Went to"]')
                    .should('be.visible')
                    .should('contain.text', 'Went to Simple uniwersity');
                cy.get('[aria-label="Lives in"]').should('be.visible').should('contain.text', 'Lives in Simple city');
                cy.get('[aria-label="From"]').should('be.visible').should('contain.text', 'From Simple town');
                cy.get('[aria-label="Joined on"]').should('be.visible').should('contain.text', 'Joined on July 2016');
                cy.get('[aria-label="Marital status"]').should('be.visible').should('contain.text', 'Widowed');
            });
    });
});
