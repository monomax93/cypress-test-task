
export const homePage = {
  title: () => cy.get('h1'),
  // Selectors for form inputs
  usernameInput: () => cy.get('#username'),
  passwordInput: () => cy.get('#password'),
  genderMaleCheckbox: () => cy.get('#genderMale'),
  genderFemaleCheckbox: () => cy.get('#genderFemale'),
  readingOption: () => cy.get('input[value="Reading"]'),
  sportsOption: () => cy.get('input[value="Sports"]'),
  musicOption: () => cy.get('input[value="Music"]'),
  timeSelect: () => cy.get('#time'),

  // Actions for filling out the form
  setUsername(username) {
    this.usernameInput().type(username).should('have.value', username);
    return this;
  },

  setPassword(password) {
    this.passwordInput().type(password).should('have.value', password);
    return this;
  },

  // genderCheckbox(gender) {
  //   if (gender === 'male') {
  //     this.genderMaleCheckbox().should('be.visible').check();
  //   } else if (gender === 'female') {
  //     this.genderFemaleCheckbox().should('be.visible').check();
  //   }
  // },

  selectGender(gender) {
    const expectedGenders = ['Male', 'Female'];
    if (!expectedGenders.includes(gender)) {
      throw new Error(`${gender} is not supported, valid genders: ${expectedGenders}`);
    }
    cy.get('#gender').contains(gender).click() ;
  },
  
// some way for selector 
  // setGender(gender) {
  //   const selector = `#gender${gender}`; //'#genderMale'
  //   cy.get(selector).click();
  //   return this;
  // },
  
  checkHobbies(hobbies) {
    hobbies.forEach((hobby) => {
      if (hobby === 'Reading') {
        this.readingOption().check();
      } else if (hobby === 'Sports') {
        this.sportsOption().check();
      } else if (hobby === 'Music') {
        this.musicOption().check();
      }
    });
    return this;
  },

  // Select time from dropdown
  selectTime(time) {
    this.timeSelect().select(time);
    return this;
  }
};
