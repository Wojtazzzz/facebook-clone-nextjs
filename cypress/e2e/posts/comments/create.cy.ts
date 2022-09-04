import { useDatabaseMigrations } from 'cypress-laravel';

const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');
const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');

describe('Posts comments create tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.create('Post', {
            author_id: 1,
        });
    });

    it('create comment and see it on list', () => {
        const newCommentContent = 'New simple comment';

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

    it('create comment and see server error', () => {
        const newCommentContent = 'New simple comment';

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

                cy.get('article[aria-label="Comment"]').should('have.length', 1);

                cy.intercept('/api/posts/1/comments', { statusCode: 500 }).as('create');

                cy.get('[aria-label="Write a comment"]').type(`${newCommentContent}{enter}`);

                cy.wait('@create');
                cy.get('article[aria-label="Comment"]').should('have.length', 1);
            });

        cy.get('div[role="alertdialog"]').within(() => {
            cy.contains('App Error');
            cy.contains('Something went wrong, please try again later.');
        });
    });

    it('create comment with text and emoji', () => {
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

                cy.get('article[aria-label="Comment"]').should('have.length', 1);

                cy.intercept('/api/posts/1/comments').as('create');
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Write a comment"]').type(`Hello `);

                cy.get('[aria-label="Choose an emoji"]').click();
            });

        cy.get('[aria-label="Emojis list"]').within(() => {
            cy.get('button').contains('👋').click();
        });

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('input[aria-label="Write a comment"]').should('have.value', 'Hello 👋');

                cy.get('[aria-label="Submit comment"]').click();

                cy.wait('@create');
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').should('have.length', 2);
                cy.get('article[aria-label="Comment"]')
                    .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`)
                    .should('be.visible');

                cy.get('article[aria-label="Comment"]').filter(':contains("Hello 👋")').should('be.visible');
            });
    });

    it('create comment with only emoji', () => {
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

                cy.get('article[aria-label="Comment"]').should('have.length', 1);

                cy.intercept('/api/posts/1/comments').as('create');
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Choose an emoji"]').click();
            });

        cy.get('[aria-label="Emojis list"]').within(() => {
            cy.get('button').contains('😃').click();
            cy.get('button').contains('😅').click();
            cy.get('button').contains('🤣').click();
            cy.get('button').contains('🙂').click();
            cy.get('button').contains('🥰').click();
            cy.get('button').contains('😝').click();
            cy.get('button').contains('😏').click();
            cy.get('button').contains('😭').click();
            cy.get('button').contains('👍').click();
            cy.get('button').contains('❤️').click();
        });

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('input[aria-label="Write a comment"]').should('have.value', '😃😅🤣🙂🥰😝😏😭👍❤️');

                cy.get('[aria-label="Submit comment"]').click();

                cy.wait('@create');
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').should('have.length', 2);
                cy.get('article[aria-label="Comment"]')
                    .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`)
                    .should('be.visible');

                cy.get('article[aria-label="Comment"]')
                    .filter(':contains("😃😅🤣🙂🥰😝😏😭👍❤️")')
                    .should('be.visible');
            });
    });
});