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

    it('list render empty component when api return empty data', () => {
        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('list render error component when api return server error', () => {
        cy.intercept('/api/notifications?page=1', { statusCode: 500 }).as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[data-testid="server-error"]').should('be.visible');
    });

    it('open notifications, see 3 unread notifications, close dropdown, open again, see 3 read notifications', () => {
        cy.create('Notification', 3, {
            notifiable_id: 1,
            read_at: null,
        });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="list-of-notifications"] button').should('have.length', 3);
        cy.get('[id="list-of-notifications"] button').should('not.have.class', 'opacity-60');

        cy.get('body').type('{esc}');

        // wait for TRQ will mark data as stale
        cy.wait(3000);

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.get('[id="list-of-notifications"] button').should('have.length', 3);
        cy.get('[id="list-of-notifications"] button').should('have.class', 'opacity-60');
    });
});
