import { useDatabaseMigrations } from 'cypress-laravel';

const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');
const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');

describe('Posts comments list tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.create('Post', {
            author_id: 1,
        });
    });

    it('see 10 comments and fetch 5 more by click on "View more comments", after that button dissapears', () => {
        cy.create('Comment', 15, {
            resource_id: 1,
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

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 10);

                cy.intercept('/api/posts/1/comments?page=2').as('comments_page_2');

                cy.get('button[aria-label="Load more comments"]').click();

                cy.wait('@comments_page_2');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 15);
                cy.get('button[aria-label="Load more comments"]').should('not.exist');
            });
    });

    it('list not render empty component when api return empty data', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').should('not.exist');
                cy.get('[data-testid="empty-list"]').should('not.exist');
            });
    });

    it('list render error component when api return server error', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1', { statusCode: 500 }).as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').should('not.exist');
                cy.get('[data-testid="server-error"]').should('be.visible');
            });
    });

    it('cannot see comments and create new one when post has disabled commenting', () => {
        cy.create('Post', {
            id: 999,
            author_id: 1,
            content: 'Post with disabled commenting',
            commenting: false,
        });

        cy.create('Comment', {
            author_id: 1,
            resource_id: 999,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .filter(':contains("Post with disabled commenting")')
            .within(() => {
                cy.get('[aria-label="Comment"]').click();

                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME} turned off commenting for this post.`);

                cy.get('article[aria-label="Comment"]').should('not.exist');
                cy.get('[aria-label="Write a comment"]').should('not.exist');
            });
    });

    it("cannot see 'Delete' and 'Edit' buttons on somebody's comment but see 'Like' and 'Reply' buttons", () => {
        cy.create('Comment', {
            resource_id: 1,
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

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Like"]').should('be.visible');
                        cy.get('button[aria-label="Reply"]').should('be.visible');
                        cy.get('button[aria-label="Delete"]').should('not.exist');
                        cy.get('button[aria-label="Edit"]').should('not.exist');
                    });
            });
    });
});
