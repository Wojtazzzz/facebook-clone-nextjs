import { useDatabaseMigrations } from 'cypress-laravel';

describe('Profile friends tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it("check if is possible to see own friends, friend's friends and stranger's friends", () => {
        // own friends
        cy.createFriendship(2);

        // friend's friends
        cy.createUser(1, true, {
            id: 999,
        });
        cy.createFriendship(3, 999);

        // stranger's friends
        cy.createUser(1, false, {
            id: 99999,
        });
        cy.createFriendship(5, 99999);

        cy.intercept('/api/user').as('user');

        cy.visit('/profile/1');

        cy.wait('@user');

        cy.get('[data-testid="asideInfo-friends"]').within(() => {
            cy.get('ul')
                .children()
                .should('have.length', 2 + 1);
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/profile/999');

        cy.wait('@user');

        cy.get('[data-testid="asideInfo-friends"]').within(() => {
            cy.get('ul')
                .children()
                .should('have.length', 3 + 1);
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/profile/99999');

        cy.wait('@user');

        cy.get('[data-testid="asideInfo-friends"]').within(() => {
            cy.get('ul').children().should('have.length', 5);
        });
    });

    it("see one friend in friend's profile, redirect to his profile by click on him", () => {
        cy.createUser(1, true, {
            id: 999,
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/profile/999');

        cy.wait('@user');

        cy.get('[data-testid="asideInfo-friends"]').within(() => {
            cy.get('ul').children().should('have.length', 1);
            cy.get('ul').children().first().click();
        });

        cy.url().should('include', '/profile/1');
    });

    it('see empty component instead of list of friends when api return empty response', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/profile/1');

        cy.wait('@user');

        cy.get('[data-testid="asideInfo-friends"]').within(() => {
            cy.get('img[alt="List is empty"]').should('be.visible');
            cy.contains('No friends to display');
        });
    });

    it('see error component instead of list of friends when api return server error', () => {
        cy.intercept('/api/users/1/friends/getByCount?count=9', { statusCode: 500 }).as('friends');

        cy.visit('/profile/1');

        cy.wait('@friends');

        cy.get('[data-testid="asideInfo-friends"]').within(() => {
            cy.get('img[alt="Server error"]').should('be.visible');
            cy.contains('Something went wrong');
            cy.contains('Please try again later');
        });
    });

    it('render max 9 friends', () => {
        cy.createFriendship(14);

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/friends/getByCount?count=9').as('friends');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@friends');

        cy.get('[data-testid="asideInfo-friends"]').within(() => {
            cy.get('ul').children().should('have.length', 9);
        });
    });
});
