In an effort for better organization, the web agency, FakeCo, has decided to buy TVs to place around the office to display information relative to their day-to-day operations. One of the things they are most keen on doing is displaying all company calendar information in real-time in order to alert employees when meetings are about to take place.

For the design they came up with, here are some specifications:

Timeline should only show 5 hour blocks at a time starting at midnight, 4AM, 8AM, noon, 4PM, etc. So when it's between 8AM and 11AM, we should be able to see 8AM-1PM, but as soon as it passes noon, we should now see Noon-5PM, etc.
Current meetings should be shown in blue
Past meetings should be displayed in a dim gray
Future meeting should be a dark gray
Meetings starting within the next 15 minutes should be purple
The current time should be displayed in the upper-right of the page
The top bar should only display information for one event at a time with the following rules:
If there is a current meeting, display the information for that meeting (in blue).
If there are multiple current meetings, display information for all, but one at a time... cycle through them every 5-10 seconds or so (in blue).
If there are no current meetings and no meetings starting within the next 15 minutes, display information about the next meeting only (in dark gray).
If there are no current meetings and there IS a meeting starting within the next 15 minutes, display information about the next meeting only (in purple).
If there are no more meetings during the day, display a "No events for the rest of the day" message and hide the timeline.

---
###Components:

####Header

- Current meeting/s or upcoming meeting.
- Meeting status. (now/soon/eventually)
- Meeting time.
- Meeting name.
- Meeting location.
- Meeting participants.
- Clock.

####Schedule

- 5 hour rolling block showing times in 30 minute cross sections.
- Time scale at top.
- Increments of 30 minutes visible.
- Red line at current time.
- Meetings with width as long as their time.


---
process:

Create site template with static data.
Figure out dynamic time function.
Figure out dynamic hot seat.
Place real data accordingly.

---
Tools used:

repl.it for testing javascript
jsfiddle for testing full interaction
http://railscasts.com/episodes/324-passing-data-to-javascript?view=asciicast
regexr
shotgun

---
Methodology:


phases:

grab data from api and handle accordingly using javascript
set page template up (header, schedule)
set all the things (clock, time-bar, threshold, block, meetings, hot seat)
push data to page


update threshold:
if threshold not initialized, return true and avoid doing everything below
grab current time
check current time to see if it matches threshold array (time to change)
if it does, check to see if match is the same as current threshold
if matches, return false
if not then returns true and triggers threshold change

set threshold
for loop compares current time to known time blocks, once it encounters something bigger than it, it passes back last smaller value as threshold.
sets the block timeline div accordingly

set clock
push formatted version of now to view.

set time-bar:

red bar possible by pushing bar from the left for the percentage of time that has passed since last threshold:
each block is 18000 seconds long
if a block starts at 8pm and it is 940, then that is 100 minutes which is 6000 seconds
6000 is 33% of 18000 so the bar should be 33% to the left to show the time.
^ that worked, holy shit.

set details:

how to determine if meeting is in hot seat


set meetings:
use percentages.
loops through all meetings and calculates percentage
takes the percentage of start time and percentage of end time as footprint.

places them all according to their percentage.
checks if under timebar % , over, or both.
if under, meeting is in past, attaches class for that.
if over meeting is in future, attaches styling, adds to future pool.
use vw and time chunks to determine length of div.

---

Challenges:

How to portray time.

How to determine current status of meetings.

How to change colors.

