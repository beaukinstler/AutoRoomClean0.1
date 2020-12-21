/**
 * Run this first to trigger Google to authorize your
 * account to use the Calendar APIs needed for this
 * script to work. 
 * It will simpley just find and log all Events on your 
 * primary calendar for the next DAYS_OUT days
 */
function initialize(){
    var now = new Date();
    var limit = new Date();
    limit.setDate(now.getDate() + DAYS_OUT);
    console.log(limit);
    opts = {
        singleEvents: true,
        orderBy: "startTime",
        timeMin: now.toISOString(),
    timeMax: limit.toISOString()}
    var events;
    events = Calendar.Events.list("Primary", opts);
    console.log(events.summary);
}