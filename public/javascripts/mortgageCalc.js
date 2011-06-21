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
  
  this.monthlyVisual = $('#monthlyPaymentVisual');
  var monthly = Raphael("monthlyPaymentVisual", 840, 220); 
  
  this.yearlyVisual = $ ('#yearlyPaymentVisual');
  var yearlyVisual = Raphael("yearlyPaymentVisual", 850, 240);  
  
  this.fixedY = $ ('#fixedYealyPaymentVisual');
  var fixedY = Raphael("fixedYealyPaymentVisual", 850, 240); 
 
  this.pie = $('#pie');
  var pie= Raphael("pie");
  
  
  
  var div =5; //height   
  var offsetH=100;
  var spacingV=50;

  
  this.initialize = function(){ 
    this.eventListener();
    this.setVariables();
    this.refreshOnScreenVariables();
     
  }
  
  
  this.getLoanAmount = function(){
    return loanAmount;  
  }
  
  //hello
  
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
      
   if(loanAmount!=100000 || years!=30 || interestRate!=5){
      //redo Table
      this.amortizationTable();
      monthly.clear();
      this.drawMonths();
      yearlyVisual.clear();
      this.drawYears();
      fixedY.clear();
      this.drawFixed();
      pie.clear();
      this.drawPie();
      
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
  

  this.drawMonths = function(){
    var spacingH = 2;
    var width = 1;
    var middlePay  = spacingV+((interest[2]+principle[2])/div)/2;
    
    var bottomOfMonths =  spacingV+((interest[2]+principle[2])/div)+2; //number of 
    monthly.setSize(((this.getMonths()*width*spacingH)+offsetH+25),(bottomOfMonths+80)); 
  
   this.box((this.getMonths()*width*spacingH)+offsetH+15,bottomOfMonths+75, monthly);
   this.yAxisLabel(90,"monthly payment",monthly);
   this.xAxisLabel(bottomOfMonths+50, "time (months)", monthly); 
   
        
    for(var n=1; n<this.getMonths()+1; n++){      
      var interestVisualM=monthly.rect(spacingH*n+offsetH,spacingV,width,(interest[n]/div) );
      var principleVisualM=monthly.rect(spacingH*n+offsetH,(interest[n]/div)+spacingV+2,width,(principle[n]/div) );
      
        principleVisualM.attr("fill", "#0000FF");  //blue
        principleVisualM.attr("stroke", "none");  
        
        interestVisualM.attr("fill", "#FF0080");   //red
        interestVisualM.attr("stroke", "none");    
        
    }
    
    
    this.amountIndicator(offsetH,spacingV,monthly,fixedMonthlyPayment.toFixed(0));
    this.amountIndicator(offsetH,middlePay, monthly,(fixedMonthlyPayment/2).toFixed(0) )
    
    var termDistance = spacingH*width*this.getMonths()+offsetH;  
    this.termIndicator(termDistance, bottomOfMonths, monthly);
      
  }
  
  this.drawYears = function(){
     
     var spacingH = 24;
     var width = 20;
     var bottomOfYear;
     var termDistance = spacingH*years+96;
    
    
     for(var i=0; i<years; i++){
       var interestYearlySum=0;
       var principleYearlySum=0;
      
        for(var x=1; x<12; x++){
          var monthlyIndex = (i*12)+x;
          interestYearlySum+=interest[monthlyIndex];
          principleYearlySum+=principle[monthlyIndex];
        }      
                                      //whereX, whereY, width, height
      var interestVisualY = yearlyVisual. rect(spacingH*i+offsetH+2,spacingV,width,interestYearlySum/(div*10));
      var principleVisualY = yearlyVisual.rect(spacingH*i+offsetH+2,spacingV+(interestYearlySum/(div*10))+2,width,principleYearlySum/(div*10));
      
      interestVisualY.attr("fill", "#EE9014"); //orange
      interestVisualY.attr("stroke", "none");

      principleVisualY.attr("fill", "#00BFFF"); //blue
      principleVisualY.attr("stroke", "none"); 
      
       bottomOfYear = (interestYearlySum+principleYearlySum)/(div*10)+spacingV+2;                
     }     
    
    yearlyVisual.setSize((years*width*spacingH)+offsetH+15,bottomOfYear+70 );     
    
    this.box((years*spacingH)+offsetH+15,bottomOfYear+65,yearlyVisual); 
    this.yAxisLabel(80, "yearly payment",yearlyVisual );
    this.xAxisLabel(bottomOfYear+50,"time (years)", yearlyVisual);    

    this. amountIndicator(offsetH,spacingV,yearlyVisual,(fixedMonthlyPayment*12).toFixed(0));  //for full amount
    this. amountIndicator(offsetH,((bottomOfYear+spacingV+2)/2),yearlyVisual,(fixedMonthlyPayment*6).toFixed(0)); //forhalf  
    this.termIndicator(termDistance, bottomOfYear, yearlyVisual);       
  }
  
  
  this.drawPie = function(){
  
     var body = pie.g.piechart(300,200, 100, 
                [loanAmount/total, totalInterest/total ], 
                {legend: ["Principle", "Interest"], 
                legendpos: "west"});
     
     var p=pie.text(470,150, "$"+parseFloat(loanAmount).toFixed(0));
      p.attr("font-size", 30);
      p.attr("font-family", "Arial Rounded MT Bold");
      p.attr("fill", "#084B8A");
      
     var i=pie.text(415, 300, "$"+totalInterest.toFixed(0));
      i.attr("font-size", 30);
      i.attr("font-family", "Arial Rounded MT Bold");
      i.attr("fill", "#86B404");
                                
              
 
  }
  
  this.drawFixed = function(){
    
    var yearlyAmount=12*fixedMonthlyPayment; 
    var rhsOfBox = 720;
    var height =120;
     
    var width = (rhsOfBox-(years*3))/ (years);
    var spacingH=width+3;
    var h;  
   
    
    
    for(var i=0; i<years; i++){
      var interestYearlySum=0;
      var principleYearlySum=0;
      
      for(var x=1; x<12; x++){
        var monthlyIndex = (i*12)+x;
        interestYearlySum+=interest[monthlyIndex];
        principleYearlySum+=principle[monthlyIndex];
      }      
      var ratioI= interestYearlySum/yearlyAmount;
      var intr = (ratioI*height);
      var prin= height-intr;     
            
                                      //whereX, whereY, width, height
      var interestVisualY = fixedY. rect(spacingH*i+offsetH+2,
                                        spacingV,
                                        width,
                                        intr);
                                        
      var principleVisualY = fixedY.rect(spacingH*i+offsetH+2,
                                        spacingV+intr+2,
                                        width,
                                        prin);
     
      interestVisualY.attr("fill", "#8904B1"); //purple
      interestVisualY.attr("stroke", "none");

      principleVisualY.attr("fill", "#01DFA5"); //blue
      principleVisualY.attr("stroke", "none"); 
     
      h=intr+prin+2;
    } 
    
    height = spacingV+h;  
     
    this.box(rhsOfBox+offsetH+13, 230, fixedY);
    this.termIndicator((years*spacingH)+offsetH-2,height,fixedY);
    this.yAxisLabel(90 ,"yearly payment", fixedY);
    this.xAxisLabel(210, "time (years)", fixedY);  
    this. amountIndicator(offsetH,spacingV,fixedY,(fixedMonthlyPayment*12).toFixed(0));  //for full amount
    this. amountIndicator(offsetH,((height+spacingV+2)/2),fixedY,(fixedMonthlyPayment*6).toFixed(0)); //forhalf  

  }


  this.yAxisLabel = function(topPosition,string, here){
     var yLabel = here.text(10,topPosition,string); 
      yLabel.attr("font-family","Arial Rounded MT Bold");
      yLabel.attr("font-size",20);
      yLabel.rotate(-90);
  
  }

  this.xAxisLabel = function (position, string, here){
      var xLabel = here.text(102, position, string)
      xLabel.attr("font-family","Arial Rounded MT Bold");
      xLabel.attr("font-size",20);
  }
  
  this.termIndicator = function(x, y, canvas){
    var termIndicator = canvas.path("M"+ x+" "+(y+10)+" l0 -10");  
      termIndicator.attr("fill", "#FFF");
      termIndicator.attr("stroke", "#FFF");
      termIndicator.attr("stroke-width", 1);
    var labelTerm = canvas.text(x, y+25, years+"\nyears");
  
  };
  
  this.box=function(x,y, canvas){
    var box = canvas.rect(2,0,x,y) ;
      box.attr("fill", "none");
      box.attr("stroke", "#FFF"); 
  };
  
  this.amountIndicator=function(x,y,canvas,amount){
    var payIndicator = canvas.path("M"+x+" "+y+" l-30 0 m0 0 l0 10");
      payIndicator.attr("fill", "#FFF");
      payIndicator.attr("stroke", "#FFF");
      payIndicator.attr("stroke-width", 1);
     
    var payAmount = canvas.text(x-30,y+18 ,"$"+amount );
  };

  this.initialize();
  this.amortizationTable();
  this.drawMonths();
  this.drawYears();
  this.drawPie();
  this.drawFixed();
 
  

}