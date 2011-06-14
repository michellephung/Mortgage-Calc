describe('Mortgage Calculator', function(){

  beforeEach(function(){
    var loanInput = $('<input id="loanAmount" type="number" value="100000"/>');
    var rateInput = $('<input id="interestRate" type="number" value="5"/>');
    var termInput = $('<input id="term" type="number" value="30"/>');
    var click = $('<input id="calculate" type="button" value="Calculate!"/>');
    var result = $('<div >Fixed Monthly Payment:<span class="pay">abc</span></div>');
    
    $('#jasmine_content').append(loanInput, rateInput, termInput);
    this.calc= new MortgageCalculator();
  });
  
  afterEach(function(){
    $('#jasmine_content').html('');
  });
  
  describe('properties', function(){
    it('has a loan amount property', function(){
      expect(this.calc.getLoanAmount()).toEqual(100000);
    });
    
    it('has an interest rate property', function(){
      expect(this.calc.getRate()).toEqual(0.02);
    });
    
    it('has a term property', function(){
      expect(this.calc.getMonths()).toEqual(360);
    });
    
    it('has a fixed monthly payment property', function(){
      expect(this.calc.getFixedMonthlyPayment()).toEqual(0);
    });
    
  });
  
  describe('functions', function(){
    it('calculates how many months in term',function(){
      expect(this.calc.getMonths()).toEqual(360);
      this.calc.setYears(1);
      expect(this.calc.getMonths()).toEqual(12);
    });
    
    it('calculates interest rate',function(){
      expect(this.calc.getRate()).toEqual(0.02);
      this.calc.setInterestRate(48);
      expect(this.calc.getRate()).toEqual(0.04)
      
    });
    
    it('calculates fixed monthly payment property',function(){
      expect(this.calc.getFixedMonthlyPayment()).toEqual(0);
      this.calc.setLoanAmount(9);
      this.calc.setInterestRate(1200);
      this.calc.setYears(0.25);
      this.calc.setFixedMonthlyPayment();
      expect(this.calc.getFixedMonthlyPayment()).toEqual(8);
    });
  });

  
  describe('elements',function(){
    it('calculates payment amount when button is clicked',function(){
   
    });
  });


});