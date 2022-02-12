describe('Pages exists', () => {
    it('/', () => {
        cy.visit('/');
    });

    it('/marketplace', () => {
        cy.visit('/marketplace');
    });

    it('/profile', () => {
        cy.visit('/profile');
    });
});

export { };