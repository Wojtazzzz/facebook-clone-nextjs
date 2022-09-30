import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');
const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Profile hero tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('visit self profile, cannot edit profile because button is disabled, see all friends count and 8 friends images, redirect to friend profile by click on his image', () => {
        cy.createFriendship(13);

        cy.visit('/profile/1');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.get('button[aria-label="Edit profile"]').should('be.disabled');
        cy.contains('13 friends').should('be.visible');
        cy.get('[data-testid="profile-friendsList"] img').should('have.length', 8);

        cy.get('[data-testid="profile-friendsList"] img').first().click({ force: true });

        cy.url().should('not.eq', `${APP_URL}/profile/1`);
        cy.url().should('include', `${APP_URL}/profile/`);

        cy.get('button[aria-label="Send message"]').should('be.visible');
    });

    it('visit friend\'s profile, see his friends (only one), open chat with him by click on "Send message" button', () => {
        cy.createFriendship(1);

        cy.visit('/profile/2');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.get('button[aria-label="Edit profile"]').should('not.exist');
        cy.contains('1 friend').should('be.visible');
        cy.get('[data-testid="profile-friendsList"] img').should('have.length', 1);

        cy.get('button[aria-label="Send message"]').click();

        cy.get('[data-testid="chat"]').should('be.visible');
        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('Say hello to your friend!').should('be.visible');
        });
    });

    it('visit friend\'s profile, click "Poke" button, relogin to friend\'s account, see poke in notifications and in pokes list', () => {
        cy.createFriendship(1);

        cy.visit('/profile/2');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.intercept('/api/pokes').as('poke');

        cy.get('button[aria-label="Poke"]').should('be.enabled');
        cy.get('button[aria-label="Poke"]').click();
        cy.get('button[aria-label="Poke"]').should('be.disabled');

        cy.wait('@poke');

        cy.get('button[aria-label="Poke"]').should('be.enabled');

        cy.relogin(2);

        cy.intercept('/api/pokes?page=1').as('pokes_page_1');

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Poked you first time');
        cy.wait('@pokes_page_1');

        cy.friendsListItems()
            .should('have.length', 1)
            .within(() => {
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);
                cy.contains('Poke back');
            });
    });

    it('visit friend\'s profile, click "Poke" button, see server error', () => {
        cy.createFriendship(1);

        cy.visit('/profile/2');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.intercept('/api/pokes', { statusCode: 500 }).as('poke');

        cy.get('button[aria-label="Poke"]').click();

        cy.wait('@poke');

        cy.expectAlert('Something went wrong, please try again later');
    });

    it('visit friend\'s profile, click "Poke" button, see error with message "Cannot poke friend two times in a row."', () => {
        cy.createFriendship(1);

        cy.create('Poke', {
            user_id: 1,
            friend_id: 2,
            latest_initiator_id: 1,
            count: 1,
        });

        cy.visit('/profile/2');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.intercept('/api/pokes').as('poke');

        cy.get('button[aria-label="Poke"]').click();

        cy.wait('@poke');

        cy.expectAlert('Cannot poke friend two times in a row.');
    });

    it('visit random user\'s profile, click "Poke" button, see error with message "This user is not your friend."', () => {
        cy.createUser(1, false);

        cy.visit('/profile/2');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.intercept('/api/pokes').as('poke');

        cy.get('button[aria-label="Poke"]').click();

        cy.wait('@poke');

        cy.expectAlert('This user is not your friend.');
    });

    it('visit random user\'s profile which already poke you, click "Poke" button, see error with message "This user is not your friend."', () => {
        cy.createUser(1, false);

        cy.create('Poke', {
            user_id: 1,
            friend_id: 2,
            latest_initiator_id: 2,
            count: 1,
        });

        cy.visit('/profile/2');

        cy.intercept('/api/user').as('user');

        cy.wait('@user');

        cy.intercept('/api/pokes').as('poke');

        cy.get('button[aria-label="Poke"]').click();

        cy.wait('@poke');

        cy.expectAlert('This user is not your friend.');
    });
});
