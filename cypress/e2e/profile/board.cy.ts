import { useDatabaseMigrations } from 'cypress-laravel';

const bornDate = new Date();
const isoDate = bornDate.toISOString();

describe('Profile board tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest({
            born_at: isoDate,
        });
    });

    it('see create post component, switch list of posts component and only own posts without hidden and saved posts', () => {
        cy.create('Post', 4, {
            author_id: 1,
        }).then(([firstPost, secondPost]) => {
            cy.create('Hidden', {
                user_id: 1,
                post_id: firstPost.id,
            });

            cy.create('Hidden', {
                user_id: 1,
                post_id: secondPost.id,
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.injectAxe();

        cy.get('button[aria-label="Create a post"]').should('be.visible');
        cy.get('[aria-label="Change list of posts"]').should('be.visible');
        cy.getPosts().should('have.length', 2);

        cy.checkPageA11y();
    });

    it('see empty list of own posts, change list to hidden posts and see 3 hidden post, change list to saved posts and see 4 saved posts, change list to own posts and again see 0 posts', () => {
        cy.create('Hidden', 3, {
            user_id: 1,
        });

        cy.create('Saved', 4, {
            user_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');
        cy.intercept('/api/hidden?page=1').as('hiddenPosts');
        cy.intercept('/api/saved?page=1').as('savedPosts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.injectAxe();

        cy.getPosts().should('not.exist');

        cy.checkPageA11y();

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.getPosts().should('have.length', 3);

        cy.checkPageA11y();

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.getPosts().should('have.length', 4);

        cy.checkPageA11y();

        cy.get('[aria-label="Change list of posts"]').select('Own posts');

        cy.getPosts().should('not.exist');
    });

    it('click on fake create post form, create post modal show, create post, new post show on list', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.injectAxe();

        cy.getPosts().should('not.exist');

        cy.checkPageA11y();

        cy.get('button[aria-label="Create a post"]').click();
        cy.get('[role="dialog"]').should('be.visible');

        cy.intercept('/api/posts').as('store');
        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Post content"]').click().type('New post');
        cy.get('button').contains('Create post').click();

        cy.wait('@store');
        cy.wait('@posts_page_1');

        cy.get('[role="dialog"]').should('not.exist');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().first().should('contain.text', 'New post');

        cy.checkPageA11y();
    });

    it('see 10 own posts on list, fetch more by scroll to bottom, click on ScrollToTop button', () => {
        cy.create('Post', 19, {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts().should('have.length', 10);

        cy.checkPageA11y();

        cy.window().scrollTo('bottom');

        cy.getPosts().should('have.length', 19);

        cy.checkPageA11y();

        cy.getScrollToTop().click();

        /* wait for smooth scrolling */
        cy.wait(3000);

        cy.window().its('scrollY').should('eq', 0);
    });

    it("visit friends's profile, cannot see Create post and list switcher components, scroll list to bottom, see new fetched posts but cannot see his hidden and saved posts", () => {
        cy.create('User');
        cy.create('Post', 12, {
            author_id: 2,
        });

        cy.create('Hidden', 2, {
            user_id: 2,
        });

        cy.create('Saved', 2, {
            user_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.get('button[aria-label="Create a post"]').should('not.exist');
        cy.get('[aria-label="Change list of posts"]').should('not.exist');
        cy.getPosts().should('have.length', 10);

        cy.window().scrollTo('bottom');

        cy.getPosts().should('have.length', 12);
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

        cy.injectAxe();

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.intercept('/api/posts/1/likes').as('like');
            cy.intercept('/api/posts/?page=1').as('posts_page_1');

            cy.checkPageA11y();

            cy.get('[aria-label="Like"]').click();

            cy.wait('@like');
            cy.wait('@posts_page_1');

            cy.get('[data-testid="post-likesCount"]').should('contain.text', 1);

            cy.checkPageA11y();

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Comment"]').click();
            cy.wait('@comments_page_1');

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Write a comment"]').type('New comment');

            cy.checkPageA11y();

            cy.get('[aria-label="Send comment"]').click();

            cy.wait('@comments_page_1');

            cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);

            cy.checkPageA11y();
        });
    });

    it('try to delete own post', () => {
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

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.get('[aria-label="Show post settings"]').click();
        });

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('[aria-label="Delete"]').click();
        });

        cy.expectConfirm('Are you sure you want to delete this post?', 'yes');

        cy.wait('@delete');
        cy.wait('@posts_page_1');

        cy.getPosts().should('not.exist');
    });

    it("visit friend's profile, save post, check that post displays on list of saved posts, unsave post, check that post dissapear from list of saved posts", () => {
        cy.create('User');

        cy.create('Post', {
            author_id: 2,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.intercept('/api/saved').as('save');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.get('[aria-label="Show post settings"]').click();
        });

        cy.checkPageA11y();

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('[aria-label="Save"]').click();
        });

        cy.wait('@save');

        cy.visit('/profile/1');

        cy.injectAxe();

        cy.intercept('/api/saved?page=1').as('posts_page_1');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@posts_page_1');

        cy.intercept('/api/saved/1').as('unsave');
        cy.intercept('/api/saved?page=1').as('posts_page_1');

        cy.checkPageA11y();

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.get('[aria-label="Show post settings"]').click();
        });

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('[aria-label="Unsave"]').click();
        });

        cy.wait('@unsave');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 0);

        cy.checkPageA11y();
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

        cy.injectAxe();

        cy.intercept('/api/hidden').as('hide');
        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.get('[aria-label="Show post settings"]').click();
        });

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('[aria-label="Hide"]').click();
        });

        cy.wait('@hide');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 0);

        cy.checkPageA11y();

        cy.visit('/profile/1');

        cy.injectAxe();

        cy.intercept('/api/hidden?page=1').as('posts_page_1');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@posts_page_1');

        cy.intercept('/api/hidden/1').as('unhide');
        cy.intercept('/api/hidden?page=1').as('posts_page_1');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.get('[aria-label="Show post settings"]').click();
        });

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('[aria-label="Unhide"]').click();
        });

        cy.wait('@unhide');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 0);

        cy.checkPageA11y();

        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.injectAxe();

        cy.getPosts().should('have.length', 1);

        cy.checkPageA11y();
    });

    it('change list to hidden posts, like hidden post, comment hidden post, change list to saved posts, like saved post, comment saved post', () => {
        cy.create('Hidden', {
            user_id: 1,
        });

        cy.create('Saved', {
            user_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');
        cy.intercept('/api/hidden?page=1').as('hiddenPosts');
        cy.intercept('/api/saved?page=1').as('savedPosts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.getPosts().should('not.exist');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.intercept('/api/posts/1/likes').as('like');
            cy.intercept('/api/hidden?page=1').as('posts_page_1');

            cy.get('[aria-label="Like"]').click();

            cy.wait('@like');
            cy.wait('@posts_page_1');

            cy.get('[data-testid="post-likesCount"]').should('contain.text', 1);

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Comment"]').click();
            cy.wait('@comments_page_1');

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Write a comment"]').type('New comment');
            cy.get('[aria-label="Send comment"]').click();
            cy.wait('@comments_page_1');

            cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);
        });

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.intercept('/api/posts/2/likes').as('like');
            cy.intercept('/api/saved?page=1').as('posts_page_1');

            cy.get('[aria-label="Like"]').click();

            cy.wait('@like');
            cy.wait('@posts_page_1');

            cy.get('[data-testid="post-likesCount"]').should('contain.text', 1);

            cy.intercept('/api/posts/2/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Comment"]').click();
            cy.wait('@comments_page_1');

            cy.intercept('/api/posts/12comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Write a comment"]').type('New comment');
            cy.get('[aria-label="Send comment"]').click();
            cy.wait('@comments_page_1');

            cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);
        });
    });

    it('see born at info with correct date instead of empty list within own posts, change list to hidden posts and see empty list instead of born at, change list to saved posts and see empty list instead of born at', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.getPosts().should('not.exist');

        cy.get('[data-testid="born-img"]').should('exist');

        cy.intercept('/api/hidden?page=1').as('hiddenPosts');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');

        cy.wait('@hiddenPosts');

        cy.getPosts().should('not.exist');
        cy.get('article[aria-label="Born at"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.intercept('/api/saved?page=1').as('savedPosts');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');

        cy.wait('@savedPosts');

        cy.getPosts().should('not.exist');
        cy.get('article[aria-label="Born at"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });
});
