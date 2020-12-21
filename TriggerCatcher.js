function processCalFromTrigger(input) {
  console.log("calendarId found:"  + input.calendarId);
  
  // get Calendar events for 28 days out
  // split and find events that need action because they are missing cleaning, or don't have a need to be cleaned because an event was removed or moved.
  async function processRemovals(){
    let events = await listEvents(input.calendarId, 28);
    var bookings,cleanings;
    [bookings, cleanings] = splitCleaningEvents(events);
    var toBeDeleted;
    var toBeCleaned;
    [toBeDeleted, toBeCleaned ]  = processEvents(cleanings, bookings);
    removeOrphans(input.calendarId, toBeDeleted);
  }
  
  async function processAdds(){
    let events = await listEvents(input.calendarId, 28);
    var bookings,cleanings;
    [bookings, cleanings] = splitCleaningEvents(events);
    var toBeDeleted;
    var toBeCleaned;
    [toBeDeleted, toBeCleaned ]  = processEvents(cleanings, bookings);
    addCleaningEvent(input.calendarId, toBeCleaned);
  }
  processRemovals().then(processAdds());

}
