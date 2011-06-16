//Mortgage Calculator Javascript 
var MortgageCalculator= function(){


  var loanAmount = 100000;
  var interestRate = 5;
  var years= 30;
  var fixedMonthlyPayment = 0; 
  var total=0;
  var totalInterest=0;
 
  this.loan = $('#loanBox');
  this.rate= $('#interestBox');
  this.months = $('#termBox');
  
  this.loanSlider = $('#loanSlider');
  this.interestSlider =$('#interestSlider');
  this.termSlider = $('#termSlider');
  
  this.visual = $('#visual');
  var paper = Raphael("visual", 1000,1000); //creates a 1000 by 1000 canvas to work on
      
    
    
  this.calculate = $('#calculate');
  
  
  
  this.initialize = function(){ 
    this.eventListener();
    this.setVariables();
    this.refreshOnScreenVariables();
     
  }
  
  
  this.getLoanAmount = function(){
    return loanAmount;  
  }
  
  
  
  this.getRate = function() {
   return ((0.01*interestRate)/12);  
  }
  
  this.getMonths = function(){
    return (years*12);  
  }
  
  this.getFixedMonthlyPayment = function(){
   return fixedMonthlyPayment;  
  }
  
  this.getTotal = function(){
    return total;
  }

// this is wrong!
  this.getLoanForMonth = function(n){
    return (loanAmount-(fixedMonthlyPayment*(n-1)));
    
  }


  
 /*
 this.getLoanForMonth = function(n){
    if(n==1) return loanAmount;
    else return (this.getLoanForMonth(n-1)-this.getPrincipleForMonth(n-1));
    //does this work?
    
    
  }
*/
  
  this.getInterestForMonth = function(n){
    return ((this.getLoanForMonth(n))*this.getRate());
  }
  
  this.getPrincipleForMonth = function(n){
    return (fixedMonthlyPayment-(this.getLoanForMonth(n)*this.getRate()));
  }
//--------------------------------------------------------  
  this.drawOneMonth = function(n){
    var interestVisual= paper.rect(5,50,50,this.getInterestForMonth(n)/10 );
    
    console.log("fixedMOnthly:" + fixedMonthlyPayment);
    console.log("principleformonthn:"+this.getPrincipleForMonth(n));
    console.log("interestformonthn:"+this.getInterestForMonth(n));
    
    var principleVisual=paper.rect(5,(this.getInterestForMonth(n)/10)+52,50,this.getPrincipleForMonth(n)/10 );
    
      principleVisual.attr("fill", "#0000FF");  //blue
      principleVisual.attr("stroke", "#000");  
      
      interestVisual.attr("fill", "#FF0080");   //red
      interestVisual.attr("stroke", "#000"); //yellow
  }


  this.setLoanAmount = function(loan) {
    if(loan>2000000)  loanAmount=2000000;
    else loanAmount=loan;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();
    

  }
  
  this.setInterestRate = function(rate){
    if(rate>100) interestRate=100;
    else interestRate=rate;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();

  }
  
  this.setYears = function(numberOfYears){
    if(numberOfYears>50) years=50;
    else years=numberOfYears;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();

  }
  
  this.setFixedMonthlyPayment = function(){
    var loan=this.getLoanAmount();
    var rate=this.getRate();
    var months=this.getMonths();
    //   console.log("loan:"+loan+" rate:"+rate+" months:"+months);
      
    fixedMonthlyPayment=
      ((loan*rate*Math.pow(1+rate,months))/(Math.pow(1+rate,months)-1));
         
  }
  
  this.setTotal = function(){
    total=fixedMonthlyPayment*this.getMonths();
    totalInterest=total-loanAmount;
    
  }
  
     
  var self = this; 
  
  this.setVariables= function(){
        self.setLoanAmount(self.loan.val());
        self.setInterestRate(self.rate.val());
        self.setYears(self.months.val());
        self.setTotal();
  }
  
  this.refreshOnScreenVariables= function(){
      this.loan.val(loanAmount);
      this.rate.val(interestRate);
      this.months.val(years);
       
      
      this.loanSlider.val(loanAmount);
      this.interestSlider.val(interestRate);
      this.termSlider.val(years);
      
      this.setTotal();
      
      $('#pay').html('$'+fixedMonthlyPayment.toFixed(2)); 
      $('#totalPaid').html('$'+total.toFixed(2));
      $('#interestPaid').html('$'+totalInterest.toFixed(2)); 
      
       
  }
  
  
  
  this.eventListener = function(){
    this.calculate.click(function(){
      self.setVariables();
//        console.log("fixedMP: "+fixedMonthlyPayment);
    });
      
    this.loanSlider.change(function(){
      self.setLoanAmount(parseFloat(self.loanSlider.val()));
      
    }); 
    this.loan.change(function(){
      self.setLoanAmount(parseFloat(self.loan.val()));  
    });

    this.interestSlider.change(function(){
      self.setInterestRate(parseFloat(self.interestSlider.val()));
    });   
     
    this.rate.change(function(){
      self.setInterestRate(parseFloat(self.rate.val()));  
    }) ;  
     
    this.termSlider.change(function(){
      self.setYears(parseFloat(self.termSlider.val()));
    });
     
    this.months.change(function(){
      self.setYears(parseFloat(self.months.val()));
    });
      
  }
  this.initialize();
  
//  for(int n=0, n<this.getMonths(); n++){
    this.drawOneMonth(30);
  //}
  

}