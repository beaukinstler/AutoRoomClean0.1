function createCalendarEvent(calendarId=CAL_ID, end_date, durration=60, name="Cleaning") {
  var event_end_date = new Date(end_date);
  if(event_end_date == null ){
    event_end_date = new Date();
  }
  if(event_end_date.constructor.toString().match("Date") != null){
    var startTime = new Date(event_end_date.getTime());
    var endTime = new Date(event_end_date.getTime() + durration*60000);
    var resourceCal = CalendarApp.getCalendarById(calendarId);
    var newEvent;
    newEvent = resourceCal.createEvent(name, startTime, endTime);
    return newEvent;
  }
  else{
    console.log("event_end_date wasn't a Date object, so no event can be created:" + event_end_date.constructor.toString());
  }
}

/**
 * Makes an event on the calendar 24 hours from now
 * on the Primary calendar of the account
 * running this test.
 */
function test_createCalendarEvent() {
  var now = new Date();
  var cal_date;
  cal_date.setDate(now.getDate() + 1);
  var summary = 'test event created by CalendarCreate.test_createCalendarEvent()'
  createCalendarEvent(summary, cal_date.toISOString());
                          
}

