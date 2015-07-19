//Time is visualized by doing the following:

//Meeting agenda blocks shown in 5 hour increments. That is 18000 seconds.

//Alpha threshold is established to represent datetime at the beginning of the block (eg: 8PM)

//Datetime can be converted into seconds since epoch.(https://en.wikipedia.org/wiki/Unix_time)

//Subtracting seconds from a provided time (eg: now) from seconds at threshold and then dividing that by 18000 will give percentage of time that is passed since threshold. So any element with a time percentage can be parked to the left according to that percentage and be accurately placed.

//That percentage representation of 'now' can then be used to measure other percentage of time against to change position and properties accordingly.


$(document).ready(function(){
  
//  Initial setting of all time sensitive elements.
  var now = new Date();
  set_clock(now);
  var thresholds = [];
  set_thresholds(thresholds);
  var alphaThreshold = set_alpha_threshold(thresholds, now);
  set_block(alphaThreshold);
  var percentageNow = percentage_time(now, alphaThreshold);
  console.log(percentageNow);
  set_timebar(percentageNow);

//  Set interval to handle time sensitive elements.
//  Update clock and time-bar every 30 seconds.
//  Checks time against dynamic time elements to change colors/visibility accordingly.
  window.setInterval(function(){
    
    now = new Date();
    set_clock(now);
    var percentageNow = percentage_time(now, alphaThreshold);
    set_timebar(percentageNow);
    
  },30000);
});

//Sends current time, minus the space between AM/PM and time, to view. It is a clock.
function set_clock(now){
 $('#clock').html(standard_time(now).replace(' ', ''));
}


//Sets the 4 hour array of incremental thresholds used to measure everything off of for the entire day starting with midnight.
function set_thresholds(thresholds) {
  for(var i=0; thresholds.length < 7; i+=4){
      var now = new Date();
      now.setHours(i,0,0);
      thresholds.push(now);
  }
}

//Sets the current threshold to use as a base for the time shenanigans in current time block.
function set_alpha_threshold(thresholds, now) {
    var gauge = "";
    for (var i = 0; i < thresholds.length; i++) {
        if(now > thresholds[i]) {
            gauge = thresholds[i];
        }
    }
    return gauge;
}

//Sets timeline list to show current block times.
//Makes a new object from alphaThreshold so that when time is updated during enumeration it doesnt update the actual alphaThreshold, cause that was no fun. Learned about javascript passing objects byReference instead of byValue the hard way.
function set_block(alphaThreshold) {
  var blockThreshold = new Date(alphaThreshold);
  $('.timeline__list-item').each(function(index){
    $(this).html(blockThreshold.toLocaleTimeString(navigator.language, {hour: '2-digit'}));
    blockThreshold.setHours(blockThreshold.getHours()+1);
  });
}


//Sets timebar accordingly using the formula stated at top.
function set_timebar(percentageNow) {
  var percentage = percentageNow + "%"
  $('#schedule__time-bar').css({'left' : percentage});
}

//Converts datetime into seconds and divides by block time size (18000) and returns formatted percentage with 2 decimal places.
function percentage_time(now, then) {
  now = now /1000;
  then = then /1000;
  return (((now - then) / 18000) * 100).toFixed(2);
}

//normalizes time from datetime object
eg: 
function standard_time(time){
    return time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}