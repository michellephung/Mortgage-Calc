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
  
  this.visual = $('#monthlyPaymentVisual');
  var monthly = Raphael("monthlyPaymentVisual", 840, 220); 
  
  
  var div =5; //height   
  var bottomOfMonths;
  var bottomOfYear;
  var topOfYear;
  var offsetH=100;
  this.pie = $('#pie');
  var pie= Raphael("pie");
  
  
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
      this.drawYears();
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
  
 
  /*clips show table
  */ 
  
  this.drawMonths = function(){
    var spacingH =2;
    var spacingV = 50;
    var width = 1;
    
    
    //visual references
    bottomOfMonths =  spacingV+((interest[2]+principle[2])/div)+2; //number of pixels down y axis 
    topOfYear= bottomOfMonths+100; 
        
    for(var n=1; n<this.getMonths()+1; n++){      
      var interestVisualM=monthly.rect(spacingH*n+offsetH,spacingV,width,(interest[n]/div) );
      var principleVisualM=monthly.rect(spacingH*n+offsetH,(interest[n]/div)+spacingV+2,width,(principle[n]/div) );
      
        principleVisualM.attr("fill", "#0000FF");  //blue
        principleVisualM.attr("stroke", "none");  
        
        interestVisualM.attr("fill", "#FF0080");   //red
        interestVisualM.attr("stroke", "none");    
        
    }
    
    this.yAxisLabel(130,"monthly payment");
    this.xAxisLabel(bottomOfMonths+30, "time (months)");    
   
    var monthlyBox = monthly.rect(2, 
                                  40, 
                                  (this.getMonths()*width*spacingH)+offsetH+15, 
                                  bottomOfMonths+10) ;
      monthlyBox.attr("fill", "none");
      monthlyBox.attr("stroke", "#FFF");
      
    var monthPaymentIndicator =   monthly.path("M70 60 L70 50 M70 50 L100 50");
      monthPaymentIndicator.attr("fill", "#FFF");
      monthPaymentIndicator.attr("stroke", "#FFF");
      monthPaymentIndicator.attr("stroke-width", 1);
    
    var monthAmount = monthly.text(70,70, "$"+fixedMonthlyPayment.toFixed(0) );
     
    var middlePay  = spacingV+((interest[2]+principle[2])/div)/2;
    
    var midMonthPaymentIndicator =   monthly.path("M70 "+(middlePay+10)+" L70 "+middlePay+"m 0 0 L100 "+middlePay);
      midMonthPaymentIndicator.attr("fill", "#FFF");
      midMonthPaymentIndicator.attr("stroke", "#FFF");
      midMonthPaymentIndicator.attr("stroke-width", 1);
    
    var midMonthAmount = monthly.text(70, middlePay+18,"$"+(fixedMonthlyPayment/2).toFixed(0)); 
    
    
    var termDistance = spacingH*width*this.getMonths();  
    
    var termIndicator = monthly.path("M"+(termDistance+100)+" "+(bottomOfMonths)+"l0 10");  
      termIndicator.attr("fill", "#FFF");
      termIndicator.attr("stroke", "#FFF");
      termIndicator.attr("stroke-width", 1);
     
     var termLabel = monthly.text(termDistance+offsetH, bottomOfMonths+20, years+"\nyears"); 
    
      
      
  }
  
  this.drawYears = function(){
     
     var spacingH = 24;
     var spacingV = 50;
     var width = 20;
     var belowMonths=100;

     
     for(var i=0; i<years; i++){
       var interestYearlySum=0;
       var principleYearlySum=0;
      
        for(var x=1; x<12; x++){
          var monthlyIndex = (i*12)+x;
          interestYearlySum+=interest[monthlyIndex];
          principleYearlySum+=principle[monthlyIndex];
        }
      
      
                                      //whereX, whereY, width, height
      var interestVisualY = monthly. rect(spacingH*i+offsetH+2,bottomOfMonths+belowMonths,width,interestYearlySum/(div*10));
      var principleVisualY = monthly.rect(spacingH*i+offsetH+2,bottomOfMonths+belowMonths+(interestYearlySum/(div*10))+2,width,principleYearlySum/(div*10));
      
      interestVisualY.attr("fill", "#EE9014"); //orange
      interestVisualY.attr("stroke", "none");

      principleVisualY.attr("fill", "#00BFFF"); //blue
      principleVisualY.attr("stroke", "none"); 
      
      bottomOfYear = (interestYearlySum+principleYearlySum)/(div*10)+belowMonths;      
      
     }          
     
     //labels for year axis
    this.yAxisLabel(bottomOfMonths+170, "yearly payment");
    this.xAxisLabel(bottomOfYear+bottomOfMonths+30,"time (years)");    

    var yearBox = monthly.rect(2, bottomOfMonths+70, (years*spacingH)+offsetH+20, (bottomOfYear)) ;
          yearBox.attr("fill", "none");
          yearBox.attr("stroke", "#FFF");
    
    var yearPayIndicator = monthly.path("M70 "+(topOfYear+10)+" l0 -10 m0 0 l30 0");
      yearPayIndicator.attr("fill", "#FFF");
      yearPayIndicator.attr("stroke", "#FFF");
      yearPayIndicator.attr("stroke-width", 1);
     
    var yearPayAmount = monthly.text(70,topOfYear+18 ,"$"+(fixedMonthlyPayment*12).toFixed(0) );
    
    var midYearPayIndicator = monthly.path("M70 "+((bottomOfMonths+bottomOfYear+topOfYear+2)/2)+10+" l0 10 m0 -10 l30 0 ");
      midYearPayIndicator.attr("fill", "#FFF");
      midYearPayIndicator.attr("stroke", "#FFF");
      midYearPayIndicator.attr("stroke-width", 1);  
      
    var midYearPayAmount = monthly.text(70,(bottomOfMonths+bottomOfYear+topOfYear+2)/2+18,"$"+(fixedMonthlyPayment*6).toFixed(0));  
      
  
    var termDistance = spacingH*years+96;
      
    var termIndicator = monthly.path("M"+ (termDistance)+" "+(bottomOfYear+bottomOfMonths+12) +" l0 -10");  
      termIndicator.attr("fill", "#FFF");
      termIndicator.attr("stroke", "#FFF");
      termIndicator.attr("stroke-width", 1);
     
    var termLabel = monthly.text(termDistance, bottomOfYear+bottomOfMonths+25, years+"\nyears"); 

    
  }
  
  
  this.drawPie = function(){
  
     var body = pie.g.piechart(300,200, 100, [loanAmount/total, totalInterest/total ], {legend: ["Principle", "Interest"], legendpos: "west"});
     
     var p=pie.text(470,150, "$"+total.toFixed(0));
      p.attr("font-size", 30);
      p.attr("font-family", "Arial Rounded MT Bold");
      p.attr("fill", "#084B8A");
      
    var i=pie.text(415, 300, "$"+totalInterest.toFixed(0));
      i.attr("font-size", 30);
      i.attr("font-family", "Arial Rounded MT Bold");
      i.attr("fill", "#86B404");
                                
              
 
  }
  
  this.drawFixed = function(){
    //make fixed area graph
    
    
    var rhsOfBox = 720;
    var height =120;
    var spacingV = 50;
     
    var width = (rhsOfBox-(years*3))/ (years);
    var spacingH=width+3;
      
   
    var yearlyAmount=12*fixedMonthlyPayment;
    
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
      var interestVisualY = monthly. rect(spacingH*i+offsetH+2,
                                        bottomOfMonths+bottomOfYear+100,
                                        width,
                                        intr);
                                        
      var principleVisualY = monthly.rect(spacingH*i+offsetH+2,
                                        bottomOfMonths+bottomOfYear+100+intr+2,
                                        width,
                                        prin);
     
      interestVisualY.attr("fill", "#8904B1"); //purple
      interestVisualY.attr("stroke", "none");

      principleVisualY.attr("fill", "#01DFA5"); //blue
      principleVisualY.attr("stroke", "none"); 
    }   
     
    var box = monthly. rect(4,bottomOfMonths+bottomOfYear+80,rhsOfBox+offsetH+10,200) ;   
      box.attr("stroke", "#FFF");  
      
    this.yAxisLabel(bottomOfMonths+bottomOfYear+170 ,"yearly payment");
    this.xAxisLabel(bottomOfMonths+bottomOfYear+250, "time (years)");  
  }


  this.yAxisLabel = function(topPosition,string){
     var yLabel = monthly.text(10,topPosition,string); 
      yLabel.attr("font-family","Arial Rounded MT Bold");
      yLabel.attr("font-size",20);
      yLabel.rotate(-90);
  
  }

  this.xAxisLabel = function (position, string){
      var xLabel = monthly. text(102, position, string)
      xLabel.attr("font-family","Arial Rounded MT Bold");
      xLabel.attr("font-size",20);
  }
  

  this.initialize();
  this.amortizationTable();
  this.drawMonths();
  this.drawYears();
  this.drawPie();
  this.drawFixed();
 
  

}