
// two things to improve:
// 1. too many separate tests for each small detail, in this case we should use cypress as e2e testing tool, 
// meaning we should test the whole process of filling the form and submitting it with different data
// 2. Negative scenarios? Can we check required fields with current implementation of the form? I don't know, but it's worth checking

import { homePage } from "../pages/homePage"
import { resultsPage } from "../pages/resultPage"

describe('UI test for app', () => {

  beforeEach('visit home page', () => {
    cy.visit('/')
    cy.fixture('form_data.json').as('formData');
  });

  it('It Should verify the title of form', () => {
    cy.title().should('eq', 'Your average form');
    cy.get('.container h1').should('contain', 'Your average form')
  });

  it('check Username and Password fields are fillable', () => {
    cy.fixture('form_data.json').then((formData) => {
      homePage.setUsername(formData.user1.username);
      homePage.usernameInput().should('be.visible').should('have.value', formData.user1.username);
      homePage.passwordInput().should('be.visible').type(formData.user1.password).should('have.value', formData.user1.password);
    });
  });

  it('check radio buttons for gender selection are selectable', () => {
    // Check if the Male radio button is selectable
    homePage.genderMaleCheckbox().should('be.visible').check().should('be.checked');

    // Check if the Female radio button is selectable
    homePage.genderFemaleCheckbox().should('be.visible').check().should('be.checked');
  });

  it('checks possible to select hobby checkboxs', () => {
    // Check if the Reading checkbox is selectable and then unselectable
    homePage.readingOption().should('be.visible').check().should('be.checked');
    homePage.readingOption().uncheck().should('not.be.checked');

    // Check if the Sports checkbox is selectable and then unselectable
    homePage.sportsOption().should('be.visible').check().should('be.checked');
    homePage.sportsOption().uncheck().should('not.be.checked');

    // Check if the Music checkbox is selectable and then unselectable
    homePage.musicOption().should('be.visible').check().should('be.checked');
    homePage.musicOption().uncheck().should('not.be.checked');
  });

  // it('verifies the exist of three options in the time selection dropdown', () => {
  //   cy.get('#time').within(() => {
  //     cy.get('option').contains('Morning').should('exist');
  //     cy.get('option').contains('Noon').should('exist');
  //     cy.get('option').contains('Evening').should('exist');
  //   });
  // });

  it('verifies that selecting different times updates the time field', () => {
    // use chain commands
    cy.get('#time').select('Morning')
    .should('have.value', 'Morning')
    .get('#time')
    .select('Noon')
    .should('have.value', 'Noon')
    .get('#time')
    .select('Evening')
    .should('have.value', 'Evening');
  });

  it('should display loading animation after form submission', () => {
    cy.fixture('form_data.json').then((formData) => {
      const user2 = formData.user2;
      // Fill out the form with user1 data
      homePage.setUsername(user2.username);
      homePage.passwordInput().type(user2.password);
      homePage.checkGender(user2.gender);
      homePage.checkHobbies(user2.hobbies);
      homePage.timeSelect().select(user2.time);
  
      // Submit the form
      cy.get('form').submit();
      
      // Assert that the loading animation is displayed
      cy.get('.overlay').should('be.visible');
      cy.get('.loading-animation').should('be.visible');
    });
    
  });

  it('fills out the form for user1, submits it, and verifies the result page', function () {
    cy.get('@formData').then((formData) => {
      homePage.setUsername(formData.user1.username);
      homePage.passwordInput().type(formData.user1.password);
      homePage.genderMaleCheckbox().check();
      homePage.checkHobbies(formData.user1.hobbies);
      homePage.timeSelect().select(formData.user1.time);
  
      cy.get('form').submit();
  
      cy.url().should('include', '/results');
  
      resultsPage.greetings().should('be.visible').and('contain', formData.user1.username);
      resultsPage.gender().should('contain', formData.user1.gender);
      resultsPage.hobbies().should('contain', formData.user1.hobbies.join(', '));
      resultsPage.time().should('contain', formData.user1.time);
    });
  });
});