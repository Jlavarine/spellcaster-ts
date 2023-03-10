describe ('Reaction Gallery error-handling', () => {
    it('Should see an error if fetch returns a 500 error', () => {
      cy.intercept('GET', 'https://www.dnd5eapi.co/api/spells', {
        statusCode: 500,
        headers: {
          'x-requested-with': 'exampleClient',
        },
        fixture: 'spellObject1'
      });
      cy.visit('http://localhost:3000/')
      cy.get('.load-error').should('have.text','The spellbook is still being translated. Please refresh the page.')
    });

    it('Should see an error if fetch returns a 404 error', () => {
      cy.intercept('GET', 'https://www.dnd5eapi.co/api/spells', {
        statusCode: 404,
        headers: {
          'x-requested-with': 'exampleClient',
        },
        fixture: 'spellObject1'
      });
      cy.visit('http://localhost:3000/')
      cy.get('.load-error').should('have.text','The spellbook is still being translated. Please refresh the page.')
    });
    it('Should see an error if the url does not exist and user can redirect to homepage', () => {
      cy.visit('http://localhost:3000/potato')
      cy.get('.error-message').should('have.text',`That's not a spellbook...it's a mimic!`)
      cy.get('.error-link').should('have.text','Click here to return to the main page')
      cy.get('.error-img').should('have.attr', 'src').should('include', 'https://static.wixstatic.com/media/c04a56_b7b5eb877f234333913489baa27c43fe~mv2.jpg/v1/fill/w_900,h_675,al_c,q_90/c04a56_b7b5eb877f234333913489baa27c43fe~mv2.jpg')
      cy.get('.error-link').click()
      cy.url('http://localhost:3000/')
    });
});
