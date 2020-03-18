//Hash map implementation with Open Addressing Collisions

class HashMap_OA {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      /*Bitwise left shift with 5 0s - this would be similar to
            hash*31, 31 being the decent prime number
            but bit shifting is a faster way to do this
            tradeoff is understandability*/
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure hash is unsigned - meaining non-negative number
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error("key error");
    }
    return this._hashTable[index].value;
  }

  //Best and average case is O(1), and an O(n) for worst case(If a collision takes).
  //Adding items to the hashmap
  set(key, value) {
    //Check whether the load ratio is greater than the given maximum.
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      //resize the hash map
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    //Find the slot where this key should be in
    const index = this._findSlot(key);

    //if the hashtable at index is not occupied then increase the length of the table
    if (!this._hashTable[index]) {
      this.length++;
    }
    //add an object to the hashtable with the correct index found from _findSlot
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  //Best and average case for this function is O(1)
  _findSlot(key) {
    //Using the key value, calculate the hash of the key using a private function _hashString()
    const hash = HashMap._hashString(key);
    //use the modulo to find a slot for the key within the current capacity.
    const start = hash % this._capactiy;

    //loop through the array and stop when it finds the slot with a matching key or an empty slot.
    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  //Best and average case is O(n), and O(n^2) in the worst case. Each set call is O(1);
  /* Resizing the hashmap - To make sure that each item lives in the correct location
     Recreate the hash map from scratch with larger capacity*/
  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    //Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  //Deleting in Open Addressing Collisions.
  //-Simple solution is to not actually delete the item at all, and just put a deleted marker in the slot.
  //Then on resize you can actually clear out all of the deleted items.
  delete(key) {
    //find the slot index of the key
    const index = this._findSlot(key);

    //set the value in hashTable[index] into slot
    const slot = this._hashTable[index];
    //error check
    if (slot === undefined) {
      throw new Error("Key error");
    }
    //set the slots DELETED value to true so we know it is set to deleted without actually deleting it
    slot.DELETED = true;
    //decrement the length;
    this.length--;
    //increment the deleted amount;
    this._deleted++;
  }
}

module.exports = HashMap_OA;
