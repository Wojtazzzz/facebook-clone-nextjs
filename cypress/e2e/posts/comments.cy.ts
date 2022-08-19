import { useDatabaseMigrations } from 'cypress-laravel';
import { initial } from 'cypress/types/lodash';

const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');
const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');

describe('Posts comments tests', () => {
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

    it('create new comment and see it on list', () => {
        const newCommentContent = 'New simple comment';

        cy.create('Comment', 1, {
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

                cy.get('article[aria-label="Comment"]').should('have.length', 1);

                cy.intercept('/api/posts/1/comments').as('create');
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Write a comment"]').type(`${newCommentContent}{enter}`);

                cy.wait('@create');
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').should('have.length', 2);
                cy.get('article[aria-label="Comment"]')
                    .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`)
                    .should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(newCommentContent).should('be.visible');
            });
    });

    it('create new comment and see server error', () => {
        const newCommentContent = 'New simple comment';

        cy.create('Comment', 1, {
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

                cy.get('article[aria-label="Comment"]').should('have.length', 1);

                cy.intercept('/api/posts/1/comments', { statusCode: 500 }).as('create');

                cy.get('[aria-label="Write a comment"]').type(`${newCommentContent}{enter}`);

                cy.wait('@create');

                cy.contains('Request failed with status code 500').should('be.visible');
                cy.get('article[aria-label="Comment"]').should('have.length', 1);
            });
    });

    it('click on delete button, comment dissapear from list', () => {
        const commentContent = 'Simple comment';

        cy.create('Comment', {
            author_id: 1,
            resource_id: 1,
            content: commentContent,
        });

        cy.create('Comment', {
            author_id: 1,
            resource_id: 1,
        });

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

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 3);

                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("${commentContent}")`)
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').click();
                    });
            });

        cy.get('[data-testid="post-comments_list"]').children().should('have.length', 2);
        cy.get('[data-testid="post-comments_list"]').children().contains(commentContent).should('not.exist');
    });

    it("cannot see 'Delete' and 'Edit' buttons on somebody's comment but see 'Like' and 'Reply' buttons", () => {
        cy.create('Comment', 1, {
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

    it('click on "Edit" button, enter new comment value, submit, check that edition not impact on other comments', () => {
        const firstComment = 'First comment';
        const secondComment = 'Second comment';
        const initialContent = 'Simple comment';
        const newContent = 'Updated comment';

        cy.create('Comment', 1, {
            author_id: 1,
            resource_id: 1,
            content: firstComment,
        });

        cy.create('Comment', 1, {
            id: 99999,
            author_id: 1,
            resource_id: 1,
            content: initialContent,
        });

        cy.create('Comment', 1, {
            resource_id: 1,
            content: secondComment,
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

                cy.get('article[aria-label="Comment"]').should('have.length', 3);
                cy.get('article[aria-label="Comment"]')
                    .filter(`:contains("${initialContent}")`)
                    .within(() => {
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');
                        cy.intercept('/api/posts/1/comments/99999').as('put');

                        cy.get('button[aria-label="Edit"]').click();

                        cy.get('[aria-label="Write a comment"]').clear().type(newContent);
                        cy.get('[aria-label="Submit comment"]').click();
                    });

                cy.wait('@put');
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').contains(newContent).should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(initialContent).should('not.exist');
                cy.get('article[aria-label="Comment"]').contains(firstComment).should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(secondComment).should('be.visible');
            });
    });

    it('click on "Edit" button, enter new comment value, submit, check that edition not impact on other comments', () => {
        cy.create('Comment', 1, {
            author_id: 1,
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

                cy.get('article[aria-label="Comment"]').should('have.length', 1);
                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');
                        cy.intercept('/api/posts/1/comments/1', { statusCode: 500 }).as('update');

                        cy.get('button[aria-label="Edit"]').click();

                        cy.get('[aria-label="Write a comment"]').clear().type('Server error ;(');
                        cy.get('[aria-label="Submit comment"]').click();

                        cy.wait('@update');
                        cy.contains('Request failed with status code 500');
                    });
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
});
