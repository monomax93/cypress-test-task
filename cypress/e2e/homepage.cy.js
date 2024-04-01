
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

  it.only('fills out the form for user1, submits it, and verifies the result page', function () {
    cy.fixture('form_data.json').then((formData) => {
        homePage.setUsername(formData.user1.username);
        homePage.setPassword(formData.user1.password);
        homePage.selectGender('Female'); // or function selectGender(gender) ??what(
        homePage.checkHobbies(["Music", "Sports", "Reading"]);
        homePage.timeSelect().select(formData.user1.time);

        cy.get('form').submit();

        cy.url().should('include', '/results');

        resultsPage.greetings().should('be.visible').and('contain', formData.user1.username);
        resultsPage.gender().should('contain', "Female");
        resultsPage.hobbies().then(($hobbies) => {
            const hobbiesText = $hobbies.text();
            formData.user1.hobbies.forEach((hobby) => {
                expect(hobbiesText).to.match(new RegExp(hobby, 'i')); // shit from GPT
            });
        });
        resultsPage.time().should('contain', formData.user1.time);
    });
});

  it('should display loading animation after form submission', () => {
    cy.fixture('form_data.json').then((formData) => {
      const user2 = formData.user2;
      // Fill out the form with user2 data
      homePage.setUsername(user2.username);
      homePage.setPassword(user2.password);
      // homePage.checkGender(user2.gender);
      homePage.genderCheckbox('famale');
      homePage.checkHobbies(user2.hobbies);
      homePage.timeSelect().select(user2.time);
  
      // Submit the form
      cy.get('form').submit();
      
      // Assert that the loading animation is displayed
      cy.get('.overlay').should('be.visible');
      cy.get('.loading-animation').should('be.visible');
    });
  });


  // not e2e test!
  it('2checks  Username and Password fields are fillable', () => {
    cy.fixture('form_data.json').then((formData) => {
      const user1 = formData.user1;
      homePage.setUsername(user1.username);
      homePage.setPassword(user1.password);
  
      homePage.usernameInput().should('be.visible').should('have.value',user1.username);
      homePage.passwordInput().should('be.visible').should('have.value',user1.password);
    });
  });
  
  it('check radio buttons for gender selection are selectable', () => {
    // Check if the Male radio button is selectable
    homePage.selectGender('Male');
    // Check if the Female radio button is selectable
    homePage.selectGender('Female');
    // what was the point of this test? what did you test? that HTML is correct?
    // why not to test that after selecting data is displayed correctly on the next page?
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

  it('verifies the exist of three options in the time selection dropdown', () => {
    cy.get('#time').within(() => {
      cy.get('option').contains('Morning').should('exist');
      cy.get('option').contains('Noon').should('exist');
      cy.get('option').contains('Evening').should('exist');
    });
  });

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

describe('Negative ', () => {
  it('should display error messages for required fields when form is submitted with empty values', () => {
    cy.visit('/')
    cy.get('form').submit(); // from submit witiout data((
    cy.get('#username-error').should('be.visible').and('contain', 'Username is required');
    cy.get('#password-error').should('be.visible').and('contain', 'Password is required');
    cy.get('#gender-error').should('be.visible').and('contain', 'Gender is required');
    cy.get('#time-error').should('be.visible').and('contain', 'Time is required');
  });
})
});