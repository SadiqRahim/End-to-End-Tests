describe('validate cookies', () => {
  beforeEach(() => {
    cy.visit('https://www.fxellence.com')
  });
  it('cookies should disapper after accepting', () => {
    cy.get('#cookie-notification').should('be.visible');
    cy.get('#cookie-notification__accept').click()
    cy.get('#cookie-notification').should('not.be.visible');
  });

  it('cookies should disapper after decline', () => {
    cy.get('#cookie-notification').should('be.visible');
    cy.get('#cookie-notification__decline').click()
    cy.get('#cookie-notification').should('not.be.visible');
  });
});

describe('click events takes user to the right section', () => {
  beforeEach(() => {
    cy.visit('https://www.fxellence.com')
    cy.get('#cookie-notification__accept').click()
  });

  it('click on contact takes to the right position', () => {
    cy.scrollTo('top');

    let sectionPositionBeforeClick;
    cy.get('.home_bannerpadding__bCLPB').then(($section) => {
      sectionPositionBeforeClick = $section[0].getBoundingClientRect();
    });

    cy.contains('Contact').should('be.visible').click();

    cy.get('#contact > .MuiContainer-root').then(($section) => {
      const sectionPositionAfterClick = $section[0].getBoundingClientRect();

      expect(sectionPositionAfterClick.top).to.be.greaterThan(sectionPositionBeforeClick.top);
    });
  });

  it('click on find out more takes to the right position', () => {
    cy.scrollTo('top');

    let sectionPositionBeforeClick;
    cy.get('.home_bannerpadding__bCLPB').then(($section) => {
      sectionPositionBeforeClick = $section[0].getBoundingClientRect();
    });

    cy.get('.home_readmorebutton__7ekO_').should('be.visible').click();

    cy.get('#contact > .MuiContainer-root').then(($section) => {
      const sectionPositionAfterClick = $section[0].getBoundingClientRect();

      expect(sectionPositionAfterClick.top).to.be.greaterThan(sectionPositionBeforeClick.top);
    });
  });

  it.skip('click on home takes me back to the top of the page', () => {
    cy.scrollTo('bottom');

    let sectionPositionBeforeClick;
    cy.get('.home_footer___sLNy').then(($section) => {
      sectionPositionBeforeClick = $section[0].getBoundingClientRect();
    });

    cy.contains('Home').click();

    cy.get('.home_bannerpadding__bCLPB').then(($section) => {
      const sectionPositionAfterClick = $section[0].getBoundingClientRect();

      expect(sectionPositionAfterClick.top).to.be.greaterThan(sectionPositionBeforeClick.top);
    });
  });
});

describe('validate images', () => {
  beforeEach(() => {
    cy.visit('https://www.fxellence.com');
    cy.get('#cookie-notification__accept').click();
  })

  it('validate logo image', () => {
    cy.get('.MuiToolbar-root > img')
      .should(($img) => {
        expect($img).to.exist;
        expect($img).to.have.attr('src', './images/fx_logo.png');
        
       //Check the displayed width and height using CSS properties
        expect($img).to.have.css('width', '262px'); 
        expect($img).to.have.css('height', '71px'); 
      });
  })

  it('validate live rate image', () => {
    cy.get('.MuiGrid-root:nth-child(2) > img')
      .should(($img) => {
        expect($img).to.exist;
        expect($img).to.have.attr('src', './images/liverate.png');
        
       //Check the displayed width and height using CSS properties
        expect($img).to.have.css('width').that.is.oneOf(['542.4140625px', '542.40625px']);
        expect($img).to.have.css('height').that.is.oneOf(['501.8671875px', '501.859375px']); 
      });
  });

  it('validate footer logo image', () => {
    cy.scrollTo('bottom');
    
    cy.get('.MuiGrid-grid-md-8 > img')
      .should(($img) => {
        expect($img).to.exist;
        expect($img).to.have.attr('src', './images/fx_logo.png');
        
       //Check the displayed width and height using CSS properties
       expect($img).to.have.css('width', '190px'); 
       expect($img).to.have.css('height', '51.484375px'); 
      });
  });
});

describe.skip('send contact details', () => {
  beforeEach(() => {
    cy.visit('https://www.fxellence.com')
    cy.get('#cookie-notification__accept').click()
  })

  it('able to fill form and send contact details', () => {
    cy.get('[name="name"]').type('automated test');
    cy.get('[name="companyname"]').type('fxellence test');
    cy.get('[name="email"]').type('test@fxellence.com');
    cy.get('[name="mobile"]').type('+447000000000');
    cy.get('.home_textarea__8j0xn').type(`Imagine a furry humanoid seven feet tall, with the face 
      of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked 
      like except for their teeth. The canines would have fitted better in the face of a tiger, and 
      showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.`);

    cy.intercept('POST', 'https://forms.nicepagesrv.com/v2/form/process').as('postRequest');
    cy.get('.home_sentbutton__f_8gV').click();

    cy.wait('@postRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get('.home_submit__C_6mg').should('contain.text','Thank you! Your message has been sent.');

  });
});

describe('validate footer section', () => {
  beforeEach(() => {
    cy.visit('https://www.fxellence.com')
    cy.get('#cookie-notification__accept').click()
  })
  
  it('should see the social media icons', () => {
    cy.scrollTo('bottom');

    cy.get('a.home_button__l6_Ic:nth-child(1)').should('have.attr', 'href', 
      'https://www.facebook.com/people/FXellence/100094004388155/');
  
  
      cy.get('a.home_button__l6_Ic:nth-child(2)').should('have.attr', 'href',   
      'https://twitter.com/fxellenceip');

      cy.get('[data-testid="LinkedInIcon"]').should('be.visible'); //Not working yet
      cy.get('[data-testid="InstagramIcon"]').should('be.visible'); //Not working yet

  })
})