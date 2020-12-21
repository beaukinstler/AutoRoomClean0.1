/*
* Return values array of objects that have the self attendee declined. 
*/
function getDeclined(array){
  var results = []
  results = array.filter(findDeclined);
  return results;
}

function findDeclined(item){
  if(item.att_status){
    var test = item.att_status.filter(function(x){return x == 'declined'});
    return test.length > 0;
  }  
  else{
    return false;
  }
}

function test_getDeclined(){
  // all logs should be true
  results = getDeclined([{key:1,att_status:['declined','']},{key:2},{key:3}]);
  console.log(results[0].key == 1);
  console.log(results);
  console.log(results[1] == undefined );
}