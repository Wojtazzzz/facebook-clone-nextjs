import { useDatabaseMigrations } from 'cypress-laravel';

const USER_NAME = `${Cypress.env('USER_FIRST_NAME')} ${Cypress.env('USER_LAST_NAME')}`;

describe('Profile friends tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('go to own friends page due to hero, see section title and empty component when api return empty data', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="menu"]').contains(USER_NAME).click();
        cy.url().should('contain', '/profile/1');

        cy.intercept('/api/users/1/friends?search=&page=1').as('friends_page_1');

        cy.get('header a').contains('0 friends').click();
        cy.url().should('contain', '/profile/1/friends');

        cy.wait('@friends_page_1');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('header h2').contains('Friends').should('be.visible');

            cy.get('article[aria-label="Friend"]').should('not.exist');

            cy.get('[data-testid="empty-list"]').within(() => {
                cy.get('img[alt="List is empty"]').should('be.visible');
                cy.contains('No friends to display');
            });
        });
    });

    it('go to own friends page due to aside friends info, see error when api return server error', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="menu"]').contains(USER_NAME).click();
        cy.url().should('contain', '/profile/1');

        cy.intercept('/api/users/1/friends?search=&page=1', { statusCode: 500 }).as('friends_page_1');

        cy.get('[data-testid="asideInfo-friends"]').contains('See All Friends').click();
        cy.url().should('contain', '/profile/1/friends');

        cy.wait('@friends_page_1');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('not.exist');

            cy.get('[data-testid="server-error"]').within(() => {
                cy.get('img[alt="Server error"]').should('be.visible');
                cy.contains('Something went wrong');
                cy.contains('Please try again later');
            });
        });
    });

    it("go to friend's profile by searching, go to his friends list due to aside info, see 20 friends", () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
            id: 999,
        });

        cy.createFriendship(28, 999);

        cy.visit('/');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.get('[data-testid="nav-search"]').within(() => {
            cy.get('input[aria-label="Search user"]').type('Joh');

            cy.get('[data-testid="navSearch-results"]').within(() => {
                cy.contains('John Doe').click();
            });
        });

        cy.url().should('include', '/profile/999');

        cy.intercept('/api/users/999/friends?search=&page=1').as('friends_page_1');

        cy.get('[data-testid="asideInfo-friends"]').contains('See All Friends').click();
        cy.url().should('include', '/profile/999/friends');

        cy.wait('@friends_page_1');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('have.length', 20);
        });

        cy.window().scrollTo('bottom');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('have.length', 28 + 1);
        });
    });

    it('go to own friends list, see only 1 friend, go to his profile by click on his name, go to his list of friends by hero, see only self, redirect to own profile by click on self avatar', () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
            id: 999,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/friends?search=&page=1').as('friends_page_1');

        cy.visit('/profile/1/friends');

        cy.wait('@user');
        cy.wait('@friends_page_1');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('have.length', 1).contains('John Doe').click();
        });

        cy.url().should('include', '/profile/999');

        cy.intercept('/api/users/999/friends?search=&page=1').as('friends_page_1');

        cy.get('header a').contains('1 friend').click();

        cy.wait('@friends_page_1');

        cy.url().should('contain', '/profile/999/friends');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]')
                .should('have.length', 1)
                .first()
                .within(() => {
                    cy.get('img').click();
                });
        });

        cy.url().should('contain', '/profile/1');
    });
});