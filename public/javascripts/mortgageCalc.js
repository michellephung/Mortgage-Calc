//Mortgage Calculator Javascript 
var MortgageCalculator= function(){


  var loanAmount = 700000;
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
  
  var heightBarBox=1270;
  var defaultWidthBarBox=1320;
  var bottomOfChart =  1220; 
  
  this.monthlyVisual = $('#monthlyPaymentVisual');
  var monthly = Raphael("monthlyPaymentVisual", defaultWidthBarBox, heightBarBox); 
  
  this.yearlyVisual = $ ('#yearlyPaymentVisual');
  var yearlyVisual = Raphael("yearlyPaymentVisual", defaultWidthBarBox, heightBarBox);  
  
  this.fixedY = $ ('#fixedYearlyPaymentVisual');
  var fixedY = Raphael("fixedYearlyPaymentVisual",1100, 600); 
 
  this.pie = $('#pie');
  var pie= Raphael("pie");
  
  this.piePrinciple = $('#piePrinciple');
  this.pieInterest =$('#pieInterest');
  this.pieAmountP = $('#pieAmountP');
  this.pieAmountI = $('#pieAmountI');
  var div =25; //height   
  var offsetH=100;    //horizontal offset from left hand side (x position where graph starts)
  var spacingV=50;    //vertical offset from top of box of graph and graph not used in horizontal scroll
  
 this.numOfMonths = $('#numOfMonths');
 this.numOfYears =$('.numOfYears');
  
 this.yearSection =$('#yearSection');
 this.fixedSection=$('#fixedSection'); 
 var monthLength;
 
 this.extra =$('#extraPay');
  this.extraInfo = $('#extraInfo');
  
 var principleColor="#2E64FE";
 var interestColor="#A901DB"; 
  
  this.addCommas =function(nStr){
  	nStr += '';
  	x = nStr.split('.');
  	x1 = x[0];
  	x2 = x.length > 1 ? '.' + x[1] : '';
  	var rgx = /(\d+)(\d{3})/;
  	while (rgx.test(x1)) {
  		x1 = x1.replace(rgx, '$1' + ',' + '$2');
  	}
  	return x1 + x2;
  }

  this.initialize = function(){ 
    this.eventListener();   //detects changes in any of the onscreen controls (textboxes/ sliders)
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

  this.getInterestRate = function() {
    return interestRate;
  }
  
  this.setLoanAmount = function(loan) {
    if(loan>2000000)  loanAmount=2000000;
    else if(loan<1000) loanAmount=1000; 
    else loanAmount=loan;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();
    

  }
  
  this.setInterestRate = function(rate){
    if(rate>14) interestRate=14;
    else if(rate<1) interestRate=1;
    else interestRate=rate;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();

  }
  
  this.setYears = function(numberOfYears){
    if(numberOfYears>50) years=50;
    else if(numberOfYears<16)years=15;
    else years=numberOfYears;
    this.setFixedMonthlyPayment();
    this.refreshOnScreenVariables();

  }
  
  this.setFixedMonthlyPayment = function(){
    var loan=this.getLoanAmount();
    var rate=this.getRate();
    var months=this.getMonths();
      
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
     
   var extraPayP = [];
  var extraPayI = [];
  var extraPayPayment=fixedMonthlyPayment+this.extra.val();
  var extraPayNewP =[];
  var extraPayTotalInterest;
  var extraPayLastMonth;
  var extraTotal=0;
     
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
      
      $('#pay').html('$'+this.addCommas(fixedMonthlyPayment.toFixed(2))); 
      $('#totalPaid').html('$'+this.addCommas(total.toFixed(2)));
      $('#interestPaid').html('$'+totalInterest.toFixed(2)); 
      
      this.numOfMonths.html(this.getMonths());
      this.numOfYears.html(years);
      
      //redo Table
      this.amortizationTable();
      this.setExtra(parseFloat(this.extra.val()));
      monthly.clear();
      this.drawMonths();
      yearlyVisual.clear();
      this.drawYears();
      fixedY.clear();
      this.drawFixed();
      pie.clear();
      this.drawPie(total);
      
    
       
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
    
    this.extra.change(function(){
      self.setExtra(parseFloat(self.extra.val()));
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
  
  this.extraPayTable = function(){
  
    extraPayP = [];
    extraPayI = [];
    extraPayNewP =[];
   
    extraPayP = [loanAmount];
    extraPayI = [extraPayP[0]*this.getRate()];
    extraPayNewP= [parseFloat(extraPayP[0])+parseFloat(extraPayI[0])-extraPayPayment];
    
    extraPayTotalInterest=extraPayI[0];
    
    for(var n=1; n<this.getMonths()+1; n++){
      extraPayP.push(extraPayNewP[n-1]);
      extraPayI.push(extraPayP[n]*this.getRate());
      extraPayNewP.push(extraPayP[n]+extraPayI[n]-extraPayPayment);
      
     
      if(n!=this.getMonths())        extraPayTotalInterest=extraPayTotalInterest+extraPayI[n];
      if(extraPayNewP[n]<0) break;
    }
    extraTotal=extraPayTotalInterest+parseFloat(loanAmount);
    extraPayLastMonth = (extraPayP.length)-1;    
  
  }
  
  this.setExtra = function(xtra){
      if(xtra<0) {
        xtra=0; 
        this.extraInfo.html("")
        this.extra.val(0);
        ;} 
     
      if(parseFloat(xtra)>loanAmount){
        this.extra.val(loanAmount); 
      }  
      
      extraPayPayment=fixedMonthlyPayment+xtra;
      
      this.extraPayTable();
      
      if(xtra!=0){  //with extra payment
        this.extraInfo.html("paying $"+this.addCommas(parseFloat(extraPayPayment).toFixed(0))+" a month...<br>you would<span style=\"color:yellow;\"> save $"+this.addCommas((totalInterest-extraPayTotalInterest).toFixed(0))+"</span> in interest <br>you would be done in <span style=\"color:yellow;\">"+(extraPayLastMonth/12).toFixed(1)+" years</span>");
     
        
        }
       if(xtra==0){//no extra payment
        this.extraInfo.html("");
       
       } 
        
     pie.clear();
     this.drawPie(total);
      
  }
  
  this.getLoanForMonth = function(month){
    return loanAmt[month];
  }
  
  this.getInterestForMonth = function(month){
    return interest[month];
  }

  this.getPrincipleForMonth = function(month){
    return principle[month];
  }
  
  this.drawMonths = function(){
    var spacingH = 2;
    var width = 1;
    
    

    var length =((interest[2]+principle[2])/div)+2;
    var start = bottomOfChart-length;
    
    var middlePay  = start+((interest[2]+principle[2])/div)/2;
     
    this.box((this.getMonths()*width*spacingH)+offsetH+15,heightBarBox, monthly);
    
    this.yAxisLabel(1100,"monthly payment",monthly);
    this.xAxisLabel(1250, "time (months)", monthly); 
   
        
    for(var n=1; n<this.getMonths()+1; n++){      
      var interestVisualM=monthly.rect(spacingH*n+offsetH,start,width,(interest[n]/div) );
      var principleVisualM=monthly.rect(spacingH*n+offsetH,(interest[n]/div)+start+2,width,(principle[n]/div) );
      
        principleVisualM.attr("fill", principleColor);  
        principleVisualM.attr("stroke", "none");  
        
        interestVisualM.attr("fill", interestColor);   
        interestVisualM.attr("stroke", "none");    
        
    }
    
    
    this.amountIndicator(offsetH,start,monthly,fixedMonthlyPayment.toFixed(0));
    this.amountIndicator(offsetH,middlePay, monthly,(fixedMonthlyPayment/2).toFixed(0) )
    
    var termDistance = spacingH*width*this.getMonths()+offsetH;  
    this.termIndicator(termDistance, bottomOfChart, monthly);
    monthLength=termDistance+10;

      
  }
  
  this.drawYears = function(){
     
     var spacingH = 24;
     var width = 20;
     var bottomOfYear;
     var termDistance = spacingH*years+96;
     var start;

     for(var i=0; i<years; i++){
       var interestYearlySum=0;
       var principleYearlySum=0;
      
        for(var x=1; x<12; x++){
          var monthlyIndex = (i*12)+x;
          interestYearlySum+=interest[monthlyIndex];
          principleYearlySum+=principle[monthlyIndex];
        }      
      
      var length=((interestYearlySum+principleYearlySum)/(div*12))+2;
      start=bottomOfChart-length;
      
                                      //whereX, whereY, width, height
      var interestVisualY = yearlyVisual. rect(spacingH*i+offsetH+2,start,width,interestYearlySum/(div*12));
      var principleVisualY = yearlyVisual.rect(spacingH*i+offsetH+2,start+(interestYearlySum/(div*12))+2,width,principleYearlySum/(div*12));
      
      interestVisualY.attr("fill", interestColor); //orange
      interestVisualY.attr("stroke", "none");

      principleVisualY.attr("fill", principleColor); //blue
      principleVisualY.attr("stroke", "none"); 
      
                      
     }     
    
    this.resizeCanvas((years*width*spacingH)+offsetH+15,heightBarBox, yearlyVisual);     
    
    this.box((years*spacingH)+offsetH+15,heightBarBox,yearlyVisual); 
    this.yAxisLabel(1100, "yearly payment",yearlyVisual );
    this.xAxisLabel(1250,"time (years)", yearlyVisual);    

    this. amountIndicator(offsetH,start,yearlyVisual,(fixedMonthlyPayment*12).toFixed(0));  //for full amount
    this. amountIndicator(offsetH,(start+bottomOfChart)/2,yearlyVisual,(fixedMonthlyPayment*6).toFixed(0)); //forhalf  
    this.termIndicator(termDistance, bottomOfChart, yearlyVisual);     
    
    
  
  }
  
    
  this.drawPie = function(size){
  
    var screenSizedL= size/(div*1800);
    var screenSizedR= extraTotal/(div*1800);
    var leftX = 250;
    var leftY=320;
    var rightX= 600;
    var rightY = 320;
    
     var body = pie.g.piechart(leftX,leftY, screenSizedL,[loanAmount/total, totalInterest/total ],{colors:[principleColor, interestColor]});
     var p;
     var i;
     
     
     this.pieAmountP.html(this.addCommas(parseFloat(loanAmount).toFixed(0)));
     this.pieAmountI.html(this.addCommas(parseFloat(totalInterest).toFixed(0)));
     
     this.piePrinciple.css("color",principleColor);
     this.pieInterest.css("color",interestColor);
   
      
     var extraPie = pie.g.piechart(rightX,rightY, screenSizedR, [loanAmount/extraTotal, extraPayTotalInterest/extraTotal]);
            
     var totalLabelL=pie.text(leftX, leftY+screenSizedL+50, "Total: $"+this.addCommas(total.toFixed(0)));      
       totalLabelL.attr("font-family","Arial Rounded MT Bold");
       totalLabelL.attr("font-size",20);
     var totalLabelR=pie.text(rightX, rightY+screenSizedR+50, "Total: $"+this.addCommas(extraTotal.toFixed(0)));      
       totalLabelR.attr("font-family","Arial Rounded MT Bold");
       totalLabelR.attr("font-size",20);   
       
              
     if(screenSizedL>75){
      var pLabelL = pie.text(leftX, leftY-(screenSizedL*0.6), "Principle:\n$"+this.addCommas(loanAmount));  
       pLabelL.attr("font-family","Arial Rounded MT Bold");
       pLabelL.attr("font-size",16);   
       
      var iLabelL = pie.text(leftX, leftY+(screenSizedL*0.6), "Interest:\n$"+this.addCommas(totalInterest.toFixed(0)));     
       iLabelL.attr("font-family","Arial Rounded MT Bold");
       iLabelL.attr("font-size",16); 
     }
     else{
      var indicatePL = pie.path("M"+leftX+" "+(leftY-screenSizedL)+" l0 -10  l-30 0" ); //PL means principle Left
      var indicateIL = pie.path("M"+leftX+" "+(leftY+screenSizedL)+" l0 10  l-30 0" );  
      if(screenSizedL>20 ){
        var labelPL = pie.text(leftX-70,leftY-screenSizedL-10,"Principle:\n$"+this.addCommas(loanAmount));
          labelPL.attr("font-family","Arial Rounded MT Bold");
          labelPL.attr("font-size",16); 
        var labelIL = pie.text(leftX-75, leftY+screenSizedL, "Interest:\n$"+this.addCommas(totalInterest.toFixed(0)));
          labelIL.attr("font-family","Arial Rounded MT Bold");
          labelIL.attr("font-size",16);
      }
      else{
        var labelPL = pie.text(leftX-90,leftY-screenSizedL-10,"Principle:$ "+this.addCommas(loanAmount));
          labelPL.attr("font-family","Arial Rounded MT Bold");
          labelPL.attr("font-size",14); 
        var labelIL = pie.text(leftX-95, leftY+screenSizedL+10, "Interest:$ "+this.addCommas(totalInterest.toFixed(0)));  
          labelIL.attr("font-family","Arial Rounded MT Bold");
          labelIL.attr("font-size",14);
      }
       
        
        
     }
     
    if(screenSizedR>75){ 
       var pLabelR = pie.text(rightX, rightY-(screenSizedR*0.6), "Principle:\n$"+this.addCommas(loanAmount));  
       pLabelR.attr("font-family","Arial Rounded MT Bold");
       pLabelR.attr("font-size",16);   
       
      var iLabelR = pie.text(rightX, rightY+(screenSizedR*0.6), "Interest:\n$"+this.addCommas(totalInterest. toFixed(0)));     
       iLabelR.attr("font-family","Arial Rounded MT Bold");
       iLabelR.attr("font-size",16); 
     }else{
        var indicatePR = pie.path("M"+rightX+" "+(rightY-screenSizedR)+" l0 -10  l30 0"); 
        var indicateIR = pie.path("M"+rightX+" "+(rightY+screenSizedR)+" l0 10  l30 0" );

     
      if(screenSizedR>20){
         var labelPR = pie.text(rightX+70,rightY-screenSizedR-10,"Principle:\n$"+this.addCommas(loanAmount));
        labelPR.attr("font-family","Arial Rounded MT Bold");
        labelPR.attr("font-size",16);
     
      var labelIR = pie.text(rightX+75,rightY+screenSizedR+10,"Interest:\n$"+this.addCommas(extraPayTotalInterest.toFixed(0)));
        labelIR.attr("font-family","Arial Rounded MT Bold");
        labelIR.attr("font-size",16);
      } else{
          var labelPR = pie.text(rightX+90,rightY-screenSizedR-10,"Principle: $"+this.addCommas(loanAmount));
            labelPR.attr("font-family","Arial Rounded MT Bold");
            labelPR.attr("font-size",14);
     
          var labelIR = pie.text(rightX+95,rightY+screenSizedR+10,"Interest: $"+this.addCommas(extraPayTotalInterest.toFixed(0)));
            labelIR.attr("font-family","Arial Rounded MT Bold");
            labelIR.attr("font-size",14);
      }
     
    }
     
     
      
      
      
  }
  
  this.drawFixed = function(){
    
    var yearlyAmount=12*fixedMonthlyPayment; 
    var rhsOfBox = 840;
    var height =150;
     
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
     
      interestVisualY.attr("fill", interestColor); 
      interestVisualY.attr("stroke", "none");

      principleVisualY.attr("fill", principleColor); 
      principleVisualY.attr("stroke", "none"); 
     
      h=intr+prin+2;
    } 
    
    height = spacingV+h;  
     
    this.box(rhsOfBox+offsetH+13,390, fixedY);
    this.termIndicator((years*spacingH)+offsetH-2,height,fixedY);
    this.yAxisLabel(80 ,"yearly payment", fixedY);
    this.xAxisLabel(210, "time (years)", fixedY);  
    this. amountIndicator(offsetH,spacingV,fixedY,(fixedMonthlyPayment*12).toFixed(0));  //for full amount
    this. amountIndicator(offsetH,((height+spacingV+2)/2),fixedY,(fixedMonthlyPayment*6).toFixed(0)); //forhalf  
    }


  this.yAxisLabel = function(botPosition,string, here){
     var yLabel = here.text(10,botPosition,string); 
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
     
    var payAmount = canvas.text(x-30,y+18 ,"$"+this.addCommas(amount));
  };
  
  this.resizeCanvas = function(x, y, canvas){
      canvas.setSize(x,y); 
  };
  
  
  
  
  
  

  this.initialize();
  this.amortizationTable();
  this.drawMonths();
  this.drawYears();
  this.drawPie(total);
  this.drawFixed();
 
  

}