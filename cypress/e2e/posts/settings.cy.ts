import { useDatabaseMigrations } from 'cypress-laravel';
import type { IPost } from '@cypress/support/types';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Posts settings tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('settings can be closed by click outside or press esc', () => {
        cy.create('Post', {
            author_id: 1,
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
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.checkPageA11y();

        cy.get('[data-testid="settings-list"]').should('be.visible');
        cy.get('body').type('{esc}');
        cy.get('[data-testid="settings-list"]').should('not.exist');

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.get('[data-testid="settings-list"]').should('be.visible');
        cy.get('body').click();
        cy.get('[data-testid="settings-list"]').should('not.exist');
    });

    it('open post settings on own post, delete post, see confirm alert, confirm, post dissapears from posts list', () => {
        cy.create('Post', 2, {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts().should('have.length', 2);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.checkPageA11y();

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Delete"]').click();
        });

        cy.intercept('/api/posts/1').as('delete');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.expectConfirm('Are you sure you want to delete this post?', 'yes');

        cy.wait('@delete');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
    });

    it('open post settings on own post, delete post, see confirm alert, confirm, see server error', () => {
        cy.create('Post', 2, {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts().should('have.length', 2);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.checkPageA11y();

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Delete"]').click();
        });

        cy.intercept('/api/posts/1', { statusCode: 500 }).as('delete');

        cy.expectConfirm('Are you sure you want to delete this post?', 'yes');

        cy.wait('@delete');

        cy.expectAlert('Something went wrong, try again later');

        cy.get('body').type('{esc}');

        cy.getPosts().should('have.length', 2);
    });

    it('open post settings on own post, turn off comments, check that comments are off, turn on comments, try to create new comment', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/posts/1/turn-off-comments').as('turnOffComments');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Turn on comments"]').should('not.exist');

            cy.get('button[aria-label="Turn off comments"]').click();
        });

        cy.wait('@turnOffComments');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Comment"]').click();
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME} turned off commenting for this post.`);

                cy.checkPageA11y();

                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/posts/1/turn-on-comments').as('turnOnComments');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Turn off comments"]').should('not.exist');

            cy.get('button[aria-label="Turn on comments"]').click();
        });

        cy.wait('@turnOnComments');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME} turned off commenting for this post.`).should(
                    'not.exist'
                );

                cy.get('[aria-label="Write a comment"]').should('be.visible');

                cy.checkPageA11y();
            });
    });

    it('turn off comments, see server error', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/posts/1/turn-off-comments', { statusCode: 500 }).as('turnOffComments');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Turn on comments"]').should('not.exist');
            cy.get('button[aria-label="Turn off comments"]').click();
        });

        cy.wait('@turnOffComments');

        cy.expectAlert('Something went wrong, try again later');
    });

    it('turn on comments, see server error', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/posts/1/turn-off-comments').as('turnOffComments');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Turn on comments"]').should('not.exist');
            cy.get('button[aria-label="Turn off comments"]').click();
        });

        cy.wait('@turnOffComments');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/posts/1/turn-on-comments', { statusCode: 500 }).as('turnOnComments');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Turn off comments"]').should('not.exist');
            cy.get('button[aria-label="Turn on comments"]').click();
        });

        cy.expectAlert('Something went wrong, try again later');
    });

    it("open settings on someone's post, hide post, post dissapears from list, post displays on user's list of hidden posts, unhide post, post display again on main post list", () => {
        cy.create('Post', 2).then((posts) => {
            posts.forEach((post: IPost) => {
                cy.create('Friendship', {
                    user_id: 1,
                    friend_id: post.author_id,
                    status: 'CONFIRMED',
                });
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 2);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/hidden/posts').as('hide');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Hide"]').click();
        });

        cy.wait('@hide');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);

        cy.visit('/profile/1');

        cy.intercept('/api/hidden/posts?page=1').as('hiddenPosts');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/hidden/posts/1').as('unhide');
        cy.intercept('/api/hidden/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Unhide"]').click();
        });

        cy.wait('@unhide');
        cy.wait('@posts_page_1');

        cy.getPosts().should('not.exist');

        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 2);
    });

    it("open settings on someone's post, hide post, see server error", () => {
        cy.create('Post').then((post) => {
            cy.create('Friendship', {
                user_id: 1,
                friend_id: post.author_id,
                status: 'CONFIRMED',
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/hidden/posts', { statusCode: 500 }).as('hide');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Hide"]').click();
        });

        cy.wait('@hide');

        cy.expectAlert('Something went wrong, try again later');
    });

    it("open settings on someone's post, hide post, post dissapears from list, post displays on user's list of hidden posts, unhide post, see server error", () => {
        cy.create('Post').then((post) => {
            cy.create('Friendship', {
                user_id: 1,
                friend_id: post.author_id,
                status: 'CONFIRMED',
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/hidden/posts').as('hide');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Hide"]').click();
        });

        cy.wait('@hide');
        cy.wait('@posts_page_1');

        cy.getPosts().should('not.exist');

        cy.visit('/profile/1');

        cy.intercept('/api/hidden/posts?page=1').as('hiddenPosts');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/hidden/posts/1', { statusCode: 500 }).as('unhide');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Unhide"]').click();
        });

        cy.wait('@unhide');

        cy.expectAlert('Something went wrong, try again later');
    });

    it("open settings on someone's post, save post, post settings dissapears, post not dissapears from list, post displays on user's list of saved posts, unsave post, post dissapear from list of saved posts", () => {
        cy.create('Post', 2).then((posts) => {
            posts.forEach((post: IPost) => {
                cy.create('Friendship', {
                    user_id: 1,
                    friend_id: post.author_id,
                    status: 'CONFIRMED',
                });
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 2);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/saved/posts').as('save');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Save"]').click();
        });

        cy.wait('@save');

        cy.get('[data-testid="settings-list"]').should('not.exist');

        cy.getPosts().should('have.length', 2);

        cy.visit('/profile/1');

        cy.intercept('/api/saved/posts?page=1').as('savedPosts');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/saved/posts/1').as('unsave');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Unsave"]').click();
        });

        cy.wait('@unsave');
        cy.wait('@posts_page_1');

        cy.getPosts().should('not.exist');
    });

    it("open settings on someone's post, save post, see server error", () => {
        cy.create('Post').then((post) => {
            cy.create('Friendship', {
                user_id: 1,
                friend_id: post.author_id,
                status: 'CONFIRMED',
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/saved/posts', { statusCode: 500 }).as('save');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Save"]').click();
        });

        cy.wait('@save');

        cy.expectAlert('Something went wrong, try again later');
    });

    it("open settings on someone's post, save post, unsave post, see server error", () => {
        cy.create('Post').then((post) => {
            cy.create('Friendship', {
                user_id: 1,
                friend_id: post.author_id,
                status: 'CONFIRMED',
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/saved/posts').as('save');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Save"]').click();
        });

        cy.wait('@save');

        cy.get('[data-testid="settings-list"]').should('not.exist');

        cy.getPosts().should('have.length', 1);

        cy.visit('/profile/1');

        cy.intercept('/api/saved/posts?page=1').as('savedPosts');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/saved/posts/1', { statusCode: 500 }).as('unsave');

        cy.get('[data-testid="settings-list"]').within(() => {
            cy.get('button[aria-label="Unsave"]').click();
        });

        cy.wait('@unsave');

        cy.expectAlert('Something went wrong, try again later');

        cy.get('body').type('{esc}');

        cy.getPosts().should('have.length', 1);
    });
});
