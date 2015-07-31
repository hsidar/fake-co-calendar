//Time is visualized by doing the following:

//Meeting agenda blocks shown in 5 hour increments. That is 18000 seconds.

//Alpha threshold is established to represent datetime at the beginning of the block (eg: 8PM)

//Datetime can be converted into seconds since epoch.(https://en.wikipedia.org/wiki/Unix_time)

//Subtracting seconds from a provided time (eg: now) from seconds at threshold and then dividing that by 18000 will give percentage of time that is passed since threshold. So any element with a time percentage can be styled to the left according to that percentage and be accurately placed in time.

//That percentage representation of 'now' can then be used to measure other percentage of time against to change position and properties accordingly.

$(document).ready(function(){
  
  var pageIsFreshlyLoaded = true;
  var beginNewDetailsRotation = true;
  var detailsRotationIntervalIndex = 0;
  var now = new Date();
  var thresholds = [];
  var alphaThreshold;
  var percentageNow;
  var hoursInaTimeBlock = $('.timeline__list-item').length; // view only puts as many of these as there are hours, as specified in the controller.
  var percentageOfQuarterHour;
  
//  Initial setting of all time sensitive elements.
  set_timeline_divider_width();
  set_thresholds_for_all_time_blocks();
  update_things_that_update_with_every_timeblock();
  update_things_that_update_every_minute();

//  Set interval to handle time sensitive elements.
//  Checks time against dynamic time elements to change colors/visibility accordingly.
  window.setInterval(function(){ 
    
//  Keep time up to date.
    now = new Date();    

    if (timeblock_changeover_needs_to_happen()) {
      update_things_that_update_with_every_timeblock();
    }
    
    update_things_that_update_every_minute();
    
  },30000); //< timer!

  //Sends current time, minus the space between AM/PM and time, to view. It is a clock.
  function set_clock(){
   $('.clock').html(standard_time(now).replace(' ', ''));
  }
  
  
  function set_timeline_divider_width() {
    
    var percentageDividerWidth = (100 / (hoursInaTimeBlock * 2)) + '%';
    $('.schedule__divider-bar, .schedule__buffer-bar').css("width", percentageDividerWidth);
    var percentageTimelineListItemWidth = (100 / hoursInaTimeBlock) + '%';
    $('.timeline__list-item').css("width", percentageTimelineListItemWidth);
  }

  //Create temporary time object set for midnight and loop through, adding 4 hours to it each loop and pushing to thresholds array.
  function set_thresholds_for_all_time_blocks() {
    for(var i=0; thresholds.length < 7; i+=4){
      var timeObjectPlaceholder = new Date();
      timeObjectPlaceholder.setHours(i,0,0);
      thresholds.push(timeObjectPlaceholder);
    }
  }

  //Sets the current threshold to use as a base for the time shenanigans in current time block.
  function set_alpha_threshold_for_current_block() {
    var lastThresholdLessThanCurrentTime = "";
    for (var i = 0; i < thresholds.length; i++) {
      if(now > thresholds[i]) {
          lastThresholdLessThanCurrentTime = thresholds[i];
      }
    }
    alphaThreshold = lastThresholdLessThanCurrentTime;
  }

  //Loops over timeline ul and sets times.
  //Makes a new object from alphaThreshold so that when time is updated during enumeration it doesnt update the actual alphaThreshold, cause that was no fun. Learned about javascript passing objects byReference instead of byValue the hard way.
  function set_current_time_block() {
    var blockThreshold = new Date(alphaThreshold);
    $('.timeline__list-item').each(function(index){
      $(this).html(blockThreshold.toLocaleTimeString(navigator.language, {hour: '2-digit'}));
      blockThreshold.setHours(blockThreshold.getHours()+1);
    });
  }

  //Sets timebar accordingly using the formula stated at top.
  function set_timebar() {
    var percentage = percentageNow + "%"
    $('#schedule__time-bar').css({'left' : percentage});
  }

  //If 'now' equals any of the thresholds, and is not the current threshold, then prompt for changeover.
  function timeblock_changeover_needs_to_happen() {
    var standard_now = standard_time(now);
    for(var x in thresholds){
      if (standard_now == standard_time(thresholds[x])){
        if(standard_now == standard_time(alphaThreshold)){
            return false;
        }
        return true;
      }
    }
    return false;
  }

//drop percent going off of standard height of meeting div being height: 13% + 1% margin top/bottom. First drop takes 10% height timeline div into consideration. Hence 25 with a 15 increment.
  function set_meeting_width_and_placement_in_the_view() {
    
    var lastKnownEndtime;
    var dropPercentForOverlappingMeetings = 25; 
    
    $('.schedule__meeting').each(function(index) {
      var epochStartTime = Date.parse($(this).data('start-time'));
      var epochEndTime = Date.parse($(this).data('end-time'));
      var percentStart = percentage_of_time_passed_since_last_threshold(epochStartTime, alphaThreshold);
      var width = get_width_of_meeting(epochStartTime, epochEndTime)

      $(this).css({'width' : width + '%', 'left' : percentStart + '%'});
  //  Check for overlap. If last known end time of last meeting is greater than start time of current, they overlap and current meeting needs to be dropped down.
      if (typeof lastKnownEndtime === "undefined") {
        lastKnownEndtime = epochEndTime;
      } else if(epochStartTime < lastKnownEndtime) {
        $(this).css({'top' : dropPercentForOverlappingMeetings + '%'});
        dropPercentForOverlappingMeetings += 15; 
      } else {
        dropPercentForOverlappingMeetings = 25;
      }
      lastKnownEndtime = epochEndTime;
    });
  }
  
  
//Width: Meeting timeline is 100% wide. If time block is 5 hours, 15 min is 900,000 milliseconds and 15 min = 5% of the meeting timeline.  Multiply that by calculated increment %. Eg: 15 min is 900,000 milliseconds and 15 min = 5% of the view width. Keep halving each until milliseconds is below 60000 to get width % down to the minute.

//Parse data-tag times into milliseconds. (Not dividing into seconds because function it passes to does that.) Get meeting time % and stage left, width, and overlap accordingly.
  function get_width_of_meeting(epochStartTime, epochEndTime) { 
    var meetingTimelineInMilliseconds = hoursInaTimeBlock * 3600000;
    var millisecondsPerQuarterHour = ((hoursInaTimeBlock * 60) / (hoursInaTimeBlock * 4)) * 60000;
    percentageOfQuarterHour = (millisecondsPerQuarterHour / meetingTimelineInMilliseconds) * 100;
    var millisecondsPerSliver = millisecondsPerQuarterHour;
    var percentagePerSliver = percentageOfQuarterHour;
    
// Halve until below 1 second
    while (millisecondsPerSliver > 60000) {
    millisecondsPerSliver /= 2;
    percentagePerSliver /= 2;
    }
    
    return ((epochEndTime - epochStartTime) /millisecondsPerSliver) * percentagePerSliver;
  }

  //Set colors for meetings. Made this separate from set meeting because this will fire every interval and we only need to set meetings per time block. No point in doing all that ^ every minute.
  function set_meeting_colors() {

    $('.schedule__meeting').each(function(index) {
      
      var epochStartTime = Date.parse($(this).data('start-time'));
      var epochEndTime = Date.parse($(this).data('end-time'));
      var percentStart = percentage_of_time_passed_since_last_threshold(epochStartTime, alphaThreshold);
      var percentEnd = percentage_of_time_passed_since_last_threshold(epochEndTime, alphaThreshold);
      var meetingBackgroundColor = determine_background_color_for_event(percentStart, percentEnd);
      
  //  Remove current color classes and assign new one.
      $(this).removeClass(function(index, css){
        return (css.match (/schedule__meeting--[\w-]+/g)).join(' ');
      });
      $(this).addClass('schedule__meeting--' + meetingBackgroundColor);

    });
  }

  // Assign meeting details color accordingly.
  function set_details_color(percentageNow, alphaThreshold) {

    $('.details').each(function(index){
      var startTime = Date.parse($(this).data('start-time'));
      var endTime = Date.parse($(this).data('end-time'));
      var percentStart = percentage_of_time_passed_since_last_threshold(startTime, alphaThreshold);
      var percentEnd = percentage_of_time_passed_since_last_threshold(endTime, alphaThreshold);

      var color = determine_background_color_for_event(percentStart, percentEnd);

      $(this).find('.details__status').removeClass(function(index, css){
        return (css.match (/details__status--[\w-]+/g)).join(' ');
      });
      $(this).find('.details__status').addClass('details__status--' + color);

    });
  }

  //Returns event status based on an over/under for the start and end % in relation to the time % now.
  function determine_background_color_for_event(startPercentage, endPercentage) {

    if (startPercentage < percentageNow && endPercentage > percentageNow) {
      return 'ongoing-event-color';
    } else if (startPercentage > percentageNow && (startPercentage- percentageNow) <= percentageOfQuarterHour) {
      return 'upcoming-event-color'; // event is less than 15 minutes out.
    } else if (startPercentage > percentageNow) {
      return 'next-event-color';
    } else if (endPercentage < percentageNow) {
      return 'past-event-color';
    } else {
      return 'danger-event-color';
    }
  }

  //Counts number of specific details status and changes the details header accordingly.
  function update_header_details() {
    
    sanitize_header_details();

    if ($('.details__status--ongoing-event-color').length == 1) {
      
      update_header_details_for_single_event("ongoing-event-color", "Happening Now")
      
    } else if ($('.details__status--ongoing-event-color').length > 1) {
      
      update_header_details_for_multiple_events("ongoing-event-color", "Happening Now");
      
    } else if ($('.details__status--upcoming-event-color').length == 1) {
      
      update_header_details_for_single_event("upcoming-event-color", "Starting Soon")
      
    } else if ($('.details__status--upcoming-event-color').length > 1) {
      
      update_header_details_for_multiple_events("upcoming-event-color", "Starting Soon");
      
    } else if ($('.details__status--next-event-color').length > 0 && next_meeting_starts_today()) {
      
      stop_details_rotation_if_active();
      $('#header').addClass('header--next-event-color');
      $('.details__status--next-event-color:first').closest('.details').removeClass('details--invisible');
      $('.details__status--next-event-color').html("Next Meeting");
      
    } else {
      stop_details_rotation_if_active();
      $('#no_more_meetings').css({'opacity' : '1', 'z-index' : '2'});
    }
  }
  
  function next_meeting_starts_today() {
    var tomorrow = new Date().getDate() + 1;
    var nextMeetingStartDate = new Date(
      $('.details__status--next-event-color:first').closest('.details').data('start-time')
    ).getDate();
    
    if (nextMeetingStartDate == tomorrow){
      return false;
    }
    
    return true;
  }
  
  function update_header_details_for_single_event(status, message) {
    stop_details_rotation_if_active();
    $('#header').addClass('header--' + status);
    $('.details__status--'  + status).closest('.details').removeClass('details--invisible');
    $('.details__status--' + status).html(message);
  }
  
  function update_header_details_for_multiple_events(status, message) {
    $('#header').addClass('header--' + status);
    $('.details__status--' + status).html(message);
    if(beginNewDetailsRotation){
      rotate_details_for_concurrent_meetings(status);
    }
  }
  
// Make details are invisible and header is colorless.
    function sanitize_header_details(){
    $('.details:not([class*="details--invisible"])').addClass('details--invisible');
    $('#header').removeClass(function(index, css){
        return (css.match (/header--[\w-]+/g)).join(' ');
    });
    $('.no_more_meetings').css({'opacity' : '0', 'z-index' : '-2'});
      
    }

  function stop_details_rotation_if_active(){
    beginNewDetailsRotation = true;
    clearInterval(detailsRotationIntervalIndex);
    $('.details').css('display', '');
  }

  function rotate_details_for_concurrent_meetings(meetingStatus) {
      beginNewDetailsRotation = false;
      var selector = '.details__status--' + meetingStatus + ':last';
      $(selector).closest('.details').fadeIn(500).delay(7000).fadeOut(500);
      selector = '.details__status--' + meetingStatus + ':first';
      detailsRotationIntervalIndex = setInterval(function(){
        $(selector).closest('.details').fadeIn(500).delay(7000).fadeOut(500,function (){
          $(this).appendTo($(this).parent());
        });
      }, 8400);
  }
  
  function update_things_that_update_with_every_timeblock() {
    set_alpha_threshold_for_current_block();
    set_current_time_block();
    set_meeting_width_and_placement_in_the_view();
  }
  
  function update_things_that_update_every_minute() {
    percentageNow = percentage_of_time_passed_since_last_threshold(now, alphaThreshold);
    set_timebar();
    set_meeting_colors();
    set_details_color(percentageNow, alphaThreshold);
    update_header_details();
    set_clock();
  }
  
//Converts datetime into seconds, divides by block time size in seconds and returns formatted percentage with 2 decimal places. The + sign in the return value changes result to a number because .toFixed returns a string and not a float.
  function percentage_of_time_passed_since_last_threshold(now, then) {
    var secondsInTimeBlock = hoursInaTimeBlock * 60 * 60; 
    now = now /1000;
    then = then /1000;
    return +(((now - then) / secondsInTimeBlock) * 100).toFixed(2);
  }

//normalizes time from datetime object
  function standard_time(time){
      return time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
  }
  
// If the time rolls over midnight and the page has not refreshed for the new day, do that.
  function is_it_time_for_a_daily_refresh(){
    
    var hourNow = new Date().getHours();
    
    if (!pageIsFreshlyLoaded && hourNow === 0) {
        location.reload();
    } else if (hourNow === 0){
        return
    } else {
        pageIsFreshlyLoaded = false;
    }
}

});