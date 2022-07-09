import { useDatabaseMigrations } from 'cypress-laravel';
import type { UserType } from '../../../support/types';

describe('Messenger tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
    });

    it('open messenger when click on messenger icon and open chat with properly friend', () => {
        let friend: UserType;

        cy.create('User').then((user) => (friend = user));
        cy.create('Friendship', {
            user_id: 1,
            friend_id: 2,
            status: 'CONFIRMED',
        });

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.get('[data-testid="messenger-container"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.get('[data-testid="chat"]')
            .should('be.visible')
            .within(() => {
                cy.contains(`${friend.first_name} ${friend.last_name}`);
            });
    });

    it('messenger can be closed by pressing esc key', () => {
        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.get('[data-testid="messenger-container"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[data-testid="messenger-container"]').should('not.exist');
    });

    it('can load more users when scrolling to bottom', () => {
        cy.create('Friendship', 15, {
            user_id: 1,
            status: 'CONFIRMED',
        });

        cy.intercept('/api/messages?page=1').as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.wait('@messages_page_1');

        cy.get('[class="infinite-scroll-component "] > button').should('have.length', 10);

        cy.intercept('/api/messages?page=1').as('messages_page_1');
        cy.intercept('/api/messages?page=2').as('messages_page_2');

        cy.get('[id="list-of-messenger-contacts"]').scrollTo('bottom', { ensureScrollable: false });

        cy.wait('@messages_page_1');
        cy.wait('@messages_page_2');

        cy.get('[class="infinite-scroll-component "] > button').should('have.length', 15);
    });

    it('messenger dissapears when click on outside page element', () => {
        cy.visit('/');
        cy.wait('@user');

        cy.get('[data-testid="nav"]').within(() => {
            cy.get('[aria-label="Messenger"]').click();
        });

        cy.get('main').click();

        cy.get('[data-testid="messenger-container"]').should('not.exist');
    });
});
