/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */

function PriorityQueue() {
	this.store ={};	// keys are priorities, values are arrays of elements
	this.count = 0;

	// adds an item
	// priority must be an integer (higher value has higher priority)

	this.add = function(value,priority) {
		if (this.store[priority] == undefined)
			this.store[priority] = [];

      this.store[priority].push(value);
      //this.store[priority]=(value);
      this.count++;
      /* convert array of object into string json
      This was added to see the string version of how the priority queue object looks like*/

      var jsonString = JSON.stringify(this.store);
      console.log("After adding value:"+value+" and key:"+priority+" the queue is: "+ jsonString);
      //console.log ("After add the count is: "+ this.count);
	};

  // returns the oldest-added value with the highest priority
      this.pop = function() {
        maxKey = Math.max(...Object.keys(this.store));  // (...Object.keys(this.store)), the three dots converts the object to numbers
        this.count--;
        var delKey = this.store[maxKey][0];
        this.store[maxKey].shift();
        //delete this.store[maxKey];
        /* convert array of object into string json*/
        var jsonString = JSON.stringify(this.store);
        console.log("For pop the maxKey value is: "+maxKey+" and the delKey is: "+delKey);
        console.log("After pop the queue is: "+ jsonString);
        console.log("After pop the count is: "+this.count);
        return delKey;
	};

  this.length = function() {
    //console.log("I'm in the length "+this.count);
    return this.count;
  }
}

PriorityQueue.prototype.get_all_priorities = function() {
  //console.log("The priorities of the queue "+Object.keys(this.store));
	return Object.keys(this.store);
}

// iterates through all the queue elements in priority-then-FIFO order
PriorityQueue.prototype.forEach = function(callback) {
	 var keys = Object.keys(this.store).sort();
   var innerKeys;

	 for (var a = 0; a < keys.length; a++) {
    innerKeys= Object.values(this.store)[a].length; //this.store return an object type, in order to get length, we need to convert the object to values or keys
    //console.log("Key is: "+innerKeys);
	 	    for (var b = 0; b < innerKeys; b++){
            //console.log("Values are "+Object.values(this.store)[a][b]) //
			      callback(Object.values(this.store)[a][b]);
        }
	 }
}
PriorityQueue.prototype.changePriority = function(value, newPriority) {
	var foundItem = false;
  var foundKey;
  var foundIndex;

   (Object.entries(this.store)).forEach(bucket);

   function bucket(item,index) {
     //	bucket.forEach(function(item, index) {
        //console.log("Im inside bucket "+item[0]+" and "+item[1])

        //Initially there was 2 forEach loops, but I have changed it to one forEach and used a for loop inside for better readibility.  I could resolve the errors better this way."
	       for (var b = 0; b < item[1].length; b++){
           if(item[1][b]===value) {
             console.log("Bingo!!! found the value "+value+" to change priority to "+newPriority)
             foundKey = item[0];
             foundIndex = b;
             foundItem = true;
             //delete this.store[foundKey][foundIndex];
             console.log("found key is "+foundKey+" and found index is: "+foundIndex);
             if(foundItem)break; //if found gets out from the loop
           }
           if(foundItem)return false; //early exit from forEach
         }

        //foundIndex = index;
 		//	object.splice(index, 1)  // remove the item
  };
  console.log("Deleted key is: "+this.store[foundKey][foundIndex]);
  this.store[foundKey].splice([foundIndex],1);
  this.add(value,newPriority);
  var jsonString = JSON.stringify(this.store);
  console.log("the element is after changePriority: "+ jsonString);
   //(Object.entries(this.store)).forEach((item, index) => console.log("Item is: "+item+" and index is: "+index));
  return false;
}

var storeQ = new PriorityQueue();

//These are some basic tests that was done to check if every functions are working correctly or not
//For testing reson, there should be more test samples and senarios

//For add function multiple values with same priority was added as well as one key and one value items were added as well
storeQ.add(10,77);
storeQ.add(11,77);
storeQ.add(12,77);
storeQ.add(40,2);
storeQ.add(200,10);
storeQ.add(50,9);
storeQ.add(41,3);
storeQ.add(42,3);
storeQ.add(43,3);
storeQ.add(40,3);
storeQ.add(20,1);
storeQ.add(30,2);
storeQ.length(); //This is checking if it's retuning the correct count value
storeQ.pop();
//storeQ.forEach();    //this was tested without a passing a callback (function) parameter to test if all functionalities are working correctly or not
storeQ.changePriority(40,10);
storeQ.add(30,3);
storeQ.add(60,2);
storeQ.changePriority(20,4);
storeQ.add(30,2);
storeQ.pop();
storeQ.pop();//this pop is to test what happens when the last value of the highest priority is popped.  Should it stay as empty item with a key?

console.log("all priorities are:  "+storeQ.get_all_priorities());
