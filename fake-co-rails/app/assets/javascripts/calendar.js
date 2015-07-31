
function doStuff(){

//  var now = new Date();
//  var thresholds = [];
//  set_thresholds(thresholds);
//  var alpha_threshold = set_alpha_threshold(thresholds, now);
//  set_block(alpha_threshold);
//  var percentageNow = set_timebar(alphaThreshold /1000, now /1000);
//  set_clock(now);
//  set_meetings(alphaThreshold);
//  set_hotseat(percentageNow, alphaThreshold /1000);
//  set_colors(percentageNow, alphaThreshold /1000);

  window.setInterval(function(){

//  now = new Date();
//  percentageNow = set_timebar(alphaThreshold /1000, now /1000);
//  set_clock(now);
//  set_hotseat(percentageNow, alpha_threshold /1000);
//  set_colors(percentageNow);

//  if (changeover(alphaThreshold, now, thresholds)) {
//    alphaThreshold = set_alpha_threshold(thresholds, now);
//    set_block(alphaThreshold);
//    set_meetings(alphaThreshold /1000);
  }

},30000);
}

//function set_timebar(then, now) {
//  var percentageNow = (((now - then) / 18000) * 100).toFixed(2);
//  var percentage = percentageNow + "%"
//  document.getElementById("schedule__time-bar").style.left = percentage;
//  return percentageNow;
//}


//function set_clock(now){
//  document.getElementById("clock").innerHTML = standard_time(now);
//}

//function set_thresholds(thresholds) {
//  for(var i=0; thresholds.length < 7; i+=4){
//      var now = new Date();
//      now.setHours(i,0,0);
//      thresholds.push(now);
//  }
//}

//function changeover(alphaThreshold, now, thresholds) {
//
//    var standard_now = standard_time(now);
//    for(var x in thresholds){
//        if (standard_now == standard_time(thresholds[x])){
//            if(standard_now == standard_time(alphaThreshold)){
//                return false;
//            }
//            return true;
//        }
//    }
//    return false;
//}


//function set_alpha_threshold(thresholds, now) {
//    var gauge = "";
//    for (var i = 0; i < thresholds.length; i++) {
//        if(now > thresholds[i]) {
//            gauge = thresholds[i];
//        }
//    }
//    return gauge;
//}


//function set_block(alphaThreshold) {
//    var block_threshold = new Date(alphaThreshold);
//    var collection = document.getElementsByClassName('timeline__list-item');
//    for(i = 0; i < collection.length; i ++){
//        collection[i].innerHTML = block_threshold.toLocaleTimeString(navigator.language, {hour: '2-digit'});
//        block_threshold.setHours(block_threshold.getHours()+1);
//    }
//}


//function set_meetings(then) {
//  then = then /1000;
//  var collection = document.querySelectorAll('.schedule__meeting');
//  for(i = 0; i < collection.length; i ++){
//    var now = Date.parse(collection[i].dataset.startTime) /1000;
//    var percentage = (((now - then) / 18000) * 100).toFixed(2) + "%";
//    collection[i].style.left = percentage;
//  }
//}
//
//function set_hotseat(percentageNow, then) {
//
//  var hotseat = [];
//  var tepidseat = [];
//  var coldseat = [];
//  var collection = document.querySelectorAll('.details');
//  for(i = 0; i < collection.length; i ++){
//    var start = Date.parse(collection[i].dataset.startTime) /1000;
//    var end = Date.parse(collection[i].dataset.endTime) /1000;
//    var startPercentage = (((start - then) / 18000) * 100).toFixed(2);
//    var endPercentage = (((end - then) / 18000) * 100).toFixed(2);
//    if (startPercentage <= percentageNow && endPercentage >= percentageNow) {
//      console.log("hotseat");
//      console.log(startPercentage);
//      console.log(percentageNow);
//      console.log(endPercentage);
//      hotseat.push(collection[i]);
//    } else if(startPercentage > percentageNow && (startPercentage - percentageNow) <= 5){
//      console.log("tepidseat");
//      tepidseat.push(collection[i]);
//    } else if(startPercentage > percentageNow) {
//      console.log("coldseat");
//      coldseat.push(collection[i]);
//    }
//    collection[i].style.opacity = 0;
//  }
//
//  if(hotseat.length == 1){
//    hotseat[0].style.opacity = 1;
//    return
//  } else if(hotseat.length > 1){
//    hotseat[0].style.opacity = 1;
//    return
//  } else if(tepidseat.length == 1){
//    tepidseat[0].style.opacity = 1;
//    return
//  } else if(tepidseat.length > 1){
//    tepidseat[0].style.opacity = 1;
//    return
//  } else if(coldseat.length == 1){
//    coldseat[0].style.opacity = 1;
//    return
//  } else if(coldseat.length > 1){
//    coldseat[0].style.opacity = 1;
//    return
//  } else {
    noonka = "<p class='clock__nomeetings'>No events for the rest of the day.</p>"
    document.getElementById("clock").innerHTML += noonka;
  }
}

//function set_colors(percentageNow, then) {
//
//  var lastKnown;
//  var drop = 23;
//  var collection = document.querySelectorAll('.schedule__meeting');
//
//  for(i = 0; i < collection.length; i ++){
//    var start = Date.parse(collection[i].dataset.startTime) /1000;
//    var end = Date.parse(collection[i].dataset.endTime) /1000;
//    var startPercentage = (((start - then) / 18000) * 100).toFixed(2);
//    var endPercentage = (((end - then) / 18000) * 100).toFixed(2);
//    console.log(endPercentage);
//    console.log(lastKnown);
//    if (typeof lastKnown === "undefined") {
//      lastKnown = endPercentage;
//    } else if (startPercentage < lastKnown){
//      collection[i].style.top = drop + "%";
//      drop += 13;
//    } else {
//      drop = 23;
//    }

//    if (startPercentage <= percentageNow && endPercentage >= percentageNow) {
//      collection[i].className = 'schedule__meeting schedule__meeting--blue';
//    } else if(startPercentage > percentageNow && (startPercentage - percentageNow) <= 5){
//      collection[i].className = 'schedule__meeting schedule__meeting--purple';
//    } else if(startPercentage > percentageNow) {
//      collection[i].className = 'schedule__meeting schedule__meeting--gray';
//    } else if(endPercentage < percentageNow) {
//      collection[i].className = 'schedule__meeting schedule__meeting--light-grey';
//    } else {
//      collection[i].className = 'schedule__meeting schedule__meeting--black';
//    }
//  }
//}

//function standard_time(time){
//    return time.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
//}
