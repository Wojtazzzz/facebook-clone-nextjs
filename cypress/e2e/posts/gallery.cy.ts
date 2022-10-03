import { useDatabaseMigrations } from 'cypress-laravel';

describe('Post tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it("open gallery by click on post's images, navigate between images with buttons, close gallery by press esc", () => {
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

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show gallery"]').click();
                cy.get('[aria-label="Gallery of post images"]').should('be.visible');

                /* 1/3 */
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('button[aria-label="Next image"]').click();

                /* 2/3 slide */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('button[aria-label="Next image"]').click();

                /* 3/3 */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8c6"]').should('be.visible');
                });

                cy.get('button[aria-label="Prev image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('button[aria-label="Next image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Prev image"]').click();

                /* 2/3 */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('button[aria-label="Prev image"]').click();

                /* 1/3 */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'false');
            });

        cy.get('body').type('{esc}');

        cy.get('[aria-label="Gallery of post images"]').should('not.exist');
    });

    it('cannot go to slides which not exists, close gallery by close button', () => {
        cy.create('Post', {
            author_id: 1,
            images: [
                'https://picsum.photos/seed/62caeb2286cc3/850/350',
                'https://picsum.photos/seed/62caeb938b8ca/850/350',
            ],
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show gallery"]').click();
                cy.get('[aria-label="Gallery of post images"]').should('be.visible');

                /* 1/2 */
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('button[aria-label="Prev image"]').click({ force: true });

                /* 1/2 */
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('button[aria-label="Next image"]').click();

                /* 2/2 */
                cy.get('button[aria-label="Prev image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('button[aria-label="Next image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                });

                cy.get('button[aria-label="Next image"]').click({ force: true });

                /* 2/2 */
                cy.get('button[aria-label="Prev image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('button[aria-label="Next image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                });

                cy.get('button[aria-label="Prev image"]').click();

                /* 1/2 */
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('button[aria-label="Prev image"]').click({ force: true });

                /* 1/2 */
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('not.have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'false');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('button[aria-label="Close gallery"]').click();

                cy.get('[aria-label="Gallery of post images"]').should('not.exist');
            });
    });

    it('cannot go to another slides when post has only one image', () => {
        cy.create('Post', {
            author_id: 1,
            images: ['https://picsum.photos/seed/62caeb2286cc3/850/350'],
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show gallery"]').click();
                cy.get('[aria-label="Gallery of post images"]').should('be.visible');

                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });

                cy.get('button[aria-label="Prev image"]').click({ force: true });

                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });

                cy.get('button[aria-label="Next image"]').click({ force: true });

                cy.get('button[aria-label="Prev image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Prev image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('button[aria-label="Next image"]').should('have.attr', 'disabled');
                cy.get('button[aria-label="Next image"]').should('have.attr', 'aria-disabled', 'true');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });
            });
    });

    it('can navigate due to thumbs', () => {
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

        cy.getPosts()
            .first()
            .within(() => {
                cy.get('button[aria-label="Show gallery"]').click();
                cy.get('[aria-label="Gallery of post images"]').should('be.visible');

                cy.get('[data-testid="gallery-thumbs"]').children().should('have.length', 3);

                /* 1/3 */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(0)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'true');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(1)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(2)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });

                cy.get('[data-testid="gallery-thumbs"]').children().eq(1).click();

                /* 2/3 */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(0)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(1)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'true');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(2)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });

                cy.get('[data-testid="gallery-thumbs"]').children().eq(2).click();

                /* 3/3 */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb938b8c6"]').should('be.visible');
                });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(0)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(1)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(2)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'true');
                    });

                cy.get('[data-testid="gallery-thumbs"]').children().eq(0).click();

                /* 1/3 */
                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(0)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'true');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(1)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });

                cy.get('[data-testid="gallery-thumbs"]')
                    .children()
                    .eq(2)
                    .within(() => {
                        cy.get('button').should('have.attr', 'aria-pressed', 'false');
                    });
            });
    });
});
