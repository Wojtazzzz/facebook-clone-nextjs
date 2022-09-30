import { useDatabaseMigrations } from 'cypress-laravel';

const USER_NAME = `${Cypress.env('USER_FIRST_NAME')} ${Cypress.env('USER_LAST_NAME')}`;

describe('Posts comments like tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.create('Post', {
            author_id: 1,
        });
    });

    it('like comment, like button has text in blue, in comment content can see like emoji, unlike comment', () => {
        cy.create('Comment', {
            author_id: 1,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
            content: 'First comment',
        });

        cy.create('Comment', {
            author_id: 1,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
            content: 'Second comment',
        });

        cy.create('Comment', {
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
            content: 'Third comment',
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 3);

                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("First comment")`)
                    .within(() => {
                        cy.intercept('/api/comments/1/likes').as('like');
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                        cy.get('button[aria-label="Like"]').click();
                        cy.wait('@like');
                        cy.wait('@comments_page_1');

                        cy.get('button[aria-label="Like"]').should('have.class', 'text-primary');

                        cy.get('[data-testid="comment-faTooltipIcon"]').should('be.visible');
                        cy.get('[data-testid="comment-likesCount"]').should('not.exist');
                    });

                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("Second comment")`)
                    .within(() => {
                        cy.get('button[aria-label="Like"]').should('not.have.class', 'text-primary');

                        cy.get('[data-testid="comment-faTooltipIcon"]').should('not.exist');
                        cy.get('[data-testid="comment-likesCount"]').should('not.exist');
                    });

                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("Third comment")`)
                    .within(() => {
                        cy.get('button[aria-label="Like"]').should('not.have.class', 'text-primary');

                        cy.get('[data-testid="comment-faTooltipIcon"]').should('not.exist');
                        cy.get('[data-testid="comment-likesCount"]').should('not.exist');
                    });

                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("First comment")`)
                    .within(() => {
                        cy.intercept('/api/comments/1/likes').as('unlike');
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                        cy.get('button[aria-label="Like"]').click();
                        cy.wait('@unlike');
                        cy.wait('@comments_page_1');

                        cy.get('button[aria-label="Like"]').should('not.have.class', 'text-primary');

                        cy.get('[data-testid="comment-faTooltipIcon"]').should('not.exist');
                        cy.get('[data-testid="comment-likesCount"]').should('not.exist');
                    });

                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("Second comment")`)
                    .within(() => {
                        cy.get('button[aria-label="Like"]').should('not.have.class', 'text-primary');

                        cy.get('[data-testid="comment-faTooltipIcon"]').should('not.exist');
                        cy.get('[data-testid="comment-likesCount"]').should('not.exist');
                    });

                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("Third comment")`)
                    .within(() => {
                        cy.get('button[aria-label="Like"]').should('not.have.class', 'text-primary');

                        cy.get('[data-testid="comment-faTooltipIcon"]').should('not.exist');
                        cy.get('[data-testid="comment-likesCount"]').should('not.exist');
                    });
            });
    });

    it("like friend's comment, unlike friend's comment, like friend's comment again, relogin to friend's account, see alert on notifications icon, see only one notification about comment likes, notification redirect to user profile", () => {
        const FRIEND_ID = 999;

        cy.createUser(1, true, {
            id: FRIEND_ID,
        });

        cy.create('Comment', {
            author_id: FRIEND_ID,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);

                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.intercept('/api/comments/1/likes').as('like');
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                        cy.get('button[aria-label="Like"]').click();
                        cy.wait('@like');
                        cy.wait('@comments_page_1');

                        cy.intercept('/api/comments/1/likes').as('unlike');
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                        cy.get('button[aria-label="Like"]').click();
                        cy.wait('@unlike');
                        cy.wait('@comments_page_1');

                        cy.intercept('/api/comments/1/likes').as('like');
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                        cy.get('button[aria-label="Like"]').click();
                        cy.wait('@like');
                        cy.wait('@comments_page_1');
                    });
            });

        cy.relogin(FRIEND_ID);

        cy.get('[data-testid="notifications-trigger"]').within(() => {
            cy.get('[data-testid="alert"]').should('be.visible');
        });

        cy.checkNotification(USER_NAME, 'Liked your comment');

        cy.url().should('contain', '/profile/1');
    });

    it('see alert when like response return error', () => {
        cy.create('Comment', {
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').within(() => {
                    cy.intercept('/api/comments/1/likes', { statusCode: 500 }).as('like');

                    cy.get('button[aria-label="Like"]').click();

                    cy.wait('@like');
                });
            });

        cy.expectAlert('Something went wrong, please try again later.');
    });

    it('see alert when unlike response return error', () => {
        cy.create('Comment', {
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').within(() => {
                    cy.intercept('/api/comments/1/likes').as('like');
                    cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                    cy.get('button[aria-label="Like"]').click();

                    cy.wait('@like');
                    cy.wait('@comments_page_1');

                    cy.intercept('/api/comments/1/likes', { statusCode: 500 }).as('unlike');
                    cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                    cy.get('button[aria-label="Like"]').click();

                    cy.wait('@unlike');
                    cy.wait('@comments_page_1');
                });
            });

        cy.expectAlert('Something went wrong, please try again later.');
    });
});
