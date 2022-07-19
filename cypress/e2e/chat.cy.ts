import { useDatabaseMigrations } from 'cypress-laravel';

describe('Chat tests', () => {
    useDatabaseMigrations();
    let friend = {
        id: 2,
        first_name: 'John',
        last_name: 'Doe',
    };

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/friends/contacts?page=1').as('contacts_page_1');

        cy.create('User', friend);
        cy.create('Friendship', {
            user_id: 1,
            friend_id: friend.id,
            status: 'CONFIRMED',
        });
    });

    it('open chat by contacts, conversation should be empty, send new message (by press enter) and wait for it will be loaded on list, send second message (by click on submit button), close chat by close button', () => {
        cy.intercept('/api/messages/2?page=1').as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');
        cy.get('[data-testid="chat"] header').contains(`${friend.first_name} ${friend.last_name}`);
        cy.contains('Say hello to your friend!');

        // Creating first message
        cy.intercept('/api/messages').as('messages');
        cy.intercept('/api/messages/2?page=1').as('messages_page_1');

        cy.get('input[aria-label="Message input"]').type('Hello World!{enter}');

        cy.wait('@messages');
        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('Hello World!');
        });

        // Creating second message
        cy.intercept('/api/messages').as('messages');
        cy.intercept('/api/messages/2?page=1').as('messages_page_1');

        cy.get('input[aria-label="Message input"]').type('Hello World second time');
        cy.get('[aria-label="Send message"]').click();

        cy.wait('@messages');
        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('Hello World second time');
        });

        cy.get('[aria-label="Close chat"]').click();
        cy.get('[data-testid="chat"]').should('not.exist');
    });

    // it('open chat, conversation should has 15 messages, WIP', () => {
    //     cy.create('Message', 22, {
    //         sender_id: 1,
    //         receiver_id: friend.id,
    //     });

    //     cy.intercept('/api/messages/2?page=1').as('messages_page_1');

    //     cy.visit('/');

    //     cy.wait('@user');
    //     cy.wait('@contacts_page_1');

    //     cy.get('[data-testid="contacts-list"]').within(() => {
    //         cy.contains(`${friend.first_name} ${friend.last_name}`).click();
    //     });

    //     cy.wait('@messages_page_1');

    //     cy.get('[data-testid="chat"]').should('not.include.text', 'Say hello to your friend!');
    //     cy.get('[data-testid="chat-messages"]').within(() => {
    //         cy.get('[aria-label$=" message"]').should('have.length', 15);
    //     });

    //     cy.intercept('/api/messages/2?page=1').as('messages_page_1');
    //     cy.intercept('/api/messages/2?page=2').as('messages_page_2');

    //     cy.get('[id="list-of-messages"]').scrollTo('top', { ensureScrollable: false });

    //     cy.wait('@messages_page_1');
    //     cy.wait('@messages_page_2');

    //     cy.get('[data-testid="chat-messages"]').within(() => {
    //         cy.get('[aria-label$=" message"]').should('have.length', 22);
    //     });
    // });
});
