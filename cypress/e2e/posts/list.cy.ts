import { useDatabaseMigrations } from 'cypress-laravel';
import type { PostType } from '@cypress/support/types';

describe('Posts list tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it("user see own post and friend's post but can't see stranger's post", () => {
        const posts = {
            user: {} as PostType,
            friend: {} as PostType,
            stranger: {} as PostType,
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

    it('user see ten posts and fetch five more when scroll to bottom', () => {
        cy.create('User').then((user) => {
            cy.create('Friendship', {
                user_id: 1,
                friend_id: user.id,
                status: 'CONFIRMED',
            });

            cy.create('Post', 15, {
                author_id: user.id,
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 10);

        cy.intercept('/api/posts?page=1').as('posts_page_1');
        cy.intercept('/api/posts?page=2').as('posts_page_2');

        cy.get('[id="posts-list"]').scrollTo('bottom', { ensureScrollable: false });

        cy.wait('@posts_page_1');
        cy.wait('@posts_page_2');

        cy.get('[id="posts-list"] article[aria-label="Post"]').should('have.length', 15);
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

    it('like post on click on "Like Button" and dislike when click second time', () => {
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
                cy.intercept('/api/likes').as('like');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@like');

                cy.get('[data-testid="post-likes_count"]').contains('1').should('be.visible');

                cy.intercept('/api/likes/1').as('like');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@like');

                cy.get('[data-testid="post-likes_count"]').should('not.exist');
            });
    });

    it("open gallery when click on post's images, navigate between images with buttons", () => {
        cy.create('Post', {
            author_id: 1,
            images: [
                'https://picsum.photos/seed/62caeb2286cc3/850/350',
                'https://picsum.photos/seed/62caeb938b8ca/850/350',
                'https://picsum.photos/seed/62caeb938b8c6/850/350',
            ],
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('section[aria-label="Images"]').click();
                cy.get('section[aria-label="Post gallery"]').should('be.visible');

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-button-next"]').click();
                cy.get('[class*="swiper-button-next"]').click();

                cy.get('[class*="swiper-button-prev"]').should('not.have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-button-prev"]').click();
                cy.get('[class*="swiper-button-prev"]').click();

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');
            });
    });
});
