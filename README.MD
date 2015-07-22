In an effort for better organization, the web agency, FakeCo, has decided to buy TVs to place around the office to display information relative to their day-to-day operations. One of the things they are most keen on doing is displaying all company calendar information in real-time in order to alert employees when meetings are about to take place.

For the design they came up with, here are some specifications:

- Timeline should only show 5 hour blocks at a time starting at midnight, 4AM, 8AM, noon, 4PM, etc. So when it's between 8AM and 11AM, we should be able to see 8AM-1PM, but as soon as it passes noon, we should now see Noon-5PM, etc.
- Current meetings should be shown in blue
- Past meetings should be displayed in a dim gray
- Future meeting should be a dark gray
- Meetings starting within the next 15 minutes should be purple
- The current time should be displayed in the upper-right of the page
- The top bar should only display information for one event at a time with the following rules:
  - If there is a current meeting, display the information for that meeting (in blue).
  - If there are multiple current meetings, display information for all, but one at a time... cycle through them every 5-10 seconds or so (in blue).
  - If there are no current meetings and no meetings starting within the next 15 minutes, display information about the next meeting only (in dark gray).
  - If there are no current meetings and there IS a meeting starting within the next 15 minutes, display information about the next meeting only (in purple).
  - If there are no more meetings during the day, display a "No events for the rest of the day" message and hide the timeline.

---

###Features

- Dynamically changes the times and placement of objects according to the @hours_shown variable in calendar.rb (So if client wants a 4 hour window instead, for example, it is an easy change.)
- Colors isolated to Sass variables, so color change requests can be easily facilitated as well.
- All times formulated down to the minute and elements display accordingly. 
- Current time and time sensitive items update every 30 seconds, but can be changed to update every second if needed.
- Page refreshes itself at midnight every night to capture new days data.

---
###Notes

- Built app on a Sinatra framework because Rails bulk seemed unneeded and also wanted to explore Sinatra more and this seemed like a good opportunity.
- Page currently loads in under 1 second on average. If page load is a concern, images could be resized server-side and javascript minified.
- Time data per element is passed to javascript through Data- tags.
- Wanted the Ruby app to build the DOM view so decided to have it make the API call as well as opposed to a Jquery or JSONP call client-side.
- Adhered to design wireframe presented. Since this is first encounter with customer, I want to demonstrate that I can work to specifications.
- Used the [BEM methodology](https://en.bem.info/) for my CSS naming convention. No frameworks were harmed in the making of this app.

---
###Tools used:

[Repl.it](https://repl.it) for trying out javascript tidbits.
http://jsfiddle.net/
http://railscasts.com/episodes/324-passing-data-to-javascript?view=asciicast
http://regexr.com/
[Shotgun](https://github.com/rtomayko/shotgun) for live reload of Sinatra.
Google
Stack Overflow
[Mozilla Developer Network](https://developer.mozilla.org/en-US/)
Heroku for cloud deployment.

---
##Components:

####Header

- Current meeting/s or upcoming meeting.
- Meeting status. (now/soon/eventually)
- Meeting time.
- Meeting name.
- Meeting location.
- Meeting participants.
- Clock.

####Schedule

- X hour rolling block showing times in 30 minute cross sections.
- Time scale at top.
- Increments of 30 minutes visible.
- Red line at current time.
- Meetings with width as long as their time.

---
###Challenges:

How to portray time.

How to determine current status of meetings.

How to change colors.

