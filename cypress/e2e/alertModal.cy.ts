import { useDatabaseMigrations } from 'cypress-laravel';

describe('AlertModal tests', () => {
    useDatabaseMigrations();

    beforeEach(() => {
        cy.loginRequest();
    });

    it('modal display properly title and message, can be closed by OK button', () => {
        cy.showAlertModal();

        cy.get('div[role="alertdialog"]').within(() => {
            cy.contains('App Error');
            cy.contains('Something went wrong, please try again later.');

            cy.get('button[aria-label="OK"]').click();
        });

        cy.get('div[role="alertdialog"]').should('not.exist');
    });

    it('modal can be closed by click on overlay', () => {
        cy.showAlertModal();

        cy.get('div[role="alertdialog"]').should('be.visible');

        cy.get('[data-testid="alertModal-overlay"]').click('bottomLeft', { force: true });

        cy.get('div[role="alertdialog"]').should('not.exist');
    });

    it('modal can be closed by press esc key', () => {
        cy.showAlertModal();

        cy.get('div[role="alertdialog"]').should('be.visible');

        cy.get('body').type('{esc}');

        cy.get('div[role="alertdialog"]').should('not.exist');
    });
});
