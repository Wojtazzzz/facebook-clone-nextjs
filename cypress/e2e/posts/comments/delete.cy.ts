import { useDatabaseMigrations } from 'cypress-laravel';

describe('Posts comments delete tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.create('Post', {
            author_id: 1,
        });
    });

    it('click on delete button, see confirm alert, confirm, comment dissapear from list', () => {
        const commentContent = 'Simple comment';

        cy.create('Comment', {
            author_id: 1,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
            content: commentContent,
        });

        cy.create('Comment', {
            author_id: 1,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
        });

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

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 3);

                cy.getComments()
                    .filter(`:contains("${commentContent}")`)
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').click();
                    });
            });

        cy.expectConfirm('Are you sure you want to delete this comment?', 'yes');

        cy.get('[data-testid="post-comments_list"]').children().should('have.length', 2);
        cy.get('[data-testid="post-comments_list"]').children().contains(commentContent).should('not.exist');
    });

    it('click on delete button, see confirm alert, click no, delete again, confirm, see App Error', () => {
        cy.create('Comment', {
            author_id: 1,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
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
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.getComments()
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').click();
                    });
            });

        cy.intercept('/api/posts/1/comments/1', { statusCode: 500 }).as('delete');

        cy.expectConfirm('Are you sure you want to delete this comment?', 'no');

        cy.get('div[role="alertdialog"]').should('not.exist');

        cy.getPosts()
            .first()
            .within(() => {
                cy.getComments()
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').click();
                    });
            });

        cy.expectConfirm('Are you sure you want to delete this comment?', 'yes');

        cy.get('div[role="alertdialog"]').within(() => {
            cy.contains('App Error');
            cy.contains('Something went wrong, please try again later.');
        });

        cy.checkPageA11y();
    });

    it("cannot see Delete button on somebody's comment", () => {
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

                cy.getComments()
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').should('not.exist');
                    });
            });
    });
});
