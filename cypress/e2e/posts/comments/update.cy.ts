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
            resource_id: 1,
            content: firstComment,
        });

        cy.create('Comment', {
            id: 99999,
            author_id: 1,
            resource_id: 1,
            content: initialContent,
        });

        cy.create('Comment', {
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

                        cy.get('[aria-label="Update a comment"]').clear().type(newContent);
                        cy.get('[aria-label="Update comment"]').click();
                    });

                cy.wait('@put');
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').contains(newContent).should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(initialContent).should('not.exist');
                cy.get('article[aria-label="Comment"]').contains(firstComment).should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(secondComment).should('be.visible');
            });
    });

    it('try to edit comment, response return server error', () => {
        cy.create('Comment', {
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

                        cy.get('[aria-label="Update a comment"]').clear().type('Server error ;(');
                        cy.get('[aria-label="Update comment"]').click();

                        cy.wait('@update');
                    });
            });

        cy.get('div[role="alertdialog"]').within(() => {
            cy.contains('App Error');
            cy.contains('Something went wrong, please try again later.');
        });
    });

    it("cannot see Edit button on somebody's comment", () => {
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
                        cy.get('button[aria-label="Edit"]').should('not.exist');
                    });
            });
    });
});