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
  this.calculate = $('#calculate');
  
  this.visual = $('#monthsVisual');
  var paper = Raphael("monthsVisual", 10000,10000); //creates a 1000 by 1000 canvas to work on
  var div =5;//height   
  
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
  
  //create an amortization schedule in array form (after initialize() )
  var loanAmt=[loanAmount];
  var interest=[loanAmount*this.getRate()];
  var principle=[fixedMonthlyPayment-interest[0]];
     
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
      

      /*
      
    //edit elements
      for(var n=1; n<this.getMonths()+1; n++){
        principleVisual[n].attr("height", (principle[n]/div) );
        interestVisual[n].attr("height",(interest[n]/div));
      }
*/
    if(loanAmount!=100000 || years!=30 || interestRate!=5){
      //redo Table
      this.amortizationTable();
      paper.clear();
      this.drawMonths();
    }
       
  }
  
  
  
  this.eventListener = function(){
    this.calculate.click(function(){
      self.setVariables();
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

  
  this.amortizationTable = function(){
  
    loanAmt=[loanAmount];
    interest=[loanAmount*this.getRate()];
    principle=[fixedMonthlyPayment-interest[0]];

    for(var n=1; n<this.getMonths()+1; n++){
      loanAmt.push(loanAmt[n-1]-principle[n-1]);
      interest.push(loanAmt[n]*this.getRate());
      principle.push(fixedMonthlyPayment-interest[n]);
    }

    
  }
  
 
  /*clips show table
  */ 
  
  this.drawMonths = function(){/*
    var spacingH =2;
    var spacingV = 50;
    var width = 1;
        
    for(var n=1; n<this.getMonths()+1; n++){      
      var interestVisual=paper.rect(spacingH*n+50,spacingV,width,(interest[n]/div) );
      var principleVisual=paper.rect(spacingH*n+50,(interest[n]/div)+spacingV+2,width,(principle[n]/div) );
      
        principleVisual.attr("fill", "#0000FF");  //blue
        principleVisual.attr("stroke", "none");  
        
        interestVisual.attr("fill", "#FF0080");   //red
        interestVisual.attr("stroke", "none"); 
        
        //console.log(principleVisual[n]);
      
        
        
        
    }
    var yLabel = paper.text(10,130, "monthly payment"); 
      yLabel.attr("font-family","arial");
      yLabel.attr("font-size",20);
      yLabel.rotate(-90);
      
    var xLabel = paper. text(112, spacingV+(interest[2]/div)+2+(principle[2]/div)+30, "time (months)")
      xLabel.attr("font-family","arial");
      xLabel.attr("font-size",20);*/
    
  }
  this.initialize();
  this.amortizationTable();
  this.drawMonths();
 
  

}