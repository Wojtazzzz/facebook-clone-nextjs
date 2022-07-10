import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Create post tests', () => {
    useDatabaseMigrations();

    const newPostContent = 'New simple post for test case';

    beforeEach(() => {
        cy.loginRequest();
    });

    it('click on fake form opens CreatePostModal within is form, fill form with content and images and submit, modal close after successfull response, new post show on list', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button').contains(`What's on your mind, ${USER_FIRST_NAME}?`).click();
        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.intercept('/api/posts').as('posts');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show input file"]').click();
        cy.get('[aria-label="Post content"]').type(newPostContent);
        cy.get('input[type=file]').attachFile('/postImage1.jpg');

        cy.get('ul > h5').contains('Uploaded files: 1');
        cy.get('ul').contains('postImage1.jpg').should('be.visible');

        cy.get('button').contains('Create post').click();

        cy.wait('@posts');
        cy.wait('@posts_page_1');

        cy.get('[aria-label="Create post modal"]').should('not.exist');

        cy.get('article[aria-label="Post"]').first().contains(newPostContent).should('be.visible');
        cy.get('article[aria-label="Post"]')
            .first()
            .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`)
            .should('be.visible');
        cy.get('section[aria-label="Images"] img').should('have.length', 1);
    });

    it('create post with only content, new post on list not display images', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button').contains(`What's on your mind, ${USER_FIRST_NAME}?`).click();
        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.intercept('/api/posts').as('posts');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show input file"]').click();
        cy.get('[aria-label="Post content"]').type(newPostContent);
        cy.get('button').contains('Create post').click();

        cy.wait('@posts');
        cy.wait('@posts_page_1');

        cy.get('[aria-label="Create post modal"]').should('not.exist');

        cy.get('article[aria-label="Post"]').first().contains(newPostContent).should('be.visible');
        cy.get('article[aria-label="Post"]')
            .first()
            .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`)
            .should('be.visible');
        cy.get('article[aria-label="Post"] [aria-label="Images"]').should('not.exist');
    });

    it('create post with only images, new post on list not display text content', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button').contains(`What's on your mind, ${USER_FIRST_NAME}?`).click();
        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.intercept('/api/posts').as('posts');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show input file"]').click();
        cy.get('input[type=file]').attachFile([
            '/postImage1.jpg',
            '/postImage2.jpg',
            '/postImage3.jpg',
            '/postImage4.jpg',
        ]);
        cy.get('button').contains('Create post').click();

        cy.wait('@posts');
        cy.wait('@posts_page_1');

        cy.get('button[aria-label="Create post modal"]').should('not.exist');

        cy.get('article[aria-label="Post"]')
            .first()
            .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`)
            .should('be.visible');
        cy.get('section[aria-label="Images"] img').should('have.length', 2);
        cy.get('section[aria-label="Images"]').contains('+2');
    });

    it('upload 5 images during creating post and remove 3 before submit', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button').contains(`What's on your mind, ${USER_FIRST_NAME}?`).click();
        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.intercept('/api/posts').as('posts');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show input file"]').click();
        cy.get('input[type=file]').attachFile([
            '/postImage1.jpg',
            '/postImage2.jpg',
            '/postImage3.jpg',
            '/postImage4.jpg',
            '/postImage5.jpg',
        ]);

        cy.get('ul > h5').contains('Uploaded files: 5');
        cy.get('ul').contains('postImage1.jpg').should('be.visible');
        cy.get('ul').contains('postImage2.jpg').should('be.visible');
        cy.get('ul').contains('postImage3.jpg').should('be.visible');
        cy.get('ul').contains('postImage4.jpg').should('be.visible');
        cy.get('ul').contains('postImage5.jpg').should('be.visible');

        cy.get(`button[aria-label="Remove postImage3.jpg from updated files list"]`).click();
        cy.get(`button[aria-label="Remove postImage5.jpg from updated files list"]`).click();

        cy.get('ul > h5').contains('Uploaded files: 3');
        cy.get('ul').contains('postImage1.jpg').should('be.visible');
        cy.get('ul').contains('postImage2.jpg').should('be.visible');
        cy.get('ul').contains('postImage3.jpg').should('not.exist');
        cy.get('ul').contains('postImage4.jpg').should('be.visible');
        cy.get('ul').contains('postImage5.jpg').should('not.exist');

        cy.get('button').contains('Create post').click();

        cy.wait('@posts');
        cy.wait('@posts_page_1');

        cy.get('section[aria-label="Images"] img').should('have.length', 2);
        cy.get('section[aria-label="Images"]').contains('+1');
    });

    it('modal close when click on close modal button', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button').contains(`What's on your mind, ${USER_FIRST_NAME}?`).click();

        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.get('button[aria-label="Close modal"]').click();

        cy.get('[aria-label="Create post modal"]').should('not.exist');
    });

    it('modal close when press esc key', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button').contains(`What's on your mind, ${USER_FIRST_NAME}?`).click();

        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[aria-label="Create post modal"]').should('not.exist');
    });
});
