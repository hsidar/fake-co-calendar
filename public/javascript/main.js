$(document).ready(function(){
  
//  initial setting of all time sensitive elements.
  var now = new Date();
  set_clock(now);
  
  $('.details').addClass('details--visible');
  
//  set interval to handle time sensitive elements.
//  Update clock and time-bar every 30 seconds.
//  checks time against dynamic time elements to change colors/visibility accordingly.
  window.setInterval(function(){
    
    now = new Date();
    set_clock(now);
    
  },30000);
});

//Sends current time to view. It is a clock.
function set_clock(now){
  $('#clock').html(standard_time(now));
}











//normalizes time from datetime object
eg: 
function standard_time(time){
    return time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}