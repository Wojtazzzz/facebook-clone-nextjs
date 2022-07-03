import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

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

    // it('go to pokes page due to sidebar, fetch more pokes by click on button and button dissapear because all pokes fetched', () => {
    //     cy.create('Poke', 19, {
    //         friend_id: 1,
    //     });

    //     cy.visit('/');

    //     cy.intercept('/api/pokes?page=1').as('pokes_page_1');

    //     cy.get('[data-testid="sidebar"]').within(() => {
    //         cy.contains('Pokes').click();
    //     });

    //     cy.url().should('include', '/friends/pokes');

    //     cy.wait('@pokes_page_1');

    //     cy.get('[data-testid="friends-list"] > a').should('have.length', 10);

    //     cy.intercept('/api/pokes?page=1').as('pokes_page_1');
    //     cy.intercept('/api/pokes?page=2').as('pokes_page_2');

    //     cy.get('[aria-label="Fetch more users"]').click();

    //     cy.wait('@pokes_page_1');
    //     cy.wait('@pokes_page_2');

    //     cy.get('[data-testid="friends-list"] > a').should('have.length', 19);
    //     cy.get('[aria-label="Fetch more users"]').should('not.exist');
    // });

    it('poke back friend when click "Poke back" button, poke dissapears after page refresh, relogin as friend account, check for notification from user arrived, redirect to pokes page due to notification, poke back user, again relogin as user, check for notification from friend arrived, friend poke show at pokes page', () => {
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

        cy.intercept('/api/pokes').as('poke');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .within(() => {
                cy.contains(`${friend.first_name} ${friend.last_name}`);
                cy.contains('Poke back').click();
                cy.wait('@poke');
                cy.contains('Friend poked back').should('be.visible');
            });

        cy.intercept('/api/friendship/friends/1?page=1').as('friends_page_1');

        cy.get('[data-testid="friends-nav"]').contains('Friends').click();
        cy.wait('@friends_page_1');

        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.visit('/friends/pokes');
        cy.wait('@pokes_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 0);

        cy.relogin(2);

        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Poked you 2 times in a row');

        cy.url().should('include', '/friends/pokes');

        cy.wait('@pokes_page_1');

        cy.intercept('/api/pokes').as('poke');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .within(() => {
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);
                cy.contains('Poke back').click();
                cy.wait('@poke');
                cy.contains('Friend poked back').should('be.visible');
            });

        cy.relogin(1);

        cy.checkNotification(`${friend.first_name} ${friend.last_name}`, 'Poked you 3 times in a row');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .within(() => {
                cy.contains(`${friend.first_name} ${friend.last_name}`);
                cy.contains(`${friend.first_name} poked you 3 times in a row`);
            });
    });
});
