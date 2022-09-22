import { useDatabaseMigrations } from 'cypress-laravel';

describe('Searching users tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('type something in input, see No Results, clear input by ClearButton', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users?search=Joh&page=1').as('searching');

        cy.visit('/');
        cy.wait('@user');

        cy.getNavSearch().within(() => {
            cy.get('input[aria-label="Search user"]').type('Joh');
            cy.wait('@searching');

            cy.contains('No Results');

            cy.get('[aria-label="Clear input"]').click();

            cy.get('input[aria-label="Search user"]').should('have.value', '');
        });
    });

    it('type friend firstname on input and see his firstname and username on results list, redirect to his profile by click on single result', () => {
        cy.create('User', {
            first_name: 'John',
            last_name: 'Doe',
        });

        cy.intercept('/api/user').as('user');
        cy.intercept(`/api/users?search=John&page=1`).as('searching');

        cy.visit('/');
        cy.wait('@user');

        cy.getNavSearch().within(() => {
            cy.get('input[aria-label="Search user"]').type('John');
            cy.wait('@searching');

            cy.contains('John Doe').click();

            cy.url().should('contain', '/profile/2');
        });
    });

    it('type "a", see 10 users, fetch second page of users by scrolling list to bottom, close results by click on another element', () => {
        cy.create('User', { first_name: 'Adam' });
        cy.create('User', { first_name: 'Adrian' });
        cy.create('User', { first_name: 'Agapetus' });
        cy.create('User', { first_name: 'Albert' });
        cy.create('User', { first_name: 'Alexander' });
        cy.create('User', { first_name: 'Alfred' });
        cy.create('User', { first_name: 'Andrew' });
        cy.create('User', { first_name: 'Angel' });
        cy.create('User', { first_name: 'Anthony' });
        cy.create('User', { first_name: 'Arkady' });
        cy.create('User', { first_name: 'Arthur' });
        cy.create('User', { first_name: 'Adrien' });
        cy.create('User', { first_name: 'Adalbert' });

        cy.intercept('/api/user').as('user');
        cy.intercept(`/api/users?search=a&page=1`).as('searching');

        cy.visit('/');
        cy.wait('@user');

        cy.getNavSearch().within(() => {
            cy.get('input[aria-label="Search user"]').type('a');
            cy.wait('@searching');

            cy.get('[data-testid="navSearch-results"] a').should('have.length', 10);

            cy.get('[id="navSearch-results"]').scrollTo('bottom', { ensureScrollable: false });

            cy.get('[data-testid="navSearch-results"] a').should('have.length', 13);
        });

        cy.get('main').click();

        cy.getNavSearch().within(() => {
            cy.get('[data-testid="navSearch-results"]').should('not.exist');
        });
    });

    it('focus input by click on SearchButton', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.getNavSearch().within(() => {
            cy.get('input[aria-label="Search user"]').should('not.be.focused');

            cy.get('[aria-label="Focus input"]').click();

            cy.get('input[aria-label="Search user"]').should('be.focused');
        });
    });

    it('search friend, results dissapear when press esc', () => {
        cy.create('User', { first_name: 'Adam' });

        cy.intercept('/api/user').as('user');
        cy.intercept(`/api/users?search=a&page=1`).as('searching');

        cy.visit('/');
        cy.wait('@user');

        cy.getNavSearch().within(() => {
            cy.get('input[aria-label="Search user"]').type('a');
            cy.wait('@searching');

            cy.get('[data-testid="navSearch-results"] a').should('have.length', 1);
        });

        cy.get('body').type('{esc}');

        cy.getNavSearch().within(() => {
            cy.get('[data-testid="navSearch-results"]').should('not.exist');
        });
    });

    it('try search user, api return error', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept(`/api/users?search=a&page=1`, { statusCode: 500 }).as('searching');

        cy.visit('/');
        cy.wait('@user');

        cy.getNavSearch().within(() => {
            cy.get('input[aria-label="Search user"]').type('a');
            cy.wait('@searching');

            cy.contains('Something went wrong, please try again later');
        });
    });
});
