import { useDatabaseMigrations } from 'cypress-laravel';

const USER_NAME = `${Cypress.env('USER_FIRST_NAME')} ${Cypress.env('USER_LAST_NAME')}`;

describe('Chat tests', () => {
    useDatabaseMigrations();

    const friend = {
        id: 999,
        first_name: 'John',
        last_name: 'Doe',
    };

    beforeEach(() => {
        cy.loginRequest();

        cy.intercept('/api/user').as('user');
        cy.intercept('/api/contacts?page=1').as('contacts_page_1');

        cy.createUser(1, true, friend);
    });

    it('open chat by contacts, conversation should be empty, send new message (by press enter) and wait for it will be loaded on list, send second message (by click on submit button), close chat by close button', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

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
        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello World!{enter}');

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('Hello World!');
        });

        // Creating second message
        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello World second time');
        cy.get('[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('Hello World second time');
        });

        cy.get('[aria-label="Close chat"]').click();
        cy.get('[data-testid="chat"]').should('not.exist');
    });

    it('open chat, send new message, response return error, message should not exist on list, chat show api error, second message with success response remove api error from chat', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        // Creating first message
        cy.wait('@chatAuth');
        cy.intercept('/api/messages', { statusCode: 500 }).as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello World!{enter}');

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').should('not.contain.text', 'Hello World!');
        cy.get('[data-testid="chat"]').should('contain.text', 'Something went wrong, please try again later');

        // Creating second message
        cy.intercept('/api/messages', { statusCode: 201 }).as('messages');

        cy.get('input[aria-label="Message input"]').type('Second approach{enter}');

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').should('contain.text', 'Second approach');
        cy.get('[data-testid="chat"]').should('not.contain.text', 'Something went wrong, please try again later');
    });

    it('open chat, generate api error, close chat, open same chat, api error is not showing', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        // Creating first message
        cy.wait('@chatAuth');
        cy.intercept('/api/messages', { statusCode: 500 }).as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello World!{enter}');

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').should('not.contain.text', 'Hello World!');
        cy.get('[data-testid="chat"]').should('contain.text', 'Something went wrong, please try again later');

        cy.get('[aria-label="Close chat"]').click();
        cy.get('[data-testid="chat"]').should('not.exist');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.get('[data-testid="chat"]').should('not.contain.text', 'Something went wrong, please try again later');
    });

    it('create message with emoji', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello ');

        cy.get('[aria-label="Choose an emoji"]').click();

        cy.get('[aria-label="Emojis list"]').within(() => {
            cy.get('button').contains('👋').click();
        });

        cy.get('input[aria-label="Message input"]').should('have.value', 'Hello 👋');

        cy.get('[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('Hello 👋');
        });
    });

    it('emojis list can be closed by pressing esc', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.intercept('/api/messages').as('messages');
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

        cy.get('[aria-label="Choose an emoji"]').click();

        cy.get('[aria-label="Emojis list"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('[aria-label="Emojis list"]').should('not.exist');
    });

    it('emojis list can be closed by click on outside element', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.get('[aria-label="Choose an emoji"]').click();

        cy.get('[aria-label="Emojis list"]').should('be.visible');

        cy.get('[data-testid="nav"]').click();

        cy.get('[aria-label="Emojis list"]').should('not.exist');
    });

    it('send like by click on like button', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.get('[aria-label="Send like"]').click();

        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('👍');
        });
    });

    it('send message which contain only emojis', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('[aria-label="Choose an emoji"]').click();

        cy.get('[aria-label="Emojis list"]').within(() => {
            cy.get('button').contains('😃').click();
            cy.get('button').contains('😅').click();
            cy.get('button').contains('🤣').click();
            cy.get('button').contains('🙂').click();
            cy.get('button').contains('🥰').click();
            cy.get('button').contains('😝').click();
            cy.get('button').contains('😏').click();
            cy.get('button').contains('😭').click();
            cy.get('button').contains('👍').click();
            cy.get('button').contains('❤️').click();
        });

        cy.get('input[aria-label="Message input"]').should('have.value', '😃😅🤣🙂🥰😝😏😭👍❤️');

        cy.get('[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.contains('😃😅🤣🙂🥰😝😏😭👍❤️');
        });
    });

    it('upload image to message, img show in input and in conversation after submit', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[type="file"]').attachFile(['/postImage1.jpg']);

        cy.get('[data-testid="chat-uploadedImages"]').children().should('have.length', 1);

        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.get('[aria-label="Message sent"]').within(() => {
                cy.get('img').should('exist');
            });
        });
    });

    it('upload 3 images, remove 1, submit, see image with 2 images in conversation', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@messages_page_1');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[type="file"]').attachFile(['/postImage1.jpg', '/postImage2.jpg', '/postImage3.jpg']);

        cy.get('[data-testid="chat-uploadedImages"]').children().should('have.length', 3);
        cy.get('[data-testid="chat-uploadedImages"]')
            .children()
            .first()
            .within(() => {
                cy.get('[aria-label="Remove image"]').click();
            });
        cy.get('[data-testid="chat-uploadedImages"]').children().should('have.length', 2);

        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.get('[aria-label="Message sent"]').within(() => {
                cy.get('img').should('have.length', 2);
            });
        });
    });

    it('create message with text and images', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello World!');

        cy.get('input[type="file"]').attachFile(['/postImage1.jpg', '/postImage2.jpg']);
        cy.get('[data-testid="chat-uploadedImages"]').children().should('have.length', 2);

        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.get('[aria-label="Message sent"]').within(() => {
                cy.contains('Hello World!');
                cy.get('img').should('have.length', 2);
            });
        });
    });

    it('cannot create message with invalid type of file', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello World!');

        cy.get('input[type="file"]').attachFile(['/file.pdf']);
        cy.get('[data-testid="chat-uploadedImages"]').should('not.exist');

        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat"]').within(() => {
            cy.get('[aria-label="Message sent"]').within(() => {
                cy.contains('Hello World!');
                cy.get('img').should('not.exist');
            });
        });
    });

    it('users can messages to each other', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello');
        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message sent"]').contains('Hello');
        });

        cy.relogin(999);

        cy.intercept(`/api/messages/1?page=1`).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(USER_NAME).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message received"]').contains('Hello');
        });

        cy.get('input[aria-label="Message input"]').type('Hi');
        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message received"]').contains('Hello');
            cy.get('article[aria-label="Message sent"]').contains('Hi');
        });

        cy.relogin(1);

        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message sent"]').contains('Hello');
            cy.get('article[aria-label="Message received"]').contains('Hi');
        });

        cy.get('input[aria-label="Message input"]').type('How are you?');
        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message sent"]').contains('Hello');
            cy.get('article[aria-label="Message received"]').contains('Hi');
            cy.get('article[aria-label="Message sent"]').contains('How are you?');
        });

        cy.relogin(999);

        cy.intercept(`/api/messages/1?page=1`).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(USER_NAME).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message received"]').contains('Hello');
            cy.get('article[aria-label="Message sent"]').contains('Hi');
            cy.get('article[aria-label="Message received"]').contains('How are you');
        });

        cy.get('input[aria-label="Message input"]').type('Nice thanks');
        cy.get('button[aria-label="Submit message"]').click();

        cy.wait('@messages');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message received"]').contains('Hello');
            cy.get('article[aria-label="Message sent"]').contains('Hi');
            cy.get('article[aria-label="Message received"]').contains('How are you?');
            cy.get('article[aria-label="Message sent"]').contains('Nice thanks');
        });

        cy.relogin(1);

        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.get('[data-testid="chat-messages"]').within(() => {
            cy.get('article[aria-label="Message sent"]').contains('Hello');
            cy.get('article[aria-label="Message received"]').contains('Hi');
            cy.get('article[aria-label="Message sent"]').contains('How are you');
            cy.get('article[aria-label="Message received"]').contains('Nice thanks');
        });
    });

    it('message has sent status icon after sent, received status after created, seen status after user read that message', () => {
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
        cy.intercept('/api/broadcasting/auth').as('chatAuth');

        cy.visit('/');

        cy.wait('@user');
        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[data-testid="chat"]').should('be.visible');

        cy.wait('@chatAuth');
        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('Hello');

        cy.get('input[type="file"]').attachFile(['/file.pdf']);
        cy.get('[data-testid="chat-uploadedImages"]').should('not.exist');

        cy.get('button[aria-label="Submit message"]').click();

        cy.get('[aria-label="Message sent"]')
            .children()
            .filter(':contains("Hello")')
            .get('[data-testid="statusIcon-sending"]');

        cy.wait('@messages');

        cy.get('[aria-label="Message sent"]')
            .children()
            .filter(':contains("Hello")')
            .get('[data-testid="statusIcon-delivered"]');

        cy.intercept('/api/messages').as('messages');

        cy.get('input[aria-label="Message input"]').type('World');

        cy.get('button[aria-label="Submit message"]').click();

        cy.get('[aria-label="Message sent"]')
            .children()
            .filter(':contains("World")')
            .get('[data-testid="statusIcon-sending"]');

        cy.wait('@messages');

        cy.get('[aria-label="Message sent"]')
            .children()
            .filter(':contains("World")')
            .get('[data-testid="statusIcon-delivered"]');

        cy.relogin(999);

        cy.intercept('/api/contacts?page=1').as('contacts_page_1');
        cy.intercept('/api/messages/1?page=1').as('messages_page_1');
        cy.intercept('/api/messages/1/update').as('read');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(USER_NAME).click();
        });

        cy.wait('@messages_page_1');
        cy.wait('@read');

        cy.get('[aria-label="Message received"]')
            .children()
            .filter(':contains("Hello")')
            .get('[data-testid="statusIcon-empty"]')
            .should('exist');

        cy.get('[aria-label="Message received"]')
            .children()
            .filter(':contains("World")')
            .get('[data-testid="statusIcon-seen"]')
            .should('be.visible');

        cy.intercept('/api/contacts?page=1').as('contacts_page_1');
        cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

        cy.relogin(1);

        cy.wait('@contacts_page_1');

        cy.get('[data-testid="contacts-list"]').within(() => {
            cy.contains(`${friend.first_name} ${friend.last_name}`).click();
        });

        cy.wait('@messages_page_1');

        cy.get('[aria-label="Message sent"]')
            .children()
            .filter(':contains("Hello")')
            .get('[data-testid="statusIcon-empty"]');

        cy.get('[aria-label="Message sent"]')
            .children()
            .filter(':contains("World")')
            .get('[data-testid="statusIcon-seen"]');
    });

    // it('open chat, conversation should has 15 messages, WIP', () => {
    //     cy.create('Message', 22, {
    //         sender_id: 1,
    //         receiver_id: friend.id,
    //     });

    //     cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');

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

    //     cy.intercept(`/api/messages/${friend.id}?page=1`).as('messages_page_1');
    //     cy.intercept('/api/messages/2?page=2').as('messages_page_2');

    //     cy.get('[id="list-of-messages"]').scrollTo('top', { ensureScrollable: false });

    //     cy.wait('@messages_page_1');
    //     cy.wait('@messages_page_2');

    //     cy.get('[data-testid="chat-messages"]').within(() => {
    //         cy.get('[aria-label$=" message"]').should('have.length', 22);
    //     });
    // });
});
