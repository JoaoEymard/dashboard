'use strict';
class Storage {
  _s = null;
  _sn = null;
  _c = {
    fnOnChange: null,
    fnGetServer: null
  }

  constructor (storage, storageName, config) {
    this._s = storage;
    this._sn = storageName;
    this._c.fnOnChange = config.onChange;
    this._c.fnGetServer = config.getServer;

    this.onChange();
  }

  get v () { return JSON.parse( this._s.getItem(this._sn) ); }
  set v (el) {
    try {

      this._s.setItem( this._sn, JSON.stringify(el) );
      this._c.fnOnChange ? this._c.fnOnChange(this) : null;

    } catch (e) {
      console.error(e);
    }
  }

  clear () {
    try {

      this._s.removeItem( this._sn );

    } catch (e) {
      console.error(e);
    }
  }
  count () { return this.v.length }

  isObject () { return typeof this.v === 'object'; }
  isArray () { return this.isObject ? Array.isArray(this.v) : false }

  push (obj) {
    try {

      if (!this.v) { this.v = obj; return 0; }
      var el = this.v;

      if (!this.isArray()) el = [el];
      if (!Array.isArray(obj)) obj = [obj];

      this.v = el.concat(obj);
      return this.count() -1;

    } catch (e) {
      console.error(e);
      return -1;
    }
  }
  remove (ind) {
    try {

      if (!this.isArray() && parseInt(ind) !== 0) { throw new Error('Não encontrado') };
      if (!this.isArray() && parseInt(ind) === 0) return this.clear();

      var arr = this.v;
      arr.splice(parseInt(ind), 1);
      this.v = arr;
      return this;

    } catch (e) {
      console.error(e);
    }
  }

  map (fnMap) {
    try {

      this.v = this.v.map(fnMap);
      return this;

    } catch (e) {
      console.error(e);
    }
  }
  find (fnFind) {
    try {

      if (!this.isArray()) return this.v;
      return fnFind ? this.v.find(fnFind) : this.v.find(e => e);

    } catch (e) {
      console.error(e);
    }
  }
  filter (fnFilter) {
    try {

      if (!this.isArray()) return this.v;
      return fnFilter ? this.v.filter(fnFilter) : this.v.filter(e => e);

    } catch (e) {
      console.error(e);
    }
  }

  onChange () {
    if (this._c.fnOnChange && (this._s === localStorage)) window.addEventListener('storage', (ev) => {
      if ( ev.key === this._sn ) this._c.fnOnChange(this);
    });
  }
  getServer () {
    try {

      if (this._c.fnGetServer) {
        this._c.fnGetServer().then(res => this.v = res)
      } else {
        throw new Error('Função ajax não especificada');
      }

    } catch (e) {
      console.error(e);
    }
  }
}
