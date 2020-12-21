
test_config  = {
  cal_id: CAL_ID

}

function helper_createTestEvents() {
  e1 = { order: 1,
    id: '19ij5usvi7j3bolmiahl7r7kr4',
    end: '2020-05-08T16:30:00-07:00',
    start: '2020-05-08T15:30:00-07:00',
    summary: 'test',
    end_date: undefined,
    start_date: undefined,
    end_time: undefined,
    start_time: undefined,
    attendee_emails: undefined,
    organizer_email: CAL_ID };
  
  e2 = { order: 2,
    id: '4f9qrpd6ogu817g5lubspincuj',
    end: '2020-05-08T17:00:00-07:00',
    start: '2020-05-08T16:30:00-07:00',
    summary: 'Cleaning',
    end_date: undefined,
    start_date: undefined,
    end_time: undefined,
    start_time: undefined,
    attendee_emails: undefined,
    organizer_email: CAL_ID };
    
  e3 = { order: 3,
    id: 'budhv62fnsgs640t1fb0ikolvs',
    end: '2020-05-08T16:30:00-07:00',
    start: '2020-05-08T15:30:00-07:00',
    summary: 'Cleaning\n\n',
    end_date: undefined,
    start_date: undefined,
    end_time: undefined,
    start_time: undefined,
    attendee_emails: undefined,
    organizer_email: CAL_ID };
  e4 = { order: 3,
    id: 'budhv62fnsgs640t1fb0ikolvs',
    end: '2020-05-09T16:30:00-07:00', // 24 hour event
    start: '2020-05-08T16:30:00-07:00',
    summary: 'Cleaning\n\n',
    end_date: undefined,
    start_date: undefined,
    end_time: undefined,
    start_time: undefined,
    attendee_emails: undefined,
    organizer_email: CAL_ID };
  
  
  var events = [e1,e2,e3, e4];
  return events;
}

function test_isAllDayEvent(){
  var events;
  events = helper_createTestEvents();
  var date1, date2;
  var allDayEvents = [];
  var notAllDayEvents = [];
  for(i=0; i < events.length; i++){
    date1 = new Date(events[i].start);
    date2 = new Date(events[i].end);
    
    var hours = (Math.abs(date1-date2) / 1000 / 60.0 / 60);
    if(Math.round(hours) == 24){
      console.log("all day");
    }
    console.log(hours);
    // check if event is all day and push if so.
    if(isAllDayEvent(events[i])){
      allDayEvents.push(events[i]);
    }
    if(isNotAllDayEvent(events[i])){
      notAllDayEvents.push(events[i]);
    }
       
  }
  var count = allDayEvents.length;
  console.log("all days events count is 1?" + (count == 1 )+ " count is " + count);
  
  var countNot = notAllDayEvents.length;
  console.log("all days events countNot is 3? " + (countNot == 3 )+ ". Count of not is:" + countNot);
      
}

function test_checkForTrailingCleaning(){
  
  var e1, e2, e3;
  [e1, e2, e3] = helper_createTestEvents();
  var result = checkForTrailingCleaning(e1, e2)
  
  console.log(events);
  console.log(result);
  
}


function checkForTrailingCleaning(e1, e2){
  
  var test_result = false;
  if( e2.summary.match('Cleaning') ){
     var time_to_test = new Date(e1.end);
     var start_to_test = new Date(e2.start);
     var end_to_test = new Date(e2.end);
     time_to_test = new Date(time_to_test.getTime() + 15*1000);
     test_result = test_result || time_to_test > start_to_test;
     test_result = test_result || time_to_test < end_to_test;
  }
  
  return test_result;


}

function test_getDeclinedEvents(){
  var now = new Date();
  var limit = new Date();
  limit.setDate(now.getDate() + 28);
  console.log(limit);
  opts = {
      singleEvents: true,
      orderBy: "startTime",
      timeMin: now.toISOString(),
    timeMax: limit.toISOString()}
  var events;
  events = Calendar.Events.list(test_config.cal_id, opts);
  //console.log(events.items.filter(canceledFilter).map(function(x){return x.getSequence()}));
  //console.log(events.items.filter(function(x){return x.attendees}));
  console.log(events.items.filter(findNoDeclined));
}

function canceledFilter(ev){
  return ev.summary.match('test');
}