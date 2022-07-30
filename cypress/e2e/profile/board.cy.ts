import { useDatabaseMigrations } from 'cypress-laravel';

describe('Profile board tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('visit self profile, see create post component, switch list of posts component and only own posts which are not hidden', () => {
        cy.create('Post', 3, {
            author_id: 1,
        }).then(([firstPost]) => {
            cy.create('HiddenPost', {
                user_id: 1,
                post_id: firstPost.id,
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.get('button[aria-label="Show create post modal"]').should('be.visible');
        cy.get('[aria-label="Change list of posts"]').should('be.visible');
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 2);
    });

    it('visit self profile, see empty list of own posts, change list to hidden posts and see 3 hidden post, change list to saved posts and see 4 saved posts, change list to own posts and see 0 posts', () => {
        cy.create('HiddenPost', 3, {
            user_id: 1,
        });

        cy.create('SavedPost', 4, {
            user_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');
        cy.intercept('/api/hidden/posts?page=1').as('hiddenPosts');
        cy.intercept('/api/saved/posts?page=1').as('savedPosts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('not.exist');
        cy.get('img[alt="List is empty"]').should('exist');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 3);

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 4);

        cy.intercept('/api/users/1/posts?page=1').as('posts');
        cy.get('[aria-label="Change list of posts"]').select('Own posts');
        cy.wait('@posts');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('not.exist');
    });

    it('visit self profile, click on fake create post form, create post modal show, create post, new post shows on list', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('not.exist');
        cy.get('img[alt="List is empty"]').should('exist');

        cy.get('button[aria-label="Show create post modal"]').click();
        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.intercept('/api/posts').as('store');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.get('[aria-label="Post content"]').type('New post');
        cy.get('button').contains('Create post').click();

        cy.wait('@store');
        cy.wait('@posts');

        cy.get('[aria-label="Create post modal"]').should('not.exist');

        cy.get('[data-testid="board-posts"]').should('have.length', 1);
        cy.get('article[aria-label="Post"]').first().should('contain.text', 'New post');
    });

    it('visit self profile, scroll list to bottom, see loaders, see new fetched posts', () => {
        cy.create('Post', 14, {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 10);

        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');
        cy.intercept('/api/users/1/posts?page=2').as('posts_page_2');

        cy.get('[id="profile-board-posts"]').scrollTo('bottom', { ensureScrollable: false });

        cy.get('[data-testid="boardPosts-fetching_loader"]').should('be.visible');

        cy.wait('@posts_page_1');
        cy.wait('@posts_page_2');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 14);
    });

    it("visit friends's profile, cannot see show create post modal and list switcher components, scroll list to bottom, see new fetched posts but cannot see his hidden and saved posts", () => {
        cy.create('User');
        cy.create('Post', 12, {
            author_id: 2,
        });

        cy.create('HiddenPost', 2, {
            user_id: 2,
        });

        cy.create('SavedPost', 2, {
            user_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('button[aria-label="Show create post modal"]').should('not.exist');
        cy.get('[aria-label="Change list of posts"]').should('not.exist');
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 10);

        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');
        cy.intercept('/api/users/2/posts?page=2').as('posts_page_2');

        cy.get('[id="profile-board-posts"]').scrollTo('bottom', { ensureScrollable: false });

        cy.wait('@posts_page_1');
        cy.wait('@posts_page_2');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 12);
    });

    it("visit friends's profile, like and comment his post", () => {
        cy.create('User');
        cy.create('Post', {
            author_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').within(() => {
            cy.intercept('/api/likes').as('like');

            cy.get('[aria-label="Like"]').click();
            cy.wait('@like');

            cy.get('[data-testid="post-likes_count"]').should('contain.text', 1);

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Comment"]').click();
            cy.wait('@comments_page_1');

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Write a comment"]').type('New comment');
            cy.get('[aria-label="Submit comment"]').click();
            cy.wait('@comments_page_1');

            cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);
        });
    });

    it('visit self profile, delete post', () => {
        cy.create('Post', {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.intercept('/api/posts/1').as('delete');
        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').within(() => {
            cy.get('[aria-label="Show post settings"]').click();
            cy.get('[aria-label="Settings"]').within(() => {
                cy.get('[aria-label="Delete"]').click();
            });
        });

        cy.wait('@delete');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 0);
        cy.get('img[alt="List is empty"]').should('exist');
    });

    it("visit friend's profile, save post, check that post displays on list of saved posts, unsave post, cehck that post dissapear from list of saved posts", () => {
        cy.create('User');

        cy.create('Post', {
            author_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.intercept('/api/saved/posts').as('save');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').within(() => {
            cy.get('[aria-label="Show post settings"]').click();
            cy.get('[aria-label="Settings"]').within(() => {
                cy.get('[aria-label="Save"]').click();
            });
        });

        cy.wait('@save');

        cy.visit('/profile/1');

        cy.intercept('/api/saved/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@posts_page_1');

        cy.intercept('/api/saved/posts/1').as('unsave');
        cy.intercept('/api/saved/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').within(() => {
            cy.get('[aria-label="Show post settings"]').click();
            cy.get('[aria-label="Settings"]').within(() => {
                cy.get('[aria-label="Unsave"]').click();
            });
        });

        cy.wait('@unsave');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 0);
    });

    it("visit friend's profile, hide post, wait for post dissapear from list, check that post displays on list of hidden posts, unhide post, check for post dissapear from list, check post displays on friends profile", () => {
        cy.create('User');

        cy.create('Post', {
            author_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.intercept('/api/hidden/posts').as('hide');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').within(() => {
            cy.get('[aria-label="Show post settings"]').click();
            cy.get('[aria-label="Settings"]').within(() => {
                cy.get('[aria-label="Hide"]').click();
            });
        });

        cy.wait('@hide');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 0);

        cy.visit('/profile/1');

        cy.intercept('/api/hidden/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@posts_page_1');

        cy.intercept('/api/hidden/posts/1').as('unhide');
        cy.intercept('/api/hidden/posts?page=1').as('posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 1);
        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').within(() => {
            cy.get('[aria-label="Show post settings"]').click();
            cy.get('[aria-label="Settings"]').within(() => {
                cy.get('[aria-label="Unhide"]').click();
            });
        });

        cy.wait('@unhide');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 0);

        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('[data-testid="board-posts"] article[aria-label="Post"]').should('have.length', 1);
    });
});
