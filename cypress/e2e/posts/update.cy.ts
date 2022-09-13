import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Update post tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it("open UpdatePostModal by click on Update within post's settings, content and images has properly value, modal can be closed by esc", () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png', '/posts/secondImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.openUpdatePostModal();

        cy.get('[aria-label="Post content"]').should('have.value', 'Test content');
        cy.get('[aria-label="List of already uploaded files"]').children().should('have.length', 2);

        cy.get('body').type('{esc}');

        cy.get('[aria-label="Update post modal"]').should('not.exist');
    });

    it('cannot update content to too short content', () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png', '/posts/secondImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.openUpdatePostModal();

        cy.get('[aria-label="Post content"]').clear().type('T');

        cy.get('button[aria-label="Update post"]').click();

        cy.contains('Post must be at least 2 characters');
    });

    it('can remove content from post', () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png', '/posts/secondImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('article[aria-label="Post"]').should('contain.text', 'Test content');

        cy.openUpdatePostModal();

        cy.get('[aria-label="Post content"]').clear();
        cy.get('button[aria-label="Update post"]').click();

        cy.get('[aria-label="Update post modal"]').should('not.exist');

        cy.get('article[aria-label="Post"]').should('not.contain.text', 'Test content');
    });

    it('can add content to post which has not content', () => {
        cy.create('Post', {
            author_id: 1,
            images: ['/posts/firstImg.png', '/posts/secondImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('article[aria-label="Post"]').should('not.contain.text', 'New post content');

        cy.openUpdatePostModal();

        cy.get('[aria-label="Post content"]').type('New post content');
        cy.get('button[aria-label="Update post"]').click();

        cy.get('[aria-label="Update post modal"]').should('not.exist');

        cy.get('article[aria-label="Post"]').should('contain.text', 'New post content');
    });

    it('can add images to post which has images', () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('have.length', 1);
        });

        cy.openUpdatePostModal();

        cy.get('button[aria-label="Show files uploader"]').click();

        cy.get('input[type="file"]').attachFile('/postImage1.jpg');

        cy.get('button[aria-label="Update post"]').click();

        cy.get('[aria-label="Update post modal"]').should('not.exist');

        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('have.length', 2);
        });
    });

    it('can add images to post which has not images', () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: [],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Show gallery"]').should('not.exist');

        cy.openUpdatePostModal();

        cy.get('button[aria-label="Show files uploader"]').click();

        cy.get('input[type="file"]').attachFile('/postImage1.jpg');

        cy.get('button[aria-label="Update post"]').click();

        cy.get('[aria-label="Update post modal"]').should('not.exist');

        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('have.length', 1);
        });
    });

    it('can remove images from post', () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('have.length', 1);
        });

        cy.openUpdatePostModal();

        cy.get('[aria-label="List of already uploaded files"]')
            .children()
            .first()
            .within(() => {
                cy.get('[aria-label="Remove file"]').click();
            });

        cy.get('button[aria-label="Update post"]').click();

        cy.get('[aria-label="Update post modal"]').should('not.exist');

        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('not.exist');
        });
    });

    it('cannot add to post image with illegal extension', () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: [],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.openUpdatePostModal();

        cy.get('button[aria-label="Show files uploader"]').click();
        cy.get('input[type="file"]').attachFile('/file.pdf', { allowEmpty: true });

        cy.get('button[aria-label="Update post"]').click();

        cy.get('button[aria-label="Show gallery"]').should('not.exist');
    });

    it("delete file when removed post's content and images", () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.openUpdatePostModal();

        cy.get('[aria-label="List of already uploaded files"]')
            .children()
            .first()
            .within(() => {
                cy.get('[aria-label="Remove file"]').click();
            });
        cy.get('[aria-label="Post content"]').clear();

        cy.get('button[aria-label="Update post"]').click();

        cy.get('[aria-label="Update post modal"]').should('not.exist');
        cy.get('article[aria-label="Post"]').should('not.exist');
    });

    it('update content, see server error', () => {
        cy.intercept('/api/posts/1', { statusCode: 500 });

        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png', '/posts/secondImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.openUpdatePostModal();

        cy.get('[aria-label="Post content"]').clear().type('New content');

        cy.get('button[aria-label="Update post"]').click();

        cy.contains('Something went wrong, please try again later');
    });

    it('can add new and remove old images from post', () => {
        cy.create('Post', {
            author_id: 1,
            content: 'Test content',
            images: ['/posts/firstImg.png'],
        });

        cy.intercept('/api/user').as('user');

        cy.visit('/');
        cy.wait('@user');

        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('have.length', 1);
        });

        cy.openUpdatePostModal();

        cy.get('[aria-label="List of already uploaded files"]')
            .children()
            .first()
            .within(() => {
                cy.get('[aria-label="Remove file"]').click();
            });

        cy.get('button[aria-label="Show files uploader"]').click();

        cy.get('input[type="file"]').attachFile('/postImage1.jpg');
        cy.get('input[type="file"]').attachFile('/postImage2.jpg');

        cy.get('button[aria-label="Update post"]').click();

        cy.get('[aria-label="Update post modal"]').should('not.exist');

        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('have.length', 2); //
        });

        cy.get('button[aria-label="Show gallery"]').should('not.contain.text', '+1');
        cy.get('button[aria-label="Show gallery"]').should('not.contain.text', '+2');
        cy.get('button[aria-label="Show gallery"]').should('not.contain.text', '+3');
        cy.get('button[aria-label="Show gallery"]').within(() => {
            cy.get('img').should('have.length', 2);
        });
    });
});
