describe('empty spec', () => {
    it('passes', () => {
        cy.visit('https://example.cypress.io');

        expect(true).to.equal(true);
    });
});
