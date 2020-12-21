// settings
const DAYS_OUT = 28
const CLEANING_EVENT_NAME = 'Cleaning'
const CLEANING_TIME = 60

/**
 * processes events, finding events that don't have a cleaning event started at the same end time.
 * return events that need to be either removed, or should have events added at their end time.
 * @param {array} cleanEvents - Events with the CLEANING_EVENT_NAME name. The will be events that 
 *                              will be checked to see if they need to be removed if not matched
 * @param {array} otherEvents - Events that will be the list of bookings that will need to be checked to
 *                              to make sure they have cleaning events linked at the end.
 * @return {array} Array with two arrays. Events to be removed from the calendar, and events that need events added at the end.
 */
function processEvents(cleanEvents, otherEvents){
  var orphanedCleanings;
  var othersThatNeedCleaning;
  console.log(otherEvents.filter(function(ev){return ev.summary.match("`?")}));
  orphanedCleanings = getMissing(cleanEvents,'start', otherEvents, 'end');
  var cleaningsDeclined = getDeclined(cleanEvents);
  orphanedCleanings = orphanedCleanings.concat(cleaningsDeclined);
  othersThatNeedCleaning = getMissing(otherEvents,'end', cleanEvents,'start');

  return ([orphanedCleanings,othersThatNeedCleaning])
}

function test_processEvents(){
  
  var test_cal_id = CAL_ID;
  var test_days_out = DAYS_OUT;
  
  var events = listEvents(test_cal_id, test_days_out);
  [bookings, cleanings] = splitCleaningEvents(events);
  var toBeDeleted;
  var toBeCleaned;
  [toBeDeleted, toBeCleaned ]  = processEvents(cleanings, bookings);
  removeOrphans(test_cal_id, toBeDeleted);
  addCleaningEvent(test_cal_id, toBeCleaned);
  //removeOrphans(test_cal_id, toBeDeleted);
  console.log("to be deleted:");
  console.log(toBeDeleted);
}


function addCleaningEvent(calId, events){
  for(i=0; i < events.length; i++ ){
    createCalendarEvent(calId, events[i].end, CLEANING_TIME, CLEANING_EVENT_NAME);
  }
}

function removeOrphans(calId, events){
  for(i=0; i < events.length; i++ ){
    console.log("to be deleted: " + calId + " " + events[i].id);
    Calendar.Events.remove(calId, events[i].id);
  }
}