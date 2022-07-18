import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Suggests and invites lists tests', () => {
    useDatabaseMigrations();

    const friend = {
        email: 'friend@gmail.com',
        first_name: 'John',
        last_name: 'Doe',
    };

    beforeEach(() => {
        cy.loginRequest();
    });

    it('go to suggests page due to sidebar and list navigation, fetch more suggests users by click on button and button dissapear because all users fetched', () => {
        cy.create('User', 17);

        cy.visit('/');

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.intercept('/api/friends/suggests?page=1').as('suggests_page_1');

        cy.get('[data-testid="friends-nav"] > a').contains('Suggests').click();

        cy.url().should('include', '/friends/suggests');

        cy.wait('@suggests_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 10);

        cy.intercept('/api/friends/suggests?page=1').as('suggests_page_1');
        cy.intercept('/api/friends/suggests?page=2').as('suggests_page_2');

        cy.get('[aria-label="Fetch more users"]').click();

        cy.wait('@suggests_page_1');
        cy.wait('@suggests_page_2');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 17);

        cy.get('[aria-label="Fetch more users"]').should('not.exist');
    });

    it('go to invites page due to sidebar and list navigation, fetch more invites by click on button and button dissapear because all invites fetched', () => {
        cy.create('Friendship', 13, {
            friend_id: 1,
            status: 'PENDING',
        });

        cy.visit('/');

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.intercept('/api/friends/invites?page=1').as('invites_page_1');

        cy.get('[data-testid="friends-nav"] > a').contains('Invites').click();

        cy.url().should('include', '/friends/invites');

        cy.wait('@invites_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 10);

        cy.intercept('/api/friends/invites?page=1').as('invites_page_1');
        cy.intercept('/api/friends/invites?page=2').as('invites_page_2');

        cy.get('[aria-label="Fetch more users"]').click();

        cy.wait('@invites_page_1');
        cy.wait('@invites_page_2');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 13);

        cy.get('[aria-label="Fetch more users"]').should('not.exist');
    });

    it('invite friend when click "Invite" button, relogin as friend account, check for notification from user arrived, redirect to invites page due to notification, accept request from user, check that user displays in friends list, again relogin as user, check for notification from friend arrived, check that user displays in friends list', () => {
        cy.create('User', friend);

        cy.intercept('/api/friends/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');
        cy.wait('@suggests_page_1');

        cy.intercept('/api/friendship/invite').as('invite');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .within(() => {
                cy.contains('Invite').click();
                cy.wait('@invite');
                cy.contains('Request sent successfully').should('be.visible');
            });

        cy.relogin(2);

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Sent you a friendship invitation');

        cy.url().should('include', '/friends/invites');

        cy.intercept('/api/friendship/accept').as('accept');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .within(() => {
                cy.contains('Accept').click();
                cy.wait('@accept');
                cy.contains('Request accepted successfully').should('be.visible');
            });

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);

        cy.relogin(1);

        cy.checkNotification(`${friend.first_name} ${friend.last_name}`, 'Accepted your friendship invitation', false);

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .contains(`${friend.first_name} ${friend.last_name}`);
    });

    it('invite friend when click "Invite" button, relogin as friend account, check for notification from user arrived, redirect to invites page due to arrived notification, reject request from user, check that user not displays in friends list, again relogin as user, check for notification from friend not arrived, check that user not displays in friends list', () => {
        cy.create('User', friend);

        cy.intercept('/api/friends/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');
        cy.wait('@suggests_page_1');

        cy.intercept('/api/friendship/invite').as('invite');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .within(() => {
                cy.contains('Invite').click();
                cy.wait('@invite');
                cy.contains('Request sent successfully').should('be.visible');
            });

        cy.relogin(2);

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Sent you a friendship invitation');

        cy.url().should('include', '/friends/invites');

        cy.intercept('/api/friendship/reject').as('reject');

        cy.get('[data-testid="friends-list"] > a')
            .should('have.length', 1)
            .within(() => {
                cy.contains('Reject').click();
                cy.wait('@reject');
                cy.contains('Request rejected successfully').should('be.visible');
            });

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 0);

        cy.relogin(1);

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.get('[data-testid="friends-list"] > a').should('have.length', 0);
    });
});
