var testEventId = "4325dv5ibg2ri3p2u5fj2v8l9f";

function getEventById(calId, eventId) {
  var event = Calendar.Events.get(calId, eventId);
  console.log("^^^^^^")
  console.log(event.summary)
  return event;
}


function deleteEventById(calId, eventId) {
  var event = Calendar.Events.remove(calId, eventId);
}


function test_getEventById(){
  var calId = CAL_ID;
  var event = getEventById(calId, testEventId);
  
  console.log(event);

}