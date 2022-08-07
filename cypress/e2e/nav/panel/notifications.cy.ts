import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');

describe('Notifications tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
    });

    it('open notifications by click on notifications icon and close when press esc', () => {
        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.get('[data-testid="dropdown"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[data-testid="dropdown"]').should('not.exist');
    });

    it('open notifications, see 15 notifications, fetch more notifications by scrolling to bottom', () => {
        cy.create('Notification', 17, {
            notifiable_id: 1,
        });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="list-of-notifications"] button').should('have.length', 15);

        cy.get('[id="list-of-notifications"]').scrollTo('bottom', { ensureScrollable: false });

        cy.get('[id="list-of-notifications"] button').should('have.length', 17);
    });

    it('notifications dissapears when click on outside page element', () => {
        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.get('main').click();

        cy.get('[data-testid="dropdown"]').should('not.exist');
    });

    it('list render empty component because api return empty data', () => {
        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('list render error component because api return server error', () => {
        cy.intercept('/api/notifications?page=1', { statusCode: 500 }).as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[data-testid="server-error"]').should('be.visible');
    });

    it('open notifications, see poke notification, redirect to pokes page when click on it', () => {
        cy.artisan('data:notify 1 2 poked');

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="list-of-notifications"] button').should('have.length', 1).first().click();

        cy.url().should('eq', `${APP_URL}/friends/pokes`);
    });

    it('open notifications, see request accepted notification, redirect to friend profile page when click on it', () => {
        cy.artisan('data:notify 1 2 invAccepted');

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="list-of-notifications"] button').should('have.length', 1).first().click();

        cy.url().should('eq', `${APP_URL}/profile/2`);
    });

    it('open notifications, see request sent notification, redirect to invites page when click on it', () => {
        cy.artisan('data:notify 1 2 invSent');

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="list-of-notifications"] button').should('have.length', 1).first().click();

        cy.url().should('eq', `${APP_URL}/friends/invites`);
    });
});
