function runTimedCalenderCleaningJob(calId){
  console.log("calendarId found:"  + calId);
  
  // get Calendar events for 28 days out
  // split and find events that need action because they are missing cleaning, or don't have a need to be cleaned because an event was removed or moved.
  var events = listEvents(calId, 28);
  var bookings,cleanings;
  [bookings, cleanings] = splitCleaningEvents(events);
  var toBeDeleted;
  var toBeCleaned;
  [toBeDeleted, toBeCleaned ]  = processEvents(cleanings, bookings);
  console.log("to be deleted:");
  console.log(toBeDeleted);  
  removeOrphans(calId, toBeDeleted);
  addCleaningEvent(calId, toBeCleaned);
}

function runTestCalTimedJob(){
  var calId = CAL_ID;
  runTimedCalenderCleaningJob(calId);
}
