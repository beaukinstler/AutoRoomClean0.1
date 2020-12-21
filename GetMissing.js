/*
* Return values array of objects with key value items found in array 1 but missing in array two
*/
function getMissing(array1, key1, array2, key2){
  var results = []
  
  for(i=0; i < array1.length; i++){
    var found = false;
    for(j=0; j < array2.length; j++ ){
      if(array1[i][key1] === array2[j][key2]){
        found = true;
        console.log('breaking when found');
        break;
      }
    }
    if(!found){
      results.push(array1[i]);
    }
  }
  return results;
}

function test_getMissing(){
  // all logs should be true
  results = getMissing([{key:1},{key:2},{key:3}], 'key', [{key2:2},{key2:3}],'key2');
  //console.log(results[0].key == 1);
  console.log(results);
  console.log(results[1] == undefined );
}