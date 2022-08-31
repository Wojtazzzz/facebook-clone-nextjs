import { useDatabaseMigrations } from 'cypress-laravel';

const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');
const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');

describe('Post tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('like post by click on "Like Button" and dislike when click second time', () => {
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
                cy.intercept('/api/posts/1/likes').as('like');
                cy.intercept('/api/posts?page=1').as('posts_page_1');

                cy.get('button[aria-label="Like"]').click();

                cy.wait('@like');
                cy.wait('@posts_page_1');

                cy.get('[data-testid="post-likesCount"]').contains('1').should('be.visible');

                cy.intercept('/api/posts/1/likes').as('like');
                cy.intercept('/api/posts?page=1').as('posts_page_1');

                cy.get('button[aria-label="Like"]').click();

                cy.wait('@like');
                cy.wait('@posts_page_1');

                cy.get('[data-testid="post-likesCount"]').should('not.exist');
            });
    });

    it('click on "Like Button" and see api error component when api return server error', () => {
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
                cy.intercept('/api/posts/1/likes', { statusCode: 500 }).as('like');

                cy.get('button[aria-label="Like"]').click();

                cy.wait('@like');
                cy.get('[data-testid="like-apiError"]').should('be.visible');
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

    it("click on post's author redirects to his profile", () => {
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
                cy.intercept('/api/posts/1/likes').as('like');
                cy.intercept('/api/posts?page=1').as('posts_page_1');

                cy.contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`).click();

                cy.url().should('contain', '/profile/1');
            });
    });

    it("like friend's post, dislike, like again, relogin to friend account, see only one like notification, notification redirect to user profile", () => {
        cy.create('Friendship', {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.create('Post', {
            author_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .should('have.length', 1)
            .within(() => {
                cy.intercept('/api/posts/1/likes').as('like');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@like');

                cy.intercept('/api/posts/1/likes').as('dislike');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@dislike');
            });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="list-of-notifications"] button').should('not.exist');

        cy.relogin(2);

        cy.checkNotification(`${USER_FIRST_NAME} ${USER_LAST_NAME}`, 'Liked your post', true);

        cy.url().should('contain', '/profile/1');
    });

    it('like own post, notification list is empty', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .should('have.length', 1)
            .within(() => {
                cy.intercept('/api/posts/1/likes').as('like');

                cy.get('button[aria-label="Like"]').click();
                cy.wait('@like');
            });

        cy.intercept('/api/notifications?page=1').as('notifications_page_1');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Notifications"]').click();
        });

        cy.wait('@notifications_page_1');

        cy.get('[id="list-of-notifications"] button').should('not.exist');
    });
});
