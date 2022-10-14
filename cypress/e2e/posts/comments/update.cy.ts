import { useDatabaseMigrations } from 'cypress-laravel';

describe('Posts comments update tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.create('Post', {
            author_id: 1,
        });
    });

    it('click on "Edit" button, enter new comment value, submit, check that edition not impact on other comments', () => {
        const firstComment = 'First comment';
        const secondComment = 'Second comment';
        const initialContent = 'Simple comment';
        const newContent = 'Updated comment';

        cy.create('Comment', {
            author_id: 1,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
            content: firstComment,
        });

        cy.create('Comment', {
            id: 99999,
            author_id: 1,
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
            content: initialContent,
        });

        cy.create('Comment', {
            commentable_id: 1,
            commentable_type: 'App\\Models\\Post',
            content: secondComment,
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

                cy.getComments().should('have.length', 3);
                cy.getComments()
                    .filter(`:contains("${initialContent}")`)
                    .within(() => {
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');
                        cy.intercept('/api/posts/1/comments/99999').as('put');

                        cy.get('button[aria-label="Edit"]').click();

                        cy.get('[aria-label="Update a comment"]').clear().type(newContent);

                        cy.checkPageA11y();

                        cy.get('[aria-label="Send updated comment"]').click();
                    });

                cy.wait('@put');
                cy.wait('@comments_page_1');

                cy.getComments().contains(newContent).should('be.visible');
                cy.getComments().contains(initialContent).should('not.exist');
                cy.getComments().contains(firstComment).should('be.visible');
                cy.getComments().contains(secondComment).should('be.visible');

                cy.checkPageA11y();
            });
    });

    it('try to edit comment, response return server error', () => {
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

                cy.getComments().should('have.length', 1);
                cy.getComments()
                    .first()
                    .within(() => {
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');
                        cy.intercept('/api/posts/1/comments/1', { statusCode: 500 }).as('update');

                        cy.get('button[aria-label="Edit"]').click();

                        cy.get('[aria-label="Update a comment"]').clear().type('Server error ;(');
                        cy.get('[aria-label="Send updated comment"]').click();

                        cy.wait('@update');
                    });
            });

        cy.get('div[role="alertdialog"]').within(() => {
            cy.contains('App Error');
            cy.contains('Something went wrong, please try again later.');
        });

        cy.checkPageA11y();
    });

    it("cannot see Edit button on somebody's comment", () => {
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
                        cy.get('button[aria-label="Edit"]').should('not.exist');
                    });
            });
    });
});
