describe("MorgageCalculator", function(){

  var calc;
  beforeEach(function(){
    var loanInputDOM = $('<input id="loanBox" type="number" value="100000"/>');
    var loanSliderDOM = $('<input id="loanSlider" type="range" value="100000" min="1" max="2000000"/>');
    
    var rateInputDOM = $('<input id="interestBox" type="number" value="5"/>');
    var rateSliderDOM = $('<input id="interestSlider" type="range" value="5" min="1" max="100"/>');  
    
    var termInputDOM = $('<input id="termBox" type="number" value="30"/>');
    var termSliderDOM = $('<input id="termSlider" type="range" value="30" min="1" max="50"/>');
    
   
   $('#jasmine_content').append(loanInputDOM,loanSliderDOM, rateInputDOM, rateSliderDOM, termInputDOM, termSliderDOM);
   calc= new MortgageCalculator();
     });
     
  afterEach(function(){
    $('#jasmine_content').html('');
  });
  
  
 describe('something', function(){
    it('is a test', function(){
      alert(",ocje;;each");
    })
  });
     
     
});