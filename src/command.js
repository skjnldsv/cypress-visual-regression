function compareSnapshotCommand() {
  /* eslint-disable no-undef */
  Cypress.Commands.add('compareSnapshot', (name) => {
    cy.screenshot(name);
  });
  /* eslint-enable no-undef */
}

module.exports = compareSnapshotCommand;
