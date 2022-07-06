import { UserType } from '@cypress/support/types';
import { useDatabaseMigrations } from 'cypress-laravel';

describe('Searching users tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
        cy.artisan('algolia:clear');
    });

    it('type something on input and see "No Results" message and clear input by click on clear button', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav-search-desktop"]').within(() => {
            cy.get('input[aria-label="User search input"]').type('xxxxxx');

            cy.contains('No Results');

            cy.get('[aria-label="Clear input"]').click();

            cy.get('input[aria-label="User search input"]').should('have.value', '');
        });
    });

    it('type friend firstname on input and see his firstname and username on results list', () => {
        let friend: UserType;
        cy.create('User').then((user) => (friend = user));

        cy.intercept('/api/user').as('user');
        cy.intercept(
            'https://aqhmu0mnat-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.13.1)%3B%20Browser%20(lite)%3B%20react%20(17.0.2)%3B%20react-instantsearch%20(6.29.0)%3B%20react-instantsearch-hooks%20(6.29.0)%3B%20instantsearch.js%20(4.43.0)%3B%20JS%20Helper%20(3.10.0)&x-algolia-api-key=01322bb95c6341b4a8b048c5b050ad99&x-algolia-application-id=AQHMU0MNAT'
        ).as('algolia');

        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav-search-desktop"]').within(() => {
            cy.get('input[aria-label="User search input"]').type(`${friend.first_name}`);

            cy.wait('@algolia');

            cy.contains(`${friend.first_name} ${friend.last_name}`);
        });
    });

    it('type "a", see 8 users and load more button, fetch second list on click on that button and button dissapear because all users fetched', () => {
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

        cy.intercept('/api/user').as('user');
        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav-search-desktop"]').within(() => {
            cy.get('input[aria-label="User search input"]').type('a');

            cy.get('[data-testid="search-hits"] > a').should('have.length', 8);
            cy.get('button[aria-label="Load more results"]').click();

            cy.get('button[aria-label="Load more results"]').should('not.exist');
        });
    });

    it('hits dissapear when click on outside page element', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav-search-desktop"]').within(() => {
            cy.get('input[aria-label="User search input"]').type('a');

            cy.get('[data-testid="search-hits"]').should('be.visible');
        });

        cy.get('main').click();

        cy.get('[data-testid="nav-search-desktop"]').within(() => {
            cy.get('[data-testid="search-hits"]').should('not.exist');
        });
    });
});
