describe('Automatic Testing', () => {
 
  it('Verify Login Page', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').should('exist');
      cy.get('[data-test="password"]').should('exist');
      cy.get('[data-test="login-button"]').should('exist');
  });
 
  it('Successful Login', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html'); 
      cy.contains('Products').should('be.visible');
  });

  it('Invalid Login', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('invalid_user@gmail.com');
      cy.get('[data-test="password"]').type('password321');
      cy.get('[data-test="login-button"]').click();
      cy.get('[data-test="error"]').should('be.visible')
        .and('contain', 'Username and password do not match any user in this service');
  });
 
  it('Logout', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.get('#react-burger-menu-btn').click(); 
      cy.get('#logout_sidebar_link').click();
      cy.url().should('eq', 'https://www.saucedemo.com/');
      cy.get('[data-test="login-button"]').should('be.visible');
  });

  it('Filter Products using Sorting', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="product-sort-container"]').select('lohi');
      cy.get('.inventory_item_price').first().should('have.text', '$7.99');
  });

  it('View Product Details', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();

      cy.contains('.inventory_item_name', 'Sauce Labs Backpack').click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('.inventory_details_img').should('be.visible');
      cy.get('.inventory_details_name').should('be.visible');
      cy.get('.inventory_details_price').should('be.visible');
  });

  it('Add Product to Cart', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      cy.get('.cart_item').should('exist');
      cy.get('.cart_quantity').should('have.text', '1');
      cy.get('.inventory_item_price').should('be.visible');
  });

  it('Remove Product from Cart', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="remove-sauce-labs-backpack"]').click();
      cy.get('.cart_item').should('not.exist');
  });

});