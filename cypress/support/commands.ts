import 'cypress-file-upload';
import type { IUserExtended } from './types';

Cypress.Commands.add('loginRequest', (data: Partial<IUserExtended>) => {
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

    cy.get('[id="notifications-list"] button').should('have.length', 1);

    cy.get('[id="notifications-list"]')
        .first()
        .within(() => {
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

Cypress.Commands.add('friendsListItems', () =>
    cy.get('a[href*="/profile"][aria-label^="See "][aria-label$=" profile"]')
);

Cypress.Commands.add('getPosts', () => cy.get('article[aria-label="Post"]'));
Cypress.Commands.add('getNavSearch', () => cy.get('nav[data-testid="nav"] [data-testid="nav-search"]'));

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

    cy.get('article[aria-label="Post"]')
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

Cypress.Commands.add('openUpdatePostModal', () => {
    cy.get('article[aria-label="Post"]')
        .first()
        .within(() => {
            cy.get('[aria-label="Show post settings"]').click();
        });

    cy.get('[aria-label="Update"]').click();
});

Cypress.Commands.add('createUser', (amount = 1, asFriend = true, params?: Partial<IUserExtended>) => {
    cy.create('User', amount, params).then((users: IUserExtended[]) => {
        if (!asFriend) return;

        users.forEach((user) => {
            cy.create('Friendship', {
                user_id: 1,
                friend_id: user.id,
                status: 'CONFIRMED',
            });
        });
    });
});

Cypress.Commands.add('createFriendship', (amount = 1, forUser = 1) => {
    cy.create('Friendship', amount, {
        user_id: forUser,
        status: 'CONFIRMED',
    });
});

Cypress.Commands.add('getScrollToTop', () => {
    cy.get('button[aria-label="Scroll page to top"]');
});

declare global {
    namespace Cypress {
        interface Chainable {
            loginRequest(data?: Partial<IUserExtended>): Chainable<void>;
            checkNotification(title: string, label: string, click?: boolean): Chainable<void>;
            relogin(id: number, path?: string): Chainable<void>;
            friendsListItems(): Chainable<void>;
            getPosts(): Chainable<void>;
            getNavSearch(): Chainable<void>;
            showAlertModal(): Chainable<void>;
            expectAlert(message: string): Chainable<void>;
            openUpdatePostModal(): Chainable<void>;
            createUser(amount?: number, asFriend?: boolean, params?: Partial<IUserExtended>): Chainable<void>;
            createFriendship(amount?: number, forUser?: number): Chainable<void>;
            getScrollToTop(): Chainable<void>;
        }
    }
}

export {};
