import { useDatabaseMigrations } from 'cypress-laravel';
import { xorBy } from 'cypress/types/lodash';

const USER_NAME = `${Cypress.env('USER_FIRST_NAME')} ${Cypress.env('USER_LAST_NAME')}`;

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

        cy.injectAxe();

        cy.get('button[aria-label="Create a post"]').click();
        cy.get('[role="dialog"]').should('be.visible');

        cy.checkPageA11y();

        cy.intercept('/api/posts').as('create');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('button[aria-label="Show files uploader"]').click();
        cy.get('[aria-label="Post content"]').click().type(newPostContent);
        cy.get('input[type=file]').attachFile('/postImage1.jpg');

        cy.contains('Uploaded images: 1');
        cy.get('ul').contains('postImage1.jpg').should('be.visible');

        cy.checkPageA11y();

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.get('[role="dialog"]').should('not.exist');

        cy.getPosts().first().contains(newPostContent).should('be.visible');
        cy.getPosts().first().contains(USER_NAME);
        cy.get('button[aria-label="Show gallery"] img').should('have.length', 1);

        cy.checkPageA11y();
    });

    it('see validation error when try to create post without any content, close modal by click on close button, on refreshed page can see empty list', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');
        cy.injectAxe();

        cy.get('button[aria-label="Create a post"]').click();

        cy.get('[role="dialog"]').within(() => {
            cy.get('button[aria-label="Create post"]').click();

            cy.contains('Post must contain text or image(s)').should('be.visible');

            cy.checkPageA11y();

            cy.get('button[aria-label="Close modal"]').should('be.visible').click();
        });

        cy.get('[role="dialog"]').should('not.exist');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.checkPageA11y();
    });

    it('create new post, response return server error, modal not hide and render api error component, hide modal by press esc', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');
        cy.injectAxe();

        cy.get('button[aria-label="Create a post"]').click();
        cy.get('[role="dialog"]').should('be.visible');

        cy.intercept('/api/posts', { statusCode: 500 }).as('create');

        cy.get('button[aria-label="Show files uploader"]').click();
        cy.get('[aria-label="Post content"]').type(newPostContent);
        cy.get('input[type=file]').attachFile('/postImage1.jpg');

        cy.contains('Uploaded images: 1');
        cy.get('ul').contains('postImage1.jpg').should('be.visible');

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');

        cy.get('[role="dialog"]').within(() => {
            cy.contains('Something went wrong, please try again later');
        });

        cy.checkPageA11y();

        cy.get('[role="dialog"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[role="dialog"]').should('not.exist');
    });

    it('create post with only content, new post on list not display images', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.injectAxe();

        cy.get('button[aria-label="Create a post"]').click();

        cy.intercept('/api/posts').as('create');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('textarea[aria-label="Post content"]').click().type(newPostContent);
        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.get('[role="dialog"]').should('not.exist');

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('[data-testid="post-content"]').contains(newPostContent);
                cy.get('[data-testid="post-author"]').contains(USER_NAME);
                cy.get('[aria-label="Show gallery"]').should('not.exist');
            });

        cy.checkPageA11y();
    });

    it('create post with only images, new post on list not display text content', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');
        cy.injectAxe();

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

        cy.checkPageA11y();

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.get('button[aria-label="Create post modal"]').should('not.exist');

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('[data-testid="post-content"]').should('not.exist');
                cy.get('[data-testid="post-author"]').contains(USER_NAME);
                cy.get('button[aria-label="Show gallery"] img').should('have.length', 2);
                cy.get('button[aria-label="Show gallery"]').contains('+2');
            });

        cy.checkPageA11y();
    });

    it('upload 5 images during creating post and remove 3 before submit, created post contains 3 images', () => {
        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');
        cy.injectAxe();

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

        cy.get('[data-testid="createPostModal-scrollableWrapper"]').scrollTo('bottom', { ensureScrollable: false });

        cy.get('[data-testid="uploaded-images"]').within(() => {
            cy.contains('Uploaded images: 5');
            cy.contains('postImage1.jpg').should('exist');
            cy.contains('postImage2.jpg').should('exist');
            cy.contains('postImage3.jpg').should('exist');
            cy.contains('postImage4.jpg').should('exist');
            cy.contains('postImage5.jpg').should('exist');
        });

        cy.checkPageA11y();

        cy.get(`button[aria-label="Remove postImage3.jpg from images list"]`).click({ force: true });
        cy.get(`button[aria-label="Remove postImage5.jpg from images list"]`).click({ force: true });

        cy.get('[data-testid="uploaded-images"]').within(() => {
            cy.contains('Uploaded images: 3');
            cy.contains('postImage1.jpg').should('exist');
            cy.contains('postImage2.jpg').should('exist');
            cy.contains('postImage3.jpg').should('not.exist');
            cy.contains('postImage4.jpg').should('exist');
            cy.contains('postImage5.jpg').should('not.exist');
        });

        cy.checkPageA11y();

        cy.get('button[aria-label="Create post"]').click();

        cy.wait('@create');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('[data-testid="post-content"]').should('not.exist');
                cy.get('[data-testid="post-author"]').contains(USER_NAME);
                cy.get('button[aria-label="Show gallery"] img').should('have.length', 2);
                cy.get('button[aria-label="Show gallery"]').contains('+1');
            });

        cy.checkPageA11y();
    });
});
