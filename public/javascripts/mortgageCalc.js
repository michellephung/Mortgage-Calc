//Mortgage Calculator Javascript 
var MortgageCalculator= function(){


  var loanAmount = 100000;
  var interestRate = 5;
  var years= 30;
  var fixedMonthlyPayment = 0; 
 
  this.loan = $('#loanBox');
  this.rate= $('#interestBox');
  this.months = $('#termBox');
  
  this.loanSlider = $('#loanSlider');
  this.interestSlider =$('interestSlider');
  this.termSlider = $('termSlider');
  
  this.calculate = $('#calculate');
  
  this.initialize = function(){    this.eventListener();  }
  this.getLoanAmount = function(){    return loanAmount;  }
  
  this.getRate = function() {    return ((0.01*interestRate)/12);  }
  
  this.getMonths = function(){    return (years*12);  }
  
  this.getFixedMonthlyPayment = function(){    return fixedMonthlyPayment;  }
  
  this.setLoanAmount = function(loan) {
    loanAmount=loan;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();
  }
  
  this.setInterestRate = function(rate){
    interestRate=rate;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();

  }
  
  this.setYears = function(numberOfYears){
    years=numberOfYears;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();

  }
  
  this.setFixedMonthlyPayment = function(){
    var loan=this.getLoanAmount();
    var rate=this.getRate();
    var months=this.getMonths();
    //   console.log("loan:"+loan+" rate:"+rate+" months:"+months);
      
    fixedMonthlyPayment=
      ((loan*rate*Math.pow(1+rate,months))/(Math.pow(1+rate,months)+1));
   
  }
   
  var self = this; 
  
  this.setVariables= function(){
        self.setLoanAmount(self.loan.val());
        self.setInterestRate(self.rate.val());
        self.setYears(self.months.val());
  }
  
  this.refreshOnScreenVariables= function(){
      this.loan.val(loanAmount);
      this.rate.val(interestRate);
      this.months.val(years);
      
      this.loanSlider.val(loanAmount);
      this.interestSlider.val(interestRate);
      this.termSlider.val(years);
      $('#pay').html('$'+fixedMonthlyPayment.toFixed(2));  
      
       
  }
  
  
  this.eventListener = function(){
     this.calculate.click(function(){
        self.setVariables();
//        console.log("fixedMP: "+fixedMonthlyPayment);
      });
      
     this.loanSlider.change(function(){
        self.setLoanAmount(parseFloat(self.loanSlider.val()));
       // alert("hi from loan slider");
     }); 
     this.loan.change(function(){
      self.setLoanAmount(parseFloat(self.loan.val()));  
     });

     this.interestSlider.change(function(){
      alert("hi from interest slider");
     });   
     
     this.rate.change(function(){
      alert('hi from rate Box');
     }) ;  
     
     this.termSlider.change(function(){
      alert('hi from term slider');
     });
     
     this.months.change(function(){
      alert('hi from term Box');
     });
      
  }
  this.initialize();

}