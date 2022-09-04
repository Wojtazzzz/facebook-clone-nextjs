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

Cypress.Commands.add('showAlertModal', () => {
    cy.create('Post', {
        author_id: 1,
    });

    cy.create('Comment', 1, {
        commentable_id: 1,
        commentable_type: 'App\\Models\\Post',
        author_id: 1,
    });

    cy.intercept('/api/user').as('user');
    cy.intercept('/api/posts?page=1').as('posts_page_1');

    cy.visit('/');
    cy.wait('@user');
    cy.wait('@posts_page_1');

    cy.get('[id="posts-list"] article[aria-label="Post"]')
        .first()
        .within(() => {
            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');
            cy.intercept('/api/posts/1/comments/1', { statusCode: 500 }).as('delete');

            cy.get('[aria-label="Comment"]').click();
            cy.wait('@comments_page_1');

            cy.get('[data-testid="post-comments_list"]')
                .first()
                .within(() => {
                    cy.get('[aria-label="Delete"]').click();
                    cy.wait('@delete');
                });
        });
});

Cypress.Commands.add('expectAlert', (message: string) => {
    cy.get('div[role="alertdialog"]').within(() => {
        cy.contains('App Error');
        cy.contains(message);
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginRequest(data?: Partial<IUserDataParam>): Chainable<void>;
            checkNotification(title: string, label: string, click?: boolean): Chainable<void>;
            relogin(id: number, path?: string): Chainable<void>;
            friendsListItems(): Chainable<void>;
            showAlertModal(): Chainable<void>;
            expectAlert(message: string): Chainable<void>;
        }
    }
}

export {};
