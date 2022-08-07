import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Suggests and invites lists tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('go to suggests page due to sidebar and list navigation, fetch more suggests users by scroll to bottom', () => {
        cy.create('User', 17);

        cy.visit('/');

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.get('[data-testid="friends-nav"] > a').contains('Suggests').click();

        cy.url().should('include', '/friends/suggests');

        cy.wait('@suggests_page_1');

        cy.get('[id="friends-list"]').scrollTo('bottom');

        cy.friendsListItems().should('have.length', 17);
    });

    it('suggests list render empty component when api return empty data', () => {
        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');

        cy.url().should('include', '/friends/suggests');

        cy.wait('@suggests_page_1');

        cy.friendsListItems().should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('suggests list render error component when api return server error', () => {
        cy.intercept('/api/suggests?page=1', { statusCode: 500 }).as('suggests_page_1');

        cy.visit('/friends/suggests');

        cy.url().should('include', '/friends/suggests');

        cy.wait('@suggests_page_1');

        cy.get('[id="friends-list"] a[href*="/profile"]').should('not.exist');
        cy.get('[data-testid="server-error"]').should('be.visible');
    });

    it('go to invites page due to sidebar and list navigation, fetch more invites users by scroll to bottom', () => {
        cy.create('Friendship', 13, {
            friend_id: 1,
            status: 'PENDING',
        });

        cy.visit('/');

        cy.get('[data-testid="sidebar"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.get('[data-testid="friends-nav"] > a').contains('Invites').click();

        cy.url().should('include', '/friends/invites');

        cy.wait('@invites_page_1');

        cy.friendsListItems().should('have.length', 10);

        cy.get('[id="friends-list"]').scrollTo('bottom');

        cy.friendsListItems().should('have.length', 13);
    });

    it('invites list render empty component when api return empty data', () => {
        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.visit('/friends/invites');

        cy.url().should('include', '/friends/invites');

        cy.wait('@invites_page_1');

        cy.friendsListItems().should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('invites list render error component when api return server error', () => {
        cy.intercept('/api/invites?page=1', { statusCode: 500 }).as('invites_page_1');

        cy.visit('/friends/invites');

        cy.url().should('include', '/friends/invites');

        cy.wait('@invites_page_1');

        cy.friendsListItems().should('not.exist');
        cy.get('[data-testid="server-error"]').should('be.visible');
    });

    it('invite friend by click on "Invite" button, relogin as friend account, check for notification from user arrived, redirect to invites page due to notification, accept request from user, check that user displays in friends list, again relogin as user, check for notification from friend arrived, check that user displays in friends list', () => {
        cy.create('User', {
            first_name: 'John',
            last_name: 'Doe',
        });

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');
        cy.wait('@suggests_page_1');

        cy.intercept('/api/invites').as('invite');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Invite').click();

                cy.wait('@invite');

                cy.contains('Request sent successfully').should('be.visible');
            });

        cy.relogin(2);

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Sent you a friendship invitation');

        cy.url().should('include', '/friends/invites');

        cy.intercept('/api/invites/1').as('accept');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Accept').click();

                cy.wait('@accept');

                cy.contains('Request accepted successfully').should('be.visible');
            });

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.friendsListItems().should('have.length', 1).contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);

        cy.relogin(1);

        cy.checkNotification('John Doe', 'Accepted your friendship invitation', false);

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.friendsListItems().should('have.length', 1).contains('John Doe');
    });

    it('invite friend when click "Invite" button, relogin as friend account, check for notification from user arrived, redirect to invites page due to arrived notification, reject request from user, check that user not displays in friends list, again relogin as user, check for notification from friend not arrived, check that user not displays in friends list', () => {
        cy.create('User');

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');
        cy.wait('@suggests_page_1');

        cy.intercept('/api/invites').as('invite');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Invite').click();

                cy.wait('@invite');

                cy.contains('Request sent successfully').should('be.visible');
            });

        cy.relogin(2);

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Sent you a friendship invitation');

        cy.url().should('include', '/friends/invites');

        cy.intercept('/api/invites/1').as('reject');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Reject').click();

                cy.wait('@reject');

                cy.contains('Request rejected successfully').should('be.visible');
            });

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.friendsListItems().should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.relogin(1);

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.friendsListItems().should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('invite friend by "Invite" button, api return server error', () => {
        cy.create('User');

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');
        cy.wait('@suggests_page_1');

        cy.intercept('/api/invites', { statusCode: 500 }).as('invite');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Invite').click();

                cy.wait('@invite');

                cy.contains('Something went wrong, try again later').should('be.visible');
            });

        cy.relogin(2);

        cy.visit('/friends/invites');

        cy.intercept('/api/invites/1').as('reject');

        cy.friendsListItems().should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('Accept invite but api return server error, invitation displays after page refresh', () => {
        cy.create('Friendship', {
            friend_id: 1,
            status: 'PENDING',
        });

        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.visit('/friends/invites');
        cy.wait('@invites_page_1');

        cy.intercept('/api/invites/2', { statusCode: 500 }).as('accept');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Accept').click();

                cy.wait('@accept');

                cy.contains('Something went wrong, try again later').should('be.visible');
            });

        cy.visit('/friends/invites');

        cy.friendsListItems().should('have.length', 1);
    });

    it('Reject invite but api return server error, invitation displays after page refresh', () => {
        cy.create('Friendship', {
            friend_id: 1,
            status: 'PENDING',
        });

        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.visit('/friends/invites');
        cy.wait('@invites_page_1');

        cy.intercept('/api/invites/2', { statusCode: 500 }).as('reject');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Reject').click();

                cy.wait('@reject');

                cy.contains('Something went wrong, try again later').should('be.visible');
            });

        cy.visit('/friends/invites');

        cy.friendsListItems().should('have.length', 1);
    });
});
