import 'cypress-file-upload';
import type { IMaritalStatus } from '@utils/types';

type IUserDataParam = {
    works_at: string;
    went_to: string;
    lives_in: string;
    from: string;
    marital_status: IMaritalStatus;
    created_at: string;
};

Cypress.Commands.add('loginRequest', (data: Partial<IUserDataParam>) => {
    const id = 1;
    const email = Cypress.env('USER_EMAIL');
    const first_name = Cypress.env('USER_FIRST_NAME');
    const last_name = Cypress.env('USER_LAST_NAME');

    cy.create('User', { id, email, first_name, last_name, ...data });
    cy.login(id);
});

Cypress.Commands.add('checkNotification', (title: string, label: string, click: boolean = true) => {
    cy.intercept('/api/notifications?page=1').as('notifications_page_1');

    cy.get('[data-testid="nav"]').within(() => {
        cy.get('[aria-label="Notifications"]').click();
    });

    cy.wait('@notifications_page_1');

    cy.get('[id="list-of-notifications"] button').should('have.length', 1);

    cy.get('[id="list-of-notifications"]').within(() => {
        cy.get('button:first').contains(title).should('be.visible');
        cy.get('button:first').contains(label).should('be.visible');

        if (click) {
            cy.get('button:first').click();
        }
    });
});

Cypress.Commands.add('relogin', (id: number, path: string = '/') => {
    cy.logout();
    cy.login(id);
    cy.visit(path);
});

Cypress.Commands.add('friendsListItems', () => cy.get('[id="friends-list"] a[href*="/profile"]'));

declare global {
    namespace Cypress {
        interface Chainable {
            loginRequest(data?: Partial<IUserDataParam>): Chainable<void>;
            checkNotification(title: string, label: string, click?: boolean): Chainable<void>;
            relogin(id: number, path?: string): Chainable<void>;
            friendsListItems(): Chainable<void>;
        }
    }
}

export {};
