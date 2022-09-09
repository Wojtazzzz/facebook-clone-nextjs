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

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('section[aria-label="Images"]').click();
                cy.get('section[aria-label="Post gallery"]').should('be.visible');

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('[class*="swiper-button-next"]').click();

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('[class*="swiper-button-next"]').click();

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8c6"]').should('be.visible');
                });

                cy.get('[class*="swiper-button-prev"]').should('not.have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-button-prev"]').click();

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('[class*="swiper-button-prev"]').click();

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8c6"]').should('not.exist');
                });

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');
            });

        cy.get('body').type('{esc}');

        cy.get('section[aria-label="Post gallery"]').should('not.exist');
    });

    it('cannot go to slides which has not images, close gallery by close button', () => {
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

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('section[aria-label="Images"]').click();
                cy.get('section[aria-label="Post gallery"]').should('be.visible');

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('[class*="swiper-button-prev"]').click({ force: true });

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('[class*="swiper-button-next"]').click();

                cy.get('[class*="swiper-button-prev"]').should('not.have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                });

                cy.get('[class*="swiper-button-next"]').click({ force: true });

                cy.get('[class*="swiper-button-prev"]').should('not.have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('not.exist');
                    cy.get('img[src*="62caeb938b8ca"]').should('be.visible');
                });

                cy.get('[class*="swiper-button-prev"]').click();

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('[class*="swiper-button-prev"]').click({ force: true });

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('not.have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                    cy.get('img[src*="62caeb938b8ca"]').should('not.exist');
                });

                cy.get('button[aria-label="Close gallery"]').click();

                cy.get('section[aria-label="Post gallery"]').should('not.exist');
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

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.get('section[aria-label="Images"]').click();
                cy.get('section[aria-label="Post gallery"]').should('be.visible');

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });

                cy.get('[class*="swiper-button-prev"]').click({ force: true });

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-button-next"]').click({ force: true });

                cy.get('[class*="swiper-button-prev"]').should('have.class', 'swiper-button-disabled');
                cy.get('[class*="swiper-button-next"]').should('have.class', 'swiper-button-disabled');

                cy.get('[class*="swiper-slide-active"]').within(() => {
                    cy.get('img[src*="62caeb2286cc3"]').should('be.visible');
                });
            });
    });

    it('close gallery when click on outside element', () => {
        cy.create('Post', {
            author_id: 1,
            images: ['https://picsum.photos/seed/62caeb2286cc3/850/350'],
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
            });

        cy.get('nav[data-testid="nav"]').click();

        cy.get('section[aria-label="Post gallery"]').should('not.exist');
    });
});
