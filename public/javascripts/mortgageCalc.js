var MortgageCalculator= function(){


  var loanAmount = 100000;
  var interestRate = 24;
  var years= 30;
  var fixedMonthlyPayment = 0;
  
  
  this.loan = $('loanAmount');
  this.rate= $('interestRate');
  this.months$('term');
  
  this.calculate = $('#calculate');
  
  this.getLoanAmount = function(){
    return loanAmount;
  }
  
  this.getRate = function() {
    return ((0.01*interestRate)/12);
  }
  
  this.getMonths = function(){
    return years*12;
  }
  
  this.getFixedMonthlyPayment = function(){
    return fixedMonthlyPayment;
  }
  
  this.setLoanAmount = function(loan) {
    loanAmount=loan;
  }
  
  this.setInterestRate = function(rate){
    interestRate=rate;
  }
  
  this.setYears = function(numberOfYears){
    years=numberOfYears;
  }
  
  this.setFixedMonthlyPayment = function(){
  
    var loan=this.getLoanAmount();
    var rate=this.getRate();
    var months=this.getMonths();
  
   fixedMonthlyPayment=((loan*rate*Math.pow(1+rate,months))/(Math.pow(1+rate,months)+1));
   
  }
  
  this.calculate.click(function(){
    this.setLoanAmount(parseFloat(this.loan.val()));
    this.setInterestRate(parseFloat(this.rate.val()));
    this.setYears(parseFloat(this.rate.val()));
    setFixedMonthlyPayment();
    
    this.setYears(10);

  });




}