import { useDatabaseMigrations } from 'cypress-laravel';
import type { IPost } from '@cypress/support/types';

describe('Posts list tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it("user see own post and friend's post but can't see stranger's post", () => {
        const posts = {
            user: {} as IPost,
            friend: {} as IPost,
            stranger: {} as IPost,
        };

        // User's post
        cy.create('Post', {
            author_id: 1,
        }).then((post) => (posts.user = post));

        // Friend's post
        cy.create('Post').then((post) => {
            posts.friend = post;

            cy.create('Friendship', {
                user_id: 1,
                friend_id: post.author_id,
                status: 'CONFIRMED',
            });
        });

        // Stranger's post
        cy.create('Post').then((post) => (posts.stranger = post));

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"]').within(() => {
            // User's post
            cy.contains(posts.user.content).should('be.visible');

            // Friend's post
            cy.contains(posts.friend.content).should('be.visible');

            // Stranger's post
            cy.contains(posts.stranger.content).should('not.exist');
        });
    });

    it('hidden posts are not displayed on list', () => {
        cy.create('Friendship', {
            user_id: 1,
            status: 'CONFIRMED',
        }).then((friendship) => {
            cy.create('Post', 3, {
                author_id: friendship.friend_id,
            });

            cy.create('HiddenPost', {
                user_id: 1,
                post_id: 1,
            });

            cy.create('HiddenPost', {
                user_id: 1,
                post_id: 2,
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 1);
    });

    it("friend's hidden posts are visible for logged user", () => {
        cy.create('Friendship', 2, {
            user_id: 1,
            status: 'CONFIRMED',
        }).then((friendships) => {
            const [firstFS, secondFS] = friendships;

            cy.create('Post', 3, {
                author_id: firstFS.friend_id,
            }).then((posts) => {
                const [firstPost] = posts;

                cy.create('HiddenPost', {
                    user_id: secondFS.friend_id,
                    post_id: firstPost.id,
                });
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 3);
    });

    it('list render empty component when api return empty data', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });

    it('list render error component when api return server error', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1', { statusCode: 500 }).as('posts_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('not.exist');
        cy.get('[data-testid="server-error"]').should('be.visible');
    });
});
