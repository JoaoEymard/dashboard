window.onload = function () {
  setTimeout(function () {
    try {
      if (document.querySelector('.preCarregamentoPage')) {
        document.querySelector('.preCarregamentoPage').classList.add('animated', 'bounceOutUp');
      }
    } catch (e) {
      console.log(e);
    }
  }, 1000);
}

function removeAlert (idAlert, time) {
  setTimeout(function () {
    if (!document.querySelector('.'+idAlert)) { return; }
    
    animateCss(document.querySelector('.'+idAlert), 'bounceOutRight', () => {
      $('.'+idAlert).alert('close')
    })
  }, time || 0);
}

function addAlert (tipo, titulo, msg) {
  var $boxAlerts = $('.box-alerts');
  do {
    var idAlert = "alert-"+randomInt(0, 1000);
  } while (document.querySelector('.'+idAlert) !== null);

  const alert = "<div class='alert alert-"+tipo+" "+idAlert+" animated bounceInRight pl-3 pr-5 py-3' role='alert'><h6 class='alert-heading mb-0'>"+titulo+"</h6>"+msg+"<button type='button' class='close' onclick='removeAlert(\""+idAlert+"\")'><span aria-hidden='true'>&times;</span></button></div>"

  $boxAlerts.append(alert);
  removeAlert(idAlert, 1000*5);
}
