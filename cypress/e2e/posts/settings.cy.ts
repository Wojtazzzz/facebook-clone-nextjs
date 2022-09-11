import { useDatabaseMigrations } from 'cypress-laravel';
import type { IPost } from '@cypress/support/types';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Posts settings tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('open post settings, settings close when click on outside component', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.get('[aria-label="Settings"]').should('be.visible');

        cy.get('[data-testid="menu"]').click();

        cy.get('[aria-label="Settings"]').should('not.exist');
    });

    it('open post settings on own post, delete post, post dissapears from posts list', () => {
        cy.create('Post', 2, {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 2);
        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();

                cy.intercept('/api/posts/1').as('delete');
                cy.intercept('/api/posts?page=1').as('posts_page_1');
            });

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('button[aria-label="Delete"]').click();
        });

        cy.wait('@delete');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);
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

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/posts/1/turn-off-comments').as('turnOffComments');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('button[aria-label="Turn on comments"]').should('not.exist');

            cy.get('button[aria-label="Turn off comments"]').click();
        });

        cy.wait('@turnOffComments');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Comment"]').click();
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME} turned off commenting for this post.`);

                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/posts/1/turn-on-comments').as('turnOnComments');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('button[aria-label="Turn off comments"]').should('not.exist');

            cy.get('button[aria-label="Turn on comments"]').click();
        });

        cy.wait('@turnOnComments');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME} turned off commenting for this post.`).should(
                    'not.exist'
                );

                cy.get('[aria-label="Write a comment"]').should('be.visible');
            });
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

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 2);
        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/hidden/posts').as('hide');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('button[aria-label="Hide"]').click();
        });

        cy.wait('@hide');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);

        cy.visit('/profile/1');

        cy.intercept('/api/hidden/posts?page=1').as('hiddenPosts');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.get('[data-testid="posts-list"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[data-testid="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/hidden/posts/1').as('unhide');
        cy.intercept('/api/hidden/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('button[aria-label="Unhide"]').click();
        });

        cy.wait('@unhide');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="posts-list"] article[aria-label="Post"]').should('not.exist');

        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 2);
    });

    it("open settings on someone's post, save post, post settings dissapears, post not dissapears from list, post displays on user's list of saved posts", () => {
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

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 2);
        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();
            });

        cy.intercept('/api/saved/posts').as('save');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('button[aria-label="Save"]').click();
        });

        cy.wait('@save');

        cy.get('[aria-label="Settings"]').should('not.exist');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 2);

        cy.visit('/profile/1');

        cy.intercept('/api/saved/posts?page=1').as('savedPosts');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.get('[data-testid="posts-list"] article[aria-label="Post"]').should('have.length', 1);
    });
});
