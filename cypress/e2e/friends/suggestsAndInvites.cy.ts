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

        cy.injectAxe();

        cy.get('[data-testid="menu"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.checkPageA11y();

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.get('[data-testid="friends-nav"] li').contains('Suggests').click();

        cy.wait('@suggests_page_1');

        cy.checkPageA11y();

        cy.url().should('include', '/friends/suggests');

        cy.window().scrollTo('bottom');

        cy.friendsListItems().should('have.length', 17);

        cy.checkPageA11y();
    });

    it('suggests list render empty component when api return empty data', () => {
        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');

        cy.injectAxe();

        cy.url().should('include', '/friends/suggests');

        cy.wait('@suggests_page_1');

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('suggests list render error component when api return server error', () => {
        cy.intercept('/api/suggests?page=1', { statusCode: 500 }).as('suggests_page_1');

        cy.visit('/friends/suggests');

        cy.injectAxe();

        cy.url().should('include', '/friends/suggests');

        cy.wait('@suggests_page_1');

        cy.get('[id="friends-list"] a[href*="/profile"]').should('not.exist');

        cy.get('[data-testid="server-error"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('go to invites page due to sidebar and list navigation, fetch more invites users by scroll to bottom', () => {
        cy.create('Friendship', 13, {
            friend_id: 1,
            status: 'PENDING',
        });

        cy.visit('/');

        cy.injectAxe();

        cy.get('[data-testid="menu"]').within(() => {
            cy.contains('Friends').click();
        });

        cy.checkPageA11y();

        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.get('[data-testid="friends-nav"] li').contains('Invites').click();

        cy.url().should('include', '/friends/invites');

        cy.wait('@invites_page_1');

        cy.friendsListItems().should('have.length', 10);

        cy.checkPageA11y();

        cy.window().scrollTo('bottom');

        cy.friendsListItems().should('have.length', 13);

        cy.checkPageA11y();
    });

    it('invites list render empty component when api return empty data', () => {
        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.visit('/friends/invites');

        cy.injectAxe();

        cy.url().should('include', '/friends/invites');

        cy.wait('@invites_page_1');

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('invites list render error component when api return server error', () => {
        cy.intercept('/api/invites?page=1', { statusCode: 500 }).as('invites_page_1');

        cy.visit('/friends/invites');

        cy.injectAxe();

        cy.url().should('include', '/friends/invites');

        cy.wait('@invites_page_1');

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="server-error"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('invite friend by click on "Invite" button, relogin as friend account, check for notification from user arrived, redirect to invites page due to notification, accept request from user, again relogin as user, check for notification from friend arrived', () => {
        cy.create('User', {
            first_name: 'John',
            last_name: 'Doe',
        });

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');

        cy.wait('@suggests_page_1');

        cy.injectAxe();

        cy.intercept('/api/invites').as('invite');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Invite').click();

                cy.wait('@invite');

                cy.contains('User successfully invited');
            });

        cy.friendsListItems().should('have.length', 1);

        cy.checkPageA11y();

        cy.relogin(2);

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Sent you a friendship invitation');

        cy.url().should('include', '/friends/invites');

        cy.intercept('/api/invites/1').as('accept');

        cy.injectAxe();

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Accept').click();

                cy.wait('@accept');

                cy.contains('Response successfully sent');
            });

        cy.friendsListItems().should('have.length', 1);

        cy.checkPageA11y();

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.friendsListItems().should('have.length', 1).contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);

        cy.relogin(1);

        cy.checkNotification('John Doe', 'Accepted your friendship invitation', false);

        cy.intercept('/api/friends?page=1').as('friends_page_1');

        cy.visit('/friends');
        cy.wait('@friends_page_1');

        cy.injectAxe();

        cy.friendsListItems().should('have.length', 1).contains('John Doe');

        cy.checkPageA11y();
    });

    it('invite friend when click "Invite" button, relogin as friend account, check for notification from user arrived, redirect to invites page due to arrived notification, reject request from user, see confirm alert, click no, reject again, see confirm alert, click confirm, again relogin as user, check for notification from friend not arrived', () => {
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

                cy.contains('User successfully invited');
            });

        cy.relogin(2);

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Sent you a friendship invitation');

        cy.url().should('include', '/friends/invites');

        cy.intercept('/api/invites/1').as('reject');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Reject').click();
            });

        cy.expectConfirm('Are you sure you want to reject request from this user?', 'no');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Reject').should('not.be.disabled');
                cy.contains('Reject').click();
            });

        cy.expectConfirm('Are you sure you want to reject request from this user?', 'yes');

        cy.wait('@reject');

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

    it('invite friend by "Invite" button, see server error', () => {
        cy.create('User');

        cy.intercept('/api/suggests?page=1').as('suggests_page_1');

        cy.visit('/friends/suggests');
        cy.wait('@suggests_page_1');
        cy.injectAxe();

        cy.intercept('/api/invites', { statusCode: 500 }).as('invite');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Invite').click();

                cy.wait('@invite');

                cy.contains('Something went wrong, try again later').should('be.visible');

                cy.checkPageA11y();
            });

        cy.relogin(2);
        cy.injectAxe();

        cy.visit('/friends/invites');
        cy.injectAxe();

        cy.intercept('/api/invites/1').as('reject');

        cy.friendsListItems().should('not.exist');

        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('accept invite, see server error, invitation displays after page refresh', () => {
        cy.create('Friendship', {
            friend_id: 1,
            status: 'PENDING',
        });

        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.visit('/friends/invites');
        cy.wait('@invites_page_1');
        cy.injectAxe();

        cy.intercept('/api/invites/2', { statusCode: 500 }).as('accept');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Accept').click();

                cy.wait('@accept');

                cy.contains('Something went wrong, try again later').should('be.visible');

                cy.checkPageA11y();
            });

        cy.visit('/friends/invites');
        cy.injectAxe();

        cy.friendsListItems().should('have.length', 1);

        cy.checkPageA11y();
    });

    it('reject invite, see server error, invitation displays after page refresh', () => {
        cy.create('Friendship', {
            friend_id: 1,
            status: 'PENDING',
        });

        cy.intercept('/api/invites?page=1').as('invites_page_1');

        cy.visit('/friends/invites');
        cy.wait('@invites_page_1');
        cy.injectAxe();

        cy.intercept('/api/invites/2', { statusCode: 500 }).as('reject');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains('Reject').click();
            });

        cy.expectConfirm('Are you sure you want to reject request from this user?', 'yes');

        cy.wait('@reject');

        cy.friendsListItems()
            .should('have.length', 1)
            .first()
            .within(() => {
                cy.contains('Something went wrong, try again later').should('be.visible');
            });

        cy.checkPageA11y();

        cy.visit('/friends/invites');
        cy.injectAxe();

        cy.friendsListItems().should('have.length', 1);

        cy.checkPageA11y();
    });
});
