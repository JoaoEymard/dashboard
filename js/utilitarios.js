class Clock {
  constructor (time, callback) {
    this._tm = time;
    this._fn = callback;
    this._ciclo = null;
  }
  start (callback) {
    this._ciclo = setTimeout(() => {
      this._fn (new Date());
      this.start();
    }, this._tm, this);
  }
  stop () {
    clearTimeout(this._ciclo);
    this._ciclo = null;
  }
  get check () { return this._ciclo ? true : false; }
}

/*
p [number] - Diferença entre as datas. Ex: date1 - date2
tipoRetorno [string] - Informa o formato do retorno. Ex: (milisegundos | segundos | minutos | horas | dias)
overflow [boolean] - Se true, retorna a fração do período correspondente ao tipo informado. Se false, retorna todo o período no tipo informado
*/
function formatarPeriodo (p, tipoRetorno, overflow){
  var step, overflow = overflow || false;

  switch (tipoRetorno) {
    case 'milisegundos': step = 1; overflow = overflow ? 1000 : false; break;
    case 'segundos': step = 1000; overflow = overflow ? 60 : false; break;
    case 'minutos': step = 1000*60; overflow = overflow ? 60 : false; break;
    case 'horas': step = 1000*60*60; overflow = overflow ? 24 : false; break;
    case 'dias': step = 1000*60*60*24; overflow = false; break;
    default: return {
      'milisegundos': formatarPeriodo(p, 'milisegundos', true),
      'segundos': formatarPeriodo(p, 'segundos', true),
      'minutos': formatarPeriodo(p, 'minutos', true),
      'horas': formatarPeriodo(p, 'horas', true),
      'dias': formatarPeriodo(p, 'dias') || 0
    }
  }

  return overflow ? ~~(Math.floor(p / step) % overflow) : Math.floor(p / step);
}

function randomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function paramsURL () {
  var query = location.search.slice(1);
  var partes = query.split('&');
  var data = {};
  partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
  });

  return data;
}
