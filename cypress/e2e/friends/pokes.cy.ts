import { useDatabaseMigrations } from 'cypress-laravel';

const USER_NAME = `${Cypress.env('USER_FIRST_NAME')} ${Cypress.env('USER_LAST_NAME')}`;

describe('Pokes list tests', () => {
    useDatabaseMigrations();

    const friend = {
        email: 'friend@gmail.com',
        first_name: 'John',
        last_name: 'Doe',
    };

    beforeEach(() => {
        cy.loginRequest();
    });

    it('go to pokes page due to sidebar, see 10 pokes, load next 7 pokes by scrolling to bottom', () => {
        cy.create('Poke', 17, {
            friend_id: 1,
        });

        cy.visit('/');

        cy.injectAxe();

        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.get('[data-testid="menu"]').within(() => {
            cy.contains('Pokes').click();
        });

        cy.checkPageA11y();

        cy.url().should('include', '/friends/pokes');

        cy.wait('@pokes_page_1');

        cy.friendsListItems().should('have.length', 10);

        cy.checkPageA11y();

        cy.window().scrollTo('bottom');

        cy.friendsListItems().should('have.length', 17);

        cy.checkPageA11y();
    });

    it('poke back friend when click "Poke back" button, poke dissapears after page refresh, relogin as friend, check for notification from user arrived, redirect to pokes page due to notification, poke back user, again relogin as user, check for notification from friend arrived, friend poke show at pokes page', () => {
        cy.create('User', friend);
        cy.create('Friendship', {
            user_id: 1,
            friend_id: 2,
            status: 'CONFIRMED',
        });
        cy.create('Poke', {
            user_id: 2,
            friend_id: 1,
            latest_initiator_id: 2,
            count: 1,
        });

        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.visit('/friends/pokes');
        cy.wait('@pokes_page_1');

        cy.injectAxe();

        cy.intercept('/api/pokes').as('poke');

        cy.checkPageA11y();

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains(`${friend.first_name} ${friend.last_name}`);
                cy.contains('Poke back').click();

                cy.wait('@poke');
            });

        cy.checkPageA11y();

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.get('[data-testid="friends-nav"]').contains('Friends').click();
        cy.wait('@friends_page_1');

        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.visit('/friends/pokes');

        cy.wait('@pokes_page_1');

        cy.injectAxe();

        cy.friendsListItems().should('not.exist');

        cy.checkPageA11y();

        cy.relogin(2);

        cy.injectAxe();

        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.checkNotification(USER_NAME, 'Poked you 2 times in a row');

        cy.checkPageA11y();

        cy.url().should('include', '/friends/pokes');

        cy.wait('@pokes_page_1');

        cy.intercept('/api/pokes').as('poke');

        cy.checkPageA11y();

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains(USER_NAME);
                cy.contains('Poke back').click();

                cy.wait('@poke');
            });

        cy.checkPageA11y();

        cy.relogin(1);

        cy.injectAxe();

        cy.checkPageA11y();

        cy.checkNotification(`${friend.first_name} ${friend.last_name}`, 'Poked you 3 times in a row');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains(`${friend.first_name} ${friend.last_name}`);
                cy.contains(`${friend.first_name} poked you 3 times in a row`);
            });

        cy.checkPageA11y();
    });

    it('render empty component when api return empty data', () => {
        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.visit('/friends/pokes');

        cy.wait('@pokes_page_1');

        cy.injectAxe();

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('render error component when api return server error', () => {
        cy.intercept('/api/pokes?page=1', { statusCode: 500 }).as('pokes_page_1');

        cy.visit('/friends/pokes');

        cy.wait('@pokes_page_1');

        cy.injectAxe();

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="server-error"]').should('be.visible');

        cy.checkPageA11y();
    });
});
