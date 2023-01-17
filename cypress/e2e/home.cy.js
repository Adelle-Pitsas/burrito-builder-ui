describe('the Burrito Builder home page', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {
      method: 'GET',
      fixture: '../fixtures/orders.json'
    })
    cy.visit('http://localhost:3000/?name=&steak=')
  })

  it('should display the title and existing orders', () => {
    cy.get('header').within(() => {
      cy.get('h1').should('contain', "Burrito Builder")
    })
    cy.get('.order').should('have.length', '3')
    cy.get('.order').eq(0).within(() => {
      cy.get('h3').should('contain', 'Pat')
      cy.get('ul').within(() => {
        cy.get('li').should('have.length', '5')
        cy.get('li').eq(0).should('contain', 'beans')
        cy.get('li').eq(1).should('contain', 'lettuce')
        cy.get('li').eq(2).should('contain', 'carnitas')
        cy.get('li').eq(3).should('contain', 'queso fresco')
        cy.get('li').eq(4).should('contain', 'jalapeno')
      })
    })
    cy.get('.order').eq(1).within(() => {
      cy.get('h3').should('contain', 'Sam')
      cy.get('ul').within(() => {
        cy.get('li').should('have.length', '6')
        cy.get('li').eq(0).should('contain', 'steak')
        cy.get('li').eq(1).should('contain', 'pico de gallo')
        cy.get('li').eq(2).should('contain', 'lettuce')
        cy.get('li').eq(3).should('contain', 'carnitas')
        cy.get('li').eq(4).should('contain', 'queso fresco')
        cy.get('li').eq(5).should('contain', 'jalapeno')
      })
    })
    cy.get('.order').eq(2).within(() => {
      cy.get('h3').should('contain', 'Alex')
      cy.get('ul').within(() => {
        cy.get('li').should('have.length', '5')
        cy.get('li').eq(0).should('contain', 'sofritas')
        cy.get('li').eq(1).should('contain', 'beans')
        cy.get('li').eq(2).should('contain', 'sour cream')
        cy.get('li').eq(3).should('contain', 'carnitas')
        cy.get('li').eq(4).should('contain', 'queso fresco')
      })
    })
  })

  it('should display a burito building form', () => {
    cy.get('form').within(() => {
      cy.get('input[name=name]').should('have.value', "")
      cy.get('.ingredient-button').should('have.length', '12')
      cy.get('.ingredient-button').eq(0).should('contain', 'beans')
      cy.get('.ingredient-button').eq(1).should('contain', 'steak')
      cy.get('.ingredient-button').eq(2).should('contain', 'carnitas')
      cy.get('.ingredient-button').eq(3).should('contain', 'sofritas')
      cy.get('.ingredient-button').eq(4).should('contain', 'lettuce')
      cy.get('.ingredient-button').eq(5).should('contain', 'queso fresco')
      cy.get('.ingredient-button').eq(6).should('contain', 'pico de gallo')
      cy.get('.ingredient-button').eq(7).should('contain', 'hot sauce')
      cy.get('.ingredient-button').eq(8).should('contain', 'guacamole')
      cy.get('.ingredient-button').eq(9).should('contain', 'jalapenos')
      cy.get('.ingredient-button').eq(10).should('contain', 'cilantro')
      cy.get('.ingredient-button').eq(11).should('contain', 'sour cream')
      cy.get('.order-feedback').should('contain', 'Nothing selected')
      cy.get('.submit-button').should('contain', 'Submit Order')
    })
  })

  it('should allow the user to enter and submit their order', () => {
    cy.get('form').within(() => {
      cy.get('input[name]').type("Adelle").should('have.value', "Adelle")
      cy.get('.ingredient-button').eq(2).click()
      cy.get('.ingredient-button').eq(4).click()
      cy.get('.ingredient-button').eq(6).click()
      cy.get('.order-feedback').should('contain', 'Order: carnitas, lettuce, pico de gallo')
    })
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      body: {
        name: 'Adelle',
        ingredients: ['carnitas', 'lettuce', 'pico de gallo']
      }
    })
    cy.get('.submit-button').click()
    cy.get('.order').eq(3).within(() => {
      cy.get('h3').should('contain', 'Adelle')
      cy.get('ul').within(() => {
        cy.get('li').should('have.length', '3')
        cy.get('li').eq(0).should('contain', 'carnitas')
        cy.get('li').eq(1).should('contain', 'lettuce')
        cy.get('li').eq(2).should('contain', 'pico de gallo')
      })
    })
  })

  it('should not allow user to submit order if the name input is not filled out', () => {
    cy.get('input[name=name]').should('have.value', "")
    cy.get('.ingredient-button').eq(2).click()
    cy.get('.ingredient-button').eq(4).click()
    cy.get('.submit-button').click()
    cy.get('.error-message').should('be.visible')
    cy.get('.order').should('have.length', '3')
  })

  it('should not allow user to submit order if no ingredients are chosen', () => {
    cy.get('input[name=name]').type('Joe').should('have.value', 'Joe')
    cy.get('.submit-button').click()
    cy.get('.error-message').should('be.visible')
    cy.get('.order').should('have.length', '3')
  })

})