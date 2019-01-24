'use strict';
class Storage {
  constructor (storage, storageName) {
    this._storageName = storageName;
    this._storage = storage;
  }

  push (obj) {
    try {
      const arr = this.arr;
      const id = arr.push(obj);

      this.arr = arr;
      return id-1;
    } catch (e) {
      return false;
    }
  }
  remove (index) {
    try {
      var arr = this.arr;
      delete arr[index];

      this.arr = arr.filter(e => e);
      return true;
    } catch (e) {
      return false;
    }
  }
  filter (callback) {
    try {
      return this.arr.filter(callback);
    } catch (e) {
      return false;
    }
  }
  edit (callback) {
    try {
      return this.arr = this.arr.map(callback);
    } catch (e) {
      return false;
    }
  }

  get clear () {
    try {
      this.arr = [];
      return true;
    } catch (e) {
      return false;
    }
  }
  get destroy () {
    try {
      this._storage.clear( this._storageName );
      return true;
    } catch (e) {
      return false;
    }
  }

  set arr (arr) {
    try {
      if (Array.isArray( arr )) {
        this._storage.setItem( this._storageName, JSON.stringify(arr) );
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  get arr () {
    return JSON.parse( this._storage.getItem(this._storageName) );
  }
  get storageName () {
    return this._storageName;
  }
  get count () {
    return this.arr.length;
  }
}
