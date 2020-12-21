function listEvents(calendarId=CAL_ID, days_out = 28) {
/*
get and return a list of events for a calendar. Default from now until 28 days. 
doesn't return any past events
*/
  var all_events =[];
  var events;
  var result = [];
  var pageToken;
  var counter = 0;
  var now = new Date(); 
  var limit = new Date();
  limit.setDate(now.getDate() + days_out);
  
  // start the clock a bit behind now so that events in progress don't have a cleaning event removed. 
  now = new Date(now - (60 * 60 * 1000));
  
  // use event page tolkens to loop while a next tolken returns a truthy value
  // create an event object with distilled info
  do {
    events = Calendar.Events.list ( calendarId, {
      pageToken: pageToken,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: now.toISOString(),
      timeMax: limit.toISOString()
    });
    
    if (events.items && events.items.length > 0) {
      for (var i = 0; i < events.items.length; i++) {
        
        counter += 1;
        var event = events.items[i];
        var temp_event = {};
        temp_event.order = counter;
        temp_event.id = event.id;
        temp_event.end = event.end.dateTime;
        temp_event.start = event.start.dateTime;
        temp_event.summary = event.summary;
        temp_event.attendee_emails = event.attendee_emails;
        temp_event.organizer_email = event.organizer.email;
        temp_event.status = event.status;

        // only evaluate attendees if they exist.  private calendars won't have this key
        if(event.attendees){
          temp_event.att_status = event.attendees.map(function(att){if(att.self == true){return att.responseStatus}});
        }
        all_events.push(temp_event);

      }
    } else {
      console.log('No events found.');
    }
    pageToken = events.nextPageToken;
  } while (pageToken);

  return all_events;
}


function test_listEvents(){
  var events = listEvents(CAL_ID);
  console.log(CAL_ID);
  console.log(events);
}