import { useDatabaseMigrations } from 'cypress-laravel';

const USER_NAME = `${Cypress.env('USER_FIRST_NAME')} ${Cypress.env('USER_LAST_NAME')}`;

describe('Post tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('like and dislike post', () => {
        cy.create('Post').then((post) => {
            cy.create('Friendship', {
                user_id: post.author_id,
                friend_id: 1,
                status: 'CONFIRMED',
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts()
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/likes').as('like');
                cy.intercept('/api/posts?page=1').as('posts_page_1');

                cy.get('button[aria-label="Like"]').click();

                cy.wait('@like');
                cy.wait('@posts_page_1');

                cy.get('[data-testid="post-likesCount"]').contains('1').should('be.visible');

                cy.checkPageA11y();

                cy.intercept('/api/posts/1/likes').as('like');
                cy.intercept('/api/posts?page=1').as('posts_page_1');

                cy.get('button[aria-label="Like"]').click();

                cy.wait('@like');
                cy.wait('@posts_page_1');

                cy.get('[data-testid="post-likesCount"]').should('not.exist');

                cy.checkPageA11y();
            });
    });

    it('try to like post and see error when api return server error', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts()
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/likes', { statusCode: 500 }).as('like');

                cy.get('button[aria-label="Like"]').click();

                cy.wait('@like');
            });

        cy.expectAlert('Something went wrong, please try again later');

        cy.checkPageA11y();
    });

    it("redirect to author's profile by click on his name ", () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/likes').as('like');
                cy.intercept('/api/posts?page=1').as('posts_page_1');

                cy.contains(USER_NAME).click();

                cy.url().should('contain', '/profile/1');
            });
    });

    it("like friend's post, dislike, like again, relogin to friend account, see only one like notification, notification redirect to user profile", () => {
        cy.create('Friendship', {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.create('Post', {
            author_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .should('have.length', 1)
            .within(() => {
                cy.intercept('/api/posts/1/likes').as('like');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@like');

                cy.intercept('/api/posts/1/likes').as('dislike');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@dislike');
            });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="notifications-list"] button').should('not.exist');

        cy.relogin(2);

        cy.checkNotification(USER_NAME, 'Liked your post', true);

        cy.url().should('contain', '/profile/1');
    });

    it('like own post, notification list is empty', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .should('have.length', 1)
            .within(() => {
                cy.intercept('/api/posts/1/likes').as('like');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@like');
            });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="notifications-list"] button').should('not.exist');
    });
});
