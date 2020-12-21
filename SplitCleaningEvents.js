function splitCleaningEvents(events){
  var cleanings = events.filter(checkCleaning);
  var others = events.filter(checkNotCleaning);
  if(others){
    others = others.filter(findNoDeclined); // also filter out bookings that are declined.
    others = others.filter(isNotAllDayEvent); // filter out all day events.
  }
  return [others, cleanings];
}

function checkCleaning(event) {
  return event.summary.match('Cleaning');
}

function checkNotCleaning(event,searchTerm){
  return !event.summary.match('Cleaning');
}


function findNoDeclined(item){
  if(item.att_status){
    var test = item.att_status.filter(function(x){return x == 'declined'});
    return !(test.length == undefined || test.length > 0);
  }  
  else{
    return true;
  }
}

function test_findNoDeclined(){
  var data = {att_status:['declined','']}
  console.log(findNoDeclined(data));
}


function test_splitCleaningEvents(){
  var eventsMissingCleaning = []; //will need cleanings
  var matched = []; // no action will be needed
  var cleaningsMissingEvents = [] // will need to be deleted

  console.log(bookings);
  console.log(cleanings);
}

