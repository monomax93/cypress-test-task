
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
  
    // Check gender based on the value provided
    checkGender(gender) {
      if (gender === 'Male') {
        this.genderMaleCheckbox().check();
      } else if (gender === 'Female') {
        this.genderFemaleCheckbox().check();
      }
      return this;
    },
  
    // Check hobbies based on the values provided
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
    },
  };
  
