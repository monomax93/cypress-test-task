
export const resultsPage = {
  greetings: () => cy.contains('Greetings,'),
  gender: () => cy.contains('Gender').next(),
  hobbies: () => cy.contains('Hobbies').next(),
  time: () => cy.contains('Time').next()
}


// export const resultsPage = {
//   verifyGreetings(username) {
//     cy.contains(`Greetings, ${username}`).should('be.visible');
//   },

//   verifyGender(gender) {
//     cy.contains('Gender').next().should('contain', gender);
//   },

//   verifyHobbies(hobbies) {
//     cy.contains('Hobbies').next().should('contain', hobbies);
//   },

//   verifyTime(time) {
//     cy.contains('Time').next().should('contain', time);
//   }
// };

