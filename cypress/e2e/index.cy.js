// put your tests here

describe('UI test for app', () => {
  beforeEach('visit home page', () => {
    cy.visit('/')
  });
  
  it('It should load the homepage', () => {
    cy.title().should('eq', 'Your average form');
    cy.get('h1').should('contain', 'Your average form');
  });

  it('checks if Username and Password fields are fillable', () => {
    // Check if the Username field is fillable
    cy.get('#username').should('be.visible').type('Max').should('have.value', 'Max');

    // Check if the Password field is fillable
    cy.get('#password').should('be.visible').type('1488').should('have.value', '1488');
  });

  it('check radio buttons for gender selection are selectable', () => {
    // Check if the Male radio button is selectable
    cy.get('#genderMale').should('be.visible').check().should('be.checked');

    // Check if the Female radio button is selectable
    cy.get('#genderFemale').should('be.visible').check().should('be.checked');
  });

  it('checks possible to select hobby checkboxs', () => {
    // Check if the Reading checkbox is selectable and then unselectable
    cy.get('input[value="Reading"]').should('be.visible').check().should('be.checked');
    cy.get('input[value="Reading"]').uncheck().should('not.be.checked');

    // Check if the Sports checkbox is selectable and then unselectable
    cy.get('input[value="Sports"]').should('be.visible').check().should('be.checked');
    cy.get('input[value="Sports"]').uncheck().should('not.be.checked');

    // Check if the Music checkbox is selectable and then unselectable
    cy.get('input[value="Music"]').should('be.visible').check().should('be.checked');
    cy.get('input[value="Music"]').uncheck().should('not.be.checked');
  });

  it('verifies the exist of three options in the time selection dropdown', () => {
    // Get the time select dropdown and verify the number of options
    cy.get('#time').find('option').should('have.length', 4);
    
    // Verify the text of each option
    cy.get('#time').find('option').eq(1).should('have.text', 'Morning');
    cy.get('#time').find('option').eq(2).should('have.text', 'Noon');
    cy.get('#time').find('option').eq(3).should('have.text', 'Evening');
  });

  it('verifies that selecting different times updates the time field', () => {
    // Select "Morning" and verify
    cy.get('#time').select('Morning');
    cy.get('#time').should('have.value', 'Morning');

    // Select "Noon" and verify
    cy.get('#time').select('Noon');
    cy.get('#time').should('have.value', 'Noon');

    // Select "Evening" and verify
    cy.get('#time').select('Evening');
    cy.get('#time').should('have.value', 'Evening');
  });

  it('fills out the form with specific values and submits it', () => {
    // Visit the form page
    cy.visit('/');

    // Fill Username input
    cy.get('#username').type('Max');
  
    // Fill Password input
    cy.get('#password').type('1488');
  
    // Select Male for Gender
    cy.get('#genderMale').check();
  
    // Check Sports hobby checkbox
    cy.get('input[value="Sports"]').check();
  
    // Select Noon for Time
    cy.get('#time').select('Noon');
  
    // Submit the form
    cy.get('form').submit();
  });

  it('should display loading animation after form submission', () => {
    // Visit the form page
    cy.visit('/');

    // Fill out the form
    cy.get('#username').type('Max');
    cy.get('#password').type('1488');
    cy.get('#genderMale').check();
    cy.get('input[value="Reading"]').check();
    cy.get('#time').select('Morning');

    // Submit the form
    cy.get('form').submit();

    // Assert that the loading animation is displayed
    cy.get('.overlay').should('be.visible');
    cy.get('.loading-animation').should('be.visible');
  });
});


describe('Form Submission Test', () => { // doesnt work https://prnt.sc/MXFvBeSiOODY maybe use invoke property for saved data user?
  it('fills out the form, submits it, and verifies the result page', () => {
    // Visit the form page
    cy.visit('/');

    // Fill out the form
    cy.get('#username').type('Max');
    cy.get('#password').type('1488');
    cy.get('#genderMale').check();
    cy.get('input[value="Reading"]').check();
    cy.get('#time').select('Morning');

    // Submit the form
    cy.get('form').submit();

    // Assert that the result page is displayed
    cy.url().should('include', '/results');

    // Assert user data on the result page
    cy.contains('Greetings, Max').should('be.visible'); // Verify username
    cy.contains('Gender').next().should('contain', 'Male'); // Verify gender
    cy.contains('Hobbies').next().should('contain', 'Reading'); // Verify hobbies
    cy.contains('Time').next().should('contain', 'Morning'); // Verify time
  });
});

// test for all required data for submit(Assert that appropriate error messages are displayed for each required field.) chains and DOM?

// test