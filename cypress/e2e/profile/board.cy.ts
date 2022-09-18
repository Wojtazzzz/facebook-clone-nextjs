import { useDatabaseMigrations } from 'cypress-laravel';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const bornDate = new Date();
const formatedDate = `${bornDate.getDate()} ${months[bornDate.getMonth()]} ${bornDate.getFullYear()}`;
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
            cy.create('HiddenPost', {
                user_id: 1,
                post_id: firstPost.id,
            });

            cy.create('HiddenPost', {
                user_id: 1,
                post_id: secondPost.id,
            });
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.get('button[aria-label="Create a post"]').should('be.visible');
        cy.get('[aria-label="Change list of posts"]').should('be.visible');
        cy.getPosts().should('have.length', 2);
    });

    it('see empty list of own posts, change list to hidden posts and see 3 hidden post, change list to saved posts and see 4 saved posts, change list to own posts and again see 0 posts', () => {
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

        cy.getPosts().should('not.exist');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.getPosts().should('have.length', 3);

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.getPosts().should('have.length', 4);

        cy.get('[aria-label="Change list of posts"]').select('Own posts');

        cy.getPosts().should('not.exist');
    });

    it('click on fake create post form, create post modal show, create post, new post show on list', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.getPosts().should('not.exist');

        cy.get('button[aria-label="Create a post"]').click();
        cy.get('[aria-label="Create post modal"]').should('be.visible');

        cy.intercept('/api/posts').as('store');
        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Post content"]').type('New post');
        cy.get('button').contains('Create post').click();

        cy.wait('@store');
        cy.wait('@posts_page_1');

        cy.get('[aria-label="Create post modal"]').should('not.exist');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().first().should('contain.text', 'New post');
    });

    it('see 10 own posts on list, fetch more by scrolling to bottom', () => {
        cy.create('Post', 14, {
            author_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts_page_1');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 10);

        cy.window().scrollTo('bottom');

        cy.getPosts().should('have.length', 14);
    });

    it("visit friends's profile, cannot see Create post and list switcher components, scroll list to bottom, see new fetched posts but cannot see his hidden and saved posts", () => {
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

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.intercept('/api/posts/1/likes').as('like');
            cy.intercept('/api/posts/?page=1').as('posts_page_1');

            cy.get('[aria-label="Like"]').click();

            cy.wait('@like');
            cy.wait('@posts_page_1');

            cy.get('[data-testid="post-likesCount"]').should('contain.text', 1);

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

        cy.intercept('/api/saved/posts').as('save');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.get('[aria-label="Show post settings"]').click();
        });

        cy.get('[aria-label="Settings"]').within(() => {
            cy.get('[aria-label="Save"]').click();
        });

        cy.wait('@save');

        cy.visit('/profile/1');

        cy.intercept('/api/saved/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@posts_page_1');

        cy.intercept('/api/saved/posts/1').as('unsave');
        cy.intercept('/api/saved/posts?page=1').as('posts_page_1');

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

        cy.visit('/profile/1');

        cy.intercept('/api/hidden/posts?page=1').as('posts_page_1');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@posts_page_1');

        cy.intercept('/api/hidden/posts/1').as('unhide');
        cy.intercept('/api/hidden/posts?page=1').as('posts_page_1');

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

        cy.intercept('/api/users/2/posts?page=1').as('posts_page_1');

        cy.visit('/profile/2');

        cy.wait('@user');
        cy.wait('@posts_page_1');

        cy.getPosts().should('have.length', 1);
    });

    it('change list to hidden posts, like hidden post, comment hidden post, change list to saved posts, like saved post, comment saved post', () => {
        cy.create('HiddenPost', {
            user_id: 1,
        });

        cy.create('SavedPost', {
            user_id: 1,
        });

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');
        cy.intercept('/api/hidden/posts?page=1').as('hiddenPosts');
        cy.intercept('/api/saved/posts?page=1').as('savedPosts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.getPosts().should('not.exist');

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.intercept('/api/posts/1/likes').as('like');
            cy.intercept('/api/hidden/posts?page=1').as('posts_page_1');

            cy.get('[aria-label="Like"]').click();

            cy.wait('@like');
            cy.wait('@posts_page_1');

            cy.get('[data-testid="post-likesCount"]').should('contain.text', 1);

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Comment"]').click();
            cy.wait('@comments_page_1');

            cy.intercept('/api/posts/1/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Write a comment"]').type('New comment');
            cy.get('[aria-label="Submit comment"]').click();
            cy.wait('@comments_page_1');

            cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);
        });

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.getPosts().should('have.length', 1);
        cy.getPosts().within(() => {
            cy.intercept('/api/posts/2/likes').as('like');
            cy.intercept('/api/saved/posts?page=1').as('posts_page_1');

            cy.get('[aria-label="Like"]').click();

            cy.wait('@like');
            cy.wait('@posts_page_1');

            cy.get('[data-testid="post-likesCount"]').should('contain.text', 1);

            cy.intercept('/api/posts/2/comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Comment"]').click();
            cy.wait('@comments_page_1');

            cy.intercept('/api/posts/12comments?page=1').as('comments_page_1');

            cy.get('[aria-label="Write a comment"]').type('New comment');
            cy.get('[aria-label="Submit comment"]').click();
            cy.wait('@comments_page_1');

            cy.get('[data-testid="post-comments_list"]').children().should('have.length', 1);
        });
    });

    it('see born at info with correct date instead of empty list within own posts, change list to hidden posts and see empty list instead of born at, change list to saved posts and see empty list instead of born at', () => {
        cy.intercept('/api/user').as('user');
        cy.intercept('/api/users/1/posts?page=1').as('posts');
        cy.intercept('/api/hidden/posts?page=1').as('hiddenPosts');
        cy.intercept('/api/saved/posts?page=1').as('savedPosts');

        cy.visit('/profile/1');

        cy.wait('@user');
        cy.wait('@posts');

        cy.getPosts().should('not.exist');
        cy.get('[data-testid="empty-list"]').should('not.exist');
        cy.get('article[aria-label="Born at"]').within(() => {
            cy.get('[data-testid="born-img"]').should('exist');
            cy.contains(`Born on ${formatedDate}`);
        });

        cy.get('[aria-label="Change list of posts"]').select('Hidden posts');
        cy.wait('@hiddenPosts');

        cy.getPosts().should('not.exist');
        cy.get('article[aria-label="Born at"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');

        cy.get('[aria-label="Change list of posts"]').select('Saved posts');
        cy.wait('@savedPosts');

        cy.getPosts().should('not.exist');
        cy.get('article[aria-label="Born at"]').should('not.exist');
        cy.get('[data-testid="empty-list"]').should('be.visible');
    });
});
