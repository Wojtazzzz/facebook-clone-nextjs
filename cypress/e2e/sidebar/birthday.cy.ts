import { useDatabaseMigrations } from 'cypress-laravel';

describe('Birthdays tests', () => {
    useDatabaseMigrations();

    const ISODate = new Date().toISOString();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('see that no one has birthday today', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/birthdays').as('birthdays');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@birthdays');

        cy.get('[data-testid="birthdays"]').within(() => {
            cy.contains('No one has birthdays today');
        });
    });

    it('see error message when api return error', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/birthdays', { statusCode: 500 }).as('birthdays');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@birthdays');

        cy.get('[data-testid="birthdays"]').within(() => {
            cy.contains('Something went wrong');
            cy.contains('Please try again later');
        });
    });

    it('see that one user has birthday, redirect to his profile by click on his name', () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
            born_at: ISODate,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/birthdays').as('birthdays');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@birthdays');

        cy.get('[data-testid="birthdays"]').within(() => {
            cy.contains("John Doe's birthday is today.");
            cy.contains('John Doe').click();
        });

        cy.url().should('contain', '/profile/2');
    });

    it('see that two users has birthday, redirect to their profiles by click on names', () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
            born_at: ISODate,
        });

        cy.createUser(1, true, {
            first_name: 'Adam',
            last_name: 'Walker',
            born_at: ISODate,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/birthdays').as('birthdays');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@birthdays');

        cy.get('[data-testid="birthdays"]').within(() => {
            cy.contains("John Doe and Adam Walker's birthday is today.");
            cy.contains('John Doe').click();
        });

        cy.url().should('contain', '/profile/2');

        cy.visit('/');

        cy.get('[data-testid="birthdays"]').within(() => {
            cy.contains('Adam Walker').click();
        });

        cy.url().should('contain', '/profile/3');
    });

    it('see that more than two users has birthday, redirect to their profiles by click on names', () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
            born_at: ISODate,
        });

        cy.createUser(1, true, {
            first_name: 'Adam',
            last_name: 'Walker',
            born_at: ISODate,
        });

        cy.createUser(1, true, {
            first_name: 'Will',
            last_name: 'Taylor',
            born_at: ISODate,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/birthdays').as('birthdays');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@birthdays');

        cy.get('[data-testid="birthdays"]').within(() => {
            cy.contains("John Doe, Adam Walker and 1 more's birthday is today.");
            cy.contains('John Doe').click();
        });

        cy.url().should('contain', '/profile/2');

        cy.visit('/');

        cy.get('[data-testid="birthdays"]').within(() => {
            cy.contains('Adam Walker').click();
        });

        cy.url().should('contain', '/profile/3');
    });
});
