function isAllDayEvent(event) {
  var date1 = new Date(event.start);
  var date2 = new Date(event.end);
  var hours = (Math.abs(date1-date2) / 1000 / 60.0 / 60);
  if(Math.round(hours) == 24){
    console.log("all day");
    return true;
  }
  return false;
}

function isNotAllDayEvent(event){
  return !isAllDayEvent(event);

}
