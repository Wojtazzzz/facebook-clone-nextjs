import { useDatabaseMigrations } from 'cypress-laravel';

const APP_URL = Cypress.env('APP_URL');

describe('Notifications tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
    });

    it('open notifications when click on notifications icon and close when press esc', () => {
        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.get('[data-testid="notifications-container"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[data-testid="notifications-container"]').should('not.exist');
    });

    it('can load more notifications when scrolling to bottom', () => {
        cy.create('Notification', 18, {
            notifiable_id: 1,
        });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');
        cy.intercept('/api/notifications?page=2').as('notifications_page_2');

        cy.get('[id="list-of-notifications"]').scrollTo('bottom', { ensureScrollable: false });

        cy.wait('@notifications_page_1');
        cy.wait('@notifications_page_2');

        cy.get('[class="infinite-scroll-component "] > button').should('have.length', 18);
    });

    it('When click on notification it redirects to another page and hide notifications dropdown', () => {
        cy.create('Notification', 20, {
            notifiable_id: 1,
        });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');
        cy.intercept('/api/notifications?page=2').as('notifications_page_2');

        cy.get('[id="list-of-notifications"]').within(() => {
            cy.get('button:first').click();
        });

        cy.url().should('not.eq', `${APP_URL}/`);
        cy.get('[data-testid="notifications-container"]').should('not.exist');
    });
});
