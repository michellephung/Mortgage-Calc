//Mortgage Calculator Spec

describe('Mortgage Calculator', function(){
var calc;
  beforeEach(function(){
  
    
    var loanInputDOM = $('<input id="loanBox" type="number" value="100000"/>');
    var loanSliderDOM = $('<input id="loanSlider" type="range" value="100000" min="1" max="2000000"/>');
    
    var rateInputDOM = $('<input id="interestBox" type="number" value="5"/>');
    var rateSliderDOM = $('<input id="interestSlider" type="range" value="5" min="1" max="100"/>');  
    
    var termInputDOM = $('<input id="termBox" type="number" value="30"/>');
    var termSliderDOM = $('<input id="termSlider" type="range" value="30" min="1" max="50"/>');
    
   
   $('#jasmine_content').append(loanInputDOM,loanSliderDOM, rateInputDOM, rateSliderDOM, termInputDOM, termSliderDOM);
   this.calc= new MortgageCalculator();
    
       
  });
  
  afterEach(function(){
    $('#jasmine_content').html('');
  });
  
   describe('something', function(){
    it('is a test', function(){
      
    })
  });

  /*
  describe('properties', function(){
    it('has a loan amount property', function(){
      expect(parseFloat(this.calc.getLoanAmount())).toEqual(100000);
    });
    
    it('has an interest rate property', function(){
      expect(parseFloat(this.calc.getRate().toFixed(4))).toEqual(0.0042);
    });
    
    it('has a term property', function(){
      expect(this.calc.getMonths()).toEqual(360);
    });
    
    it('has a fixed monthly payment property', function(){
      expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(2))).toEqual(536.82);
    });
    
  });
  

  describe('functions', function(){
    it('calculates how many months in term',function(){
      expect(this.calc.getMonths()).toEqual(360);
      this.calc.setYears(1);
      expect(this.calc.getMonths()).toEqual(12);
    });
    
    it('calculates interest rate',function(){
      expect(parseFloat(this.calc.getRate().toFixed(4))).toEqual(0.0042);
      this.calc.setInterestRate(48);
      expect(this.calc.getRate()).toEqual(0.04)
      
    });
    
    it('calculates fixed monthly payment amount',function(){
     expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(2))).toEqual(536.82);
      this.calc.setLoanAmount(123456);
      this.calc.setInterestRate(6);
      this.calc.setYears(40);
      expect(parseFloat((this.calc.getFixedMonthlyPayment()).toFixed(0))).toEqual(679);
    });
    
    it('calculates new loan amount for month n',function(){
      //for one month
      expect(parseFloat(this.calc.getLoanForMonth(1))).toEqual(100000);
      //for two months
      expect(parseFloat(this.calc.getLoanForMonth(2).toFixed(0))).toEqual(99463);
      //for three months
      expect(parseFloat(this.calc.getLoanForMonth(3).toFixed(2))).toEqual(98926.36);
      //for four months
      expect(parseFloat(this.calc.getLoanForMonth(4).toFixed(2))).toEqual(98389.54);

    });
    
    it('calculates interest paid for month n',function(){
      //for first month's payment
      expect(parseFloat(this.calc.getInterestForMonth(1).toFixed(2))).toEqual(416.67);
      //for 2nd month's payment
      expect(parseFloat(this.calc.getInterestForMonth(2).toFixed(2))).toEqual(414.43);
      //for 3rd month's payment
      expect(parseFloat(this.calc.getInterestForMonth(3).toFixed(2))).toEqual(412.19);
      //for 4th month's payment
      expect(parseFloat(this.calc.getInterestForMonth(4).toFixed(2))).toEqual(409.96);
    });
    
    it('calculates principle paid for month n',function(){
      //for first month's payment
      expect(parseFloat(this.calc.getPrincipleForMonth(1).toFixed(2))).toEqual(120.15);
      //for 2nd month's payment
      expect(parseFloat(this.calc.getPrincipleForMonth(2).toFixed(2))).toEqual(122.39);
      //for 3rd month's payment
      expect(parseFloat(this.calc.getPrincipleForMonth(3).toFixed(2))).toEqual(124.63);
      //for 4th month's payment
      expect(parseFloat(this.calc.getPrincipleForMonth(4).toFixed(2))).toEqual(126.87);

    });
//------------------------------------------------------------------------------------
    
  });
  
  describe('sliders', function(){
    it('calculates payment when loan slider changes',function(){
      expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(0))).toEqual(537);
      this.calc.loanSlider.val(234567);
      this.calc.loanSlider.change();
      expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(0))).toEqual(1259);
    });
    
    it('calculates payment when interest slider changes',function(){
      expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(0))).toEqual(537);
      this.calc.interestSlider.val(6);
      this.calc.interestSlider.change();
      expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(0))).toEqual(600);
    });
    
    it('calculates payment when term slider changes',function(){
      expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(0))).toEqual(537);
      this.calc.termSlider.val(15);
      this.calc.termSlider.change();
      expect(parseFloat(this.calc.getFixedMonthlyPayment().toFixed(0))).toEqual(791);
    
    });
    
    
    it('updates text box when loan slider changes',function(){
      expect(parseFloat(this.calc.loan.val())).toEqual(100000);
      this.calc.loanSlider.val(234567);
      this.calc.loanSlider.change();
      expect(parseFloat(this.calc.loan.val())).toEqual(234567);
    });
  
    it('updates text box when interest slider changes',function(){
      expect(parseFloat(this.calc.rate.val())).toEqual(5);
      this.calc.interestSlider.val(50);
      this.calc.interestSlider.change();
      expect(parseFloat(this.calc.rate.val())).toEqual(50);
    });
  
    it('updates text box when term slider changes',function(){
      expect(parseFloat(this.calc.months.val())).toEqual(30);
      this.calc.termSlider.val(45);
      this.calc.termSlider.change();
      expect(parseFloat(this.calc.months.val())).toEqual(45);
    });

         
  });
  
  describe('error checking', function(){
    it('loan amount value cannot be over 2000000',function(){
    expect(parseFloat(this.calc.getLoanAmount())).toEqual(100000);
    this.calc.setLoanAmount(3000000);
    expect(this.calc.getLoanAmount()).toEqual(2000000);
    });
    
    it('rate amount value cannot be over 100',function(){
    expect(parseFloat(this.calc.getRate().toFixed(4))).toEqual(0.0042);
    this.calc.setInterestRate(200);
    expect(parseFloat(this.calc.getRate().toFixed(4))).toEqual(0.0833);
    });
    
    it('term amount value cannot be over 50',function(){
    expect(this.calc.getMonths()).toEqual(360);
    this.calc.setYears(90);
    expect(this.calc.getMonths()).toEqual(600);
    });
  });
  
/*
  describe('',function(){
  
  });
*/
  

});