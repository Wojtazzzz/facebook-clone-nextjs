import { useDatabaseMigrations } from 'cypress-laravel';
import type { IPost } from '@cypress/support/types';

describe('Posts settings tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('open post settings, settings closes when click on outside component', () => {
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
                cy.get('[aria-label="Settings"]').should('be.visible');
            });

        cy.get('[data-testid="sidebar"]').click();

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('[aria-label="Settings"]').should('not.exist');
            });
    });

    it('open post settings and click delete post, post dissapears from posts list', () => {
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

                cy.get('[aria-label="Settings"]').should('be.visible');
                cy.get('[aria-label="Settings"] > button[aria-label="Delete post"]').click();

                cy.wait('@delete');

                cy.get('[aria-label="Settings"]').should('not.exist');
            });

        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);
    });

    it("open post settings which is not own post, 'Delete option' is not showing", () => {
        cy.create('Post').then((post) => {
            cy.create('Friendship', {
                user_id: post.author_id,
                friend_id: 1,
                status: 'CONFIRMED',
            });
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

                cy.get('[aria-label="Settings"]').should('be.visible');
                cy.get('[aria-label="Settings"] > button[aria-label="Delete post"]').should('not.exist');
            });
    });

    it('open post settings, click on "Hide post" option, post settings dissapears, post dissapears from list', () => {
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

                cy.intercept('/api/hidden/posts').as('hide');
                cy.intercept('/api/posts?page=1').as('posts_page_1');

                cy.get('[aria-label="Settings"]').should('be.visible');
                cy.get('[aria-label="Settings"] > button[aria-label="Hide post"]').click();

                cy.wait('@hide');

                cy.get('[aria-label="Settings"]').should('not.exist');
            });

        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);
    });

    it('open post settings, don\'t see "Hide post" option beacuse this post is own', () => {
        cy.create('Post', 3, {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 3);
        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Show post settings"]').click();

                cy.get('[aria-label="Settings"]').should('be.visible');
                cy.get('[aria-label="Settings"] > button[aria-label="Hide post"]').should('not.exist');
            });
    });
});
