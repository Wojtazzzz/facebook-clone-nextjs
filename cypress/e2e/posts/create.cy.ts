import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Create post tests', () => {
    useDatabaseMigrations();

    const newPostContent = 'New simple post for test case';

    beforeEach(() => {
        cy.loginRequest();
    });

    it('open CreatePostModal by click on fake form, fill form with content and images and submit, modal close after successfull response, new post render on list', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();
        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.intercept('/api/posts').as('create');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show files uploader"]').click();
        cy.get('[aria-label="Post content"]').type(newPostContent);
        cy.get('input[type=file]').attachFile('/postImage1.jpg');

        cy.get('h5').contains('Uploaded files: 1');
        cy.get('ul').contains('postImage1.jpg').should('be.visible');

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.get('[aria-label="Create post modal"]').should('not.exist');

        cy.getPosts().first().contains(newPostContent).should('be.visible');
        cy.getPosts().first().contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);
        cy.get('button[aria-label="Show gallery"] img').should('have.length', 1);
    });

    it('see validation error when try to create post without any content, on refreshed page can see empty list', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();

        cy.get('[aria-label="Create post modal"]').within(() => {
            cy.get('button[aria-label="Create post"]').click();

            cy.contains('Post must contain text or image(s)').should('be.visible');
        });

        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('create new post, response return server error, modal not hide and render api error component', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();

        cy.intercept('/api/posts', { statusCode: 500 }).as('create');

        cy.get('button[aria-label="Show files uploader"]').click();
        cy.get('[aria-label="Post content"]').type(newPostContent);
        cy.get('input[type=file]').attachFile('/postImage1.jpg');

        cy.get('h5').contains('Uploaded files: 1');
        cy.get('ul').contains('postImage1.jpg').should('be.visible');

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');

        cy.get('[aria-label="Create post modal"]').within(() => {
            cy.contains('Something went wrong, please try again later');
        });
    });

    it('create post with only content, new post on list not display images', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();

        cy.intercept('/api/posts').as('create');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Post content"]').type(newPostContent);
        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.get('[aria-label="Create post modal"]').should('not.exist');

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('section[aria-label="Content"]').contains(newPostContent);
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);
                cy.get('[aria-label="Images"]').should('not.exist');
            });
    });

    it('create post with only images, new post on list not display text content', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();

        cy.intercept('/api/posts').as('create');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show files uploader"]').click();
        cy.get('input[type=file]').attachFile([
            '/postImage1.jpg',
            '/postImage2.jpg',
            '/postImage3.jpg',
            '/postImage4.jpg',
        ]);

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.get('button[aria-label="Create post modal"]').should('not.exist');

        cy.getPosts()
            .first()
            .within(() => {
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);
                cy.get('button[aria-label="Show gallery"] img').should('have.length', 2);
                cy.get('button[aria-label="Show gallery"]').contains('+2');
                cy.get('section[aria-label="Content"]').should('not.exist');
            });
    });

    it('upload 5 images during creating post and remove 3 before submit, created post contains 3 images', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();

        cy.intercept('/api/posts').as('create');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show files uploader"]').click();
        cy.get('input[type=file]').attachFile([
            '/postImage1.jpg',
            '/postImage2.jpg',
            '/postImage3.jpg',
            '/postImage4.jpg',
            '/postImage5.jpg',
        ]);

        cy.get('[data-testid="uploaded-files"]').within(() => {
            cy.contains('Uploaded files: 5');
            cy.contains('postImage1.jpg').should('be.visible');
            cy.contains('postImage2.jpg').should('be.visible');
            cy.contains('postImage3.jpg').should('be.visible');
            cy.contains('postImage4.jpg').should('be.visible');
            cy.contains('postImage5.jpg').should('be.visible');
        });

        cy.get(`button[aria-label="Remove postImage3.jpg from updated files list"]`).click({ force: true });
        cy.get(`button[aria-label="Remove postImage5.jpg from updated files list"]`).click({ force: true });

        cy.get('[data-testid="uploaded-files"]').within(() => {
            cy.contains('Uploaded files: 3');
            cy.contains('postImage1.jpg').should('be.visible');
            cy.contains('postImage2.jpg').should('be.visible');
            cy.contains('postImage3.jpg').should('not.exist');
            cy.contains('postImage4.jpg').should('be.visible');
            cy.contains('postImage5.jpg').should('not.exist');
        });

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`);
                cy.get('button[aria-label="Show gallery"] img').should('have.length', 2);
                cy.get('button[aria-label="Show gallery"]').contains('+1');
                cy.get('section[aria-label="Content"]').should('not.exist');
            });
    });

    it('modal close when click on close modal button', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();

        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.get('button[aria-label="Close modal"]').click();

        cy.get('[aria-label="Create post modal"]').should('not.exist');
    });

    it('modal close when press esc key', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Create a post"]').click();

        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[aria-label="Create post modal"]').should('not.exist');
    });
});
