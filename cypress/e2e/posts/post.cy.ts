import { useDatabaseMigrations } from 'cypress-laravel';

describe('Post tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    // it('like post on click on "Like Button" and dislike when click second time', () => {
    //     cy.create('Post').then((post) => {
    //         cy.create('Friendship', {
    //             user_id: post.author_id,
    //             friend_id: 1,
    //             status: 'CONFIRMED',
    //         });
    //     });

    //     cy.intercept('/api/user').as('user');
    //     cy.intercept('/api/posts?page=1').as('posts_page_1');

    //     cy.visit('/');
    //     cy.wait('@user');
    //     cy.wait('@posts_page_1');

    //     cy.get('[id="posts-list"] article[aria-label="Post"]')
    //         .first()
    //         .within(() => {
    //             cy.intercept('/api/posts/1/likes').as('like');
    //             cy.intercept('/api/posts?page=1').as('posts_page_1');

    //             cy.get('button[aria-label="Like"]').click();

    //             cy.wait('@like');
    //             cy.wait('@posts_page_1');

    //             cy.get('[data-testid="post-likes_count"]').contains('1').should('be.visible');

    //             cy.intercept('/api/posts/1/likes').as('like');
    //             cy.intercept('/api/posts?page=1').as('posts_page_1');

    //             cy.get('button[aria-label="Like"]').click();

    //             cy.wait('@like');
    //             cy.wait('@posts_page_1');

    //             cy.get('[data-testid="post-likes_count"]').should('not.exist');
    //         });
    // });

    // it("open gallery when click on post's images, navigate between images with buttons", () => {
    //     cy.create('Post', {
    //         author_id: 1,
    //         images: [
    //             'https://picsum.photos/seed/62caeb2286cc3/850/350',
    //             'https://picsum.photos/seed/62caeb938b8ca/850/350',
    //             'https://picsum.photos/seed/62caeb938b8c6/850/350',
    //         ],
    //     });

    //     cy.intercept('/api/user').as('user');
    //     cy.intercept('/api/posts?page=1').as('posts_page_1');

    //     cy.visit('/');
    //     cy.wait('@user');
    //     cy.wait('@posts_page_1');

    //     cy.get('[id="posts-list"] article[aria-label="Post"]')
    //         .first()
    //         .within(() => {
    //             cy.get('section[aria-label="Images"]').click();
    //             cy.get('section[aria-label="Post gallery"]').should('be.visible');

    //             cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
    //             cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');

    //             cy.get('[class*="swiper-button-next"]').click();
    //             cy.get('[class*="swiper-button-next"]').click();

    //             cy.get('[class*="swiper-button-prev"]').should('not.have.class', 'swiper-button-disabled');
    //             cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

    //             cy.get('[class*="swiper-button-prev"]').click();
    //             cy.get('[class*="swiper-button-prev"]').click();

    //             cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
    //             cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');
    //         });
    // });

    it('show tooltip with users which liked post when hover on count of likes', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.create('Like', 5, {
            likeable_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="post-likesTooltip"]').should('not.exist');

        cy.get('[data-testid="post-likes_count"]').click();

        cy.get('[data-testid="post-likesTooltip"]').should('be.visible');

        // multiple beacuse tooltip in dom is rendering twice
        cy.get('[aria-label="Like added by"]').should('have.length', 5 * 2);
    });

    it('when fetched more than 12 likes tooltip render max 12 users and show more likes info', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.create('Like', 22, {
            likeable_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="post-likesTooltip"]').should('not.exist');

        cy.get('[data-testid="post-likes_count"]').click();

        cy.get('[data-testid="post-likesTooltip"]').should('be.visible');

        // multiple beacuse tooltip in dom is rendering twice
        cy.get('[aria-label="Like added by"]').should('have.length', 12 * 2);
        cy.get('[data-testid="post-likesTooltip"]').should('include.text', 'and 10 more...');
    });
});
