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

        cy.intercept('/api/users/1/friends/get-by-count?count=9').as('getByCount');

        cy.get('[data-testid="menu"]').contains(USER_NAME).click();

        cy.wait('@getByCount');

        cy.url().should('contain', '/profile/1');

        cy.injectAxe();

        cy.intercept('/api/users/1/friends?search=&page=1').as('friends_page_1');

        cy.get('[data-testid="profile-friendsList-count"]').contains('0 friends').click();

        cy.wait('@friends_page_1');

        cy.url().should('contain', '/profile/1/friends');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('header h2').contains('Friends').should('be.visible');

            cy.get('article[aria-label="Friend"]').should('not.exist');

            cy.get('[data-testid="empty-list"]').within(() => {
                cy.get('img[alt="List is empty"]').should('be.visible');
                cy.contains('No friends to display');
            });
        });

        cy.checkPageA11y();
    });

    it('go to own friends page due to aside friends info, see error when api return server error', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="menu"]').contains(USER_NAME).click();
        cy.url().should('contain', '/profile/1');

        cy.intercept('/api/users/1/friends?search=&page=1', { statusCode: 500 }).as('friends_page_1');

        cy.get('[data-testid="asideInfo-friends"]').contains('See All Friends').click();

        cy.wait('@friends_page_1');

        cy.url().should('contain', '/profile/1/friends');

        cy.injectAxe();

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('not.exist');

            cy.get('[data-testid="server-error"]').within(() => {
                cy.get('img[alt="Server error"]').should('be.visible');
                cy.contains('Something went wrong');
                cy.contains('Please try again later');
            });
        });

        cy.checkPageA11y();
    });

    it("go to friend's profile by searching, go to his friends list due to aside info, see 20 friends, fetch more friends by scroll page to bottom, click on ScrollToTop button", () => {
        cy.createUser(1, true, {
            first_name: 'John',
            last_name: 'Doe',
            id: 999,
        });

        cy.createFriendship(28, 999);

        cy.intercept('/api/user').as('user');

        cy.visit('/');

        cy.wait('@user');

        cy.injectAxe();

        cy.get('[data-testid="nav-search"]').within(() => {
            cy.get('input[aria-label="Search user"]').type('Joh');

            cy.get('[data-testid="navSearch-results"]').within(() => {
                cy.checkPageA11y();

                cy.contains('John Doe').click();
            });
        });

        cy.injectAxe();

        cy.checkPageA11y();

        cy.intercept('/api/users/999/friends?search=&page=1').as('friends_page_1');

        cy.get('[data-testid="asideInfo-friends"]').contains('See All Friends').click();

        cy.wait('@friends_page_1');

        cy.injectAxe();

        cy.checkPageA11y();

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('have.length', 20);
        });

        cy.checkPageA11y();

        cy.window().scrollTo('bottom');

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('have.length', 28 + 1);
        });

        cy.checkPageA11y();

        cy.getScrollToTop().click();

        /* wait for smooth scrolling */
        cy.wait(3000);

        cy.window().its('scrollY').should('eq', 0);
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

        cy.injectAxe();

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('have.length', 1);
            cy.get('article[aria-label="Friend"]').first().contains('John Doe');

            cy.checkPageA11y();

            cy.get('article[aria-label="Friend"]').first().contains('John Doe').click();
        });

        cy.injectAxe();
        cy.checkPageA11y();

        cy.intercept('/api/users/999/friends?search=&page=1').as('friends_page_1');

        cy.get('[data-testid="profile-friendsList-count"]').contains('1 friend').click();

        cy.wait('@friends_page_1');

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

    it("see 20 friends, focus input by click on search button, write something in input, clear input by click on clear button, write friend's name, see only friend on list", () => {
        cy.createFriendship(20);

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

        cy.injectAxe();

        cy.get('section[data-testid="profile-friends"]').within(() => {
            cy.get('article[aria-label="Friend"]').should('have.length', 20);

            cy.get('input[aria-label="Search friend"]').should('not.have.focus');

            cy.get('button[aria-label="Focus input"]').click();

            cy.get('input[aria-label="Search friend"]').should('have.focus');

            cy.get('input[aria-label="Search friend"]').type('test');
            cy.get('input[aria-label="Search friend"]').should('have.value', 'test');

            cy.get('button[aria-label="Clear input"]').click();

            cy.get('input[aria-label="Search friend"]').should('have.value', '');

            cy.intercept('/api/users/1/friends?search=John+Doe&page=1').as('search_friends');

            cy.get('input[aria-label="Search friend"]').type('John Doe');
            cy.get('input[aria-label="Search friend"]').should('have.value', 'John Doe');

            cy.wait('@search_friends');

            cy.checkPageA11y();

            cy.get('article[aria-label="Friend"]')
                .should('have.length', 1)
                .first()
                .within(() => {
                    cy.contains('John Doe').click();
                });

            cy.url().should('contain', '/profile/999');
        });

        cy.injectAxe();

        cy.checkPageA11y();
    });

    it("see 4 friends in list, type only part of friend's name in search, see friend in friends list", () => {
        cy.createUser(3, true, {
            first_name: 'Adam',
            last_name: 'Smith',
        });

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
            cy.get('article[aria-label="Friend"]').should('have.length', 4);

            cy.get('input[aria-label="Search friend"]').type('John D');
            cy.get('input[aria-label="Search friend"]').should('have.value', 'John D');

            cy.get('article[aria-label="Friend"]').should('have.length', 1);
            cy.get('article[aria-label="Friend"]').first().contains('John Doe').click();

            cy.url().should('contain', '/profile/999');
        });
    });
});
