import { useDatabaseMigrations } from 'cypress-laravel';

const USER_LAST_NAME = Cypress.env('USER_LAST_NAME');
const USER_FIRST_NAME = Cypress.env('USER_FIRST_NAME');

describe('Posts comments tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.create('Post', {
            author_id: 1,
        });
    });

    it('see ten comments and fetch five more when click on "View more comments", after that button dissapears', () => {
        cy.create('Comment', 15, {
            resource_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 10);

                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');
                cy.intercept('/api/posts/1/comments?page=2').as('comments_page_2');

                cy.get('button[aria-label="Load more comments"]').click();
                cy.wait('@comments_page_1');
                cy.wait('@comments_page_2');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 15);

                cy.get('button[aria-label="Load more comments"]').should('not.exist');
            });
    });

    it('create new comment and see it on list', () => {
        const newCommentContent = 'New simple comment';

        cy.create('Comment', 1, {
            resource_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);

                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Write a comment"]').type(`${newCommentContent}{enter}`);
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 2);
                cy.get('article[aria-label="Comment"]')
                    .contains(`${USER_FIRST_NAME} ${USER_LAST_NAME}`)
                    .should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(newCommentContent).should('be.visible');
            });
    });

    it('click on delete button, show confirm action modal, click "No" in confirm modal, modal hides, see that comment in list', () => {
        const commentContent = 'Simple comment';

        cy.create('Comment', 1, {
            author_id: 1,
            resource_id: 1,
            content: commentContent,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);

                cy.get('article[aria-label="Comment"]').first().contains(commentContent).should('be.visible');
                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').click();
                    });
            });

        cy.get('[aria-label="Confirm delete comment"]').should('be.visible');
        cy.get('[aria-label="Confirm delete comment"]').within(() => {
            cy.get('button[aria-label="Don\'t delete comment"]').click();
        });

        cy.get('[aria-label="Confirm delete comment"]').should('not.exist');

        cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);
    });

    it("click on delete button, show confirm action modal, click 'Yes' in confirm modal, modal hides, don't see that comment in list", () => {
        const commentContent = 'Simple comment';

        cy.create('Comment', 1, {
            author_id: 1,
            resource_id: 1,
            content: commentContent,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);

                cy.get('article[aria-label="Comment"]').first().contains(commentContent).should('be.visible');
                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').click();
                    });
            });

        cy.get('[aria-label="Confirm delete comment"]').should('be.visible');
        cy.get('[aria-label="Confirm delete comment"]').within(() => {
            cy.intercept(`/api/posts/1/comments/1`).as('delete');
            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('button[aria-label="Delete comment"]').click();
        });

        cy.wait('@delete');
        cy.wait('@comments_page_1');

        cy.get('[aria-label="Confirm delete comment"]').should('not.exist');

        cy.get('article[aria-label="Comment"]').should('not.exist');
    });

    it('click on delete button, show confirm action modal, close it by pressing esc key, open modal again and close it by close button', () => {
        cy.create('Comment', 1, {
            author_id: 1,
            resource_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Delete"]').click();
                    });
            });

        cy.get('[aria-label="Confirm delete comment"]').should('be.visible');
        cy.get('body').type('{esc}');
        cy.get('[aria-label="Confirm delete comment"]').should('not.exist');

        cy.get('article[aria-label="Comment"]')
            .first()
            .within(() => {
                cy.get('button[aria-label="Delete"]').click();
            });

        cy.get('[aria-label="Confirm delete comment"]').should('be.visible');
        cy.get('button[aria-label="Close modal"]').click();

        cy.get('[aria-label="Confirm delete comment"]').should('not.exist');
    });

    it("cannot see 'Delete' and 'Edit' buttons on somebody's comment but see 'Like' and 'Reply' buttons", () => {
        cy.create('Comment', 1, {
            resource_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.get('button[aria-label="Like"]').should('be.visible');
                        cy.get('button[aria-label="Reply"]').should('be.visible');
                        cy.get('button[aria-label="Delete"]').should('not.exist');
                        cy.get('button[aria-label="Edit"]').should('not.exist');
                    });
            });
    });

    it('click on "Edit" button, enter new comment value, submit, check that edition not impact on other comments', () => {
        const firstComment = 'First comment';
        const secondComment = 'Second comment';
        const initialContent = 'Simple comment';
        const newContent = 'Updated comment';

        cy.create('Comment', 1, {
            author_id: 1,
            resource_id: 1,
            content: firstComment,
        });

        cy.wait(1000);

        cy.create('Comment', 1, {
            resource_id: 1,
            content: secondComment,
        });

        cy.wait(1000);

        cy.create('Comment', 1, {
            id: 999,
            author_id: 1,
            resource_id: 1,
            content: initialContent,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/posts?page=1').as('posts_page_1');

        cy.visit('/');
        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[id="posts-list"] article[aria-label="Post"]')
            .first()
            .within(() => {
                cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

                cy.get('[aria-label="Comment"]').click();
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').should('have.length', 3);
                cy.get('article[aria-label="Comment"]')
                    .first()
                    .within(() => {
                        cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');
                        cy.intercept('/api/posts/1/comments/999').as('put');

                        cy.get('button[aria-label="Edit"]').click();

                        cy.contains('Enter new value');
                        cy.get('[aria-label="Update comment"]').clear().type(newContent);
                        cy.get('[aria-label="Submit comment"]').click();
                    });

                cy.wait('@put');
                cy.wait('@comments_page_1');

                cy.get('article[aria-label="Comment"]').contains(newContent).should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(initialContent).should('not.exist');
                cy.get('article[aria-label="Comment"]').contains(firstComment).should('be.visible');
                cy.get('article[aria-label="Comment"]').contains(secondComment).should('be.visible');
            });
    });
});
