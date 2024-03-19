
export const resultsPage = {
  greetings: () => cy.contains('Greetings,'),
  gender: () => cy.contains('Gender').next(),
  hobbies: () => cy.contains('Hobbies').next(),
  time: () => cy.contains('Time').next()
}
