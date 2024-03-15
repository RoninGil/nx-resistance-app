const mock = {
    brown: {
      digitValue: 1,
      multiplier: 10,
      tolerancePercentage: 1
    },
    red: {
        digitValue: 2,
        multiplier: 100,
        tolerancePercentage: 2
    },
    orange: {
      digitValue: 3,
      multiplier: 1000,
      tolerancePercentage: 0.05
    },
}

const apiUrl = 'http://localhost:3333/api/resistanceValues';

describe('resistance-ui-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
    
    cy.intercept("GET", apiUrl, {
      statusCode: 200,
      body: {data:{
        ...mock  
      }}
    });
  });

  it('should display welcome message', () => {

    // Function helper example, see `../support/app.po.ts` file
    cy.contains(/Welcome to the electric resistance calculator!/);
    
    cy.get('[data-testid="band1"]').click();
    cy.contains(/Selected Band: band1/);
    
    cy.get('[data-testid="brown"]').click();

    cy.get('[data-testid="band2"]').click();
    cy.contains(/Selected Band: band2/);
    
    cy.get('[data-testid="red"]').click();

    cy.get('[data-testid="band3"]').click();
    cy.contains(/Selected Band: band3/);
    
    cy.get('[data-testid="orange"]').click();

    cy.get('[data-testid="band4"]').click();
    cy.contains(/Selected Band: band4/);
    
    cy.get('[data-testid="brown"]').click();

    /*the colors are [brown, red, orange, brown], so the values should be:
        Min Value: 11880 Ω
        Original Value: 12000 Ω
        Max Value: 12120 Ω
    */

    cy.contains(/Min Value: 11880 Ω/);
    cy.contains(/Original Value: 12000 Ω/);
    cy.contains(/Max Value: 12120 Ω/);
  });
});
