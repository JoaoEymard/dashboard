window.onload = function () {
  setTimeout(function () {
    try {
      document.querySelector('.preCarregamentoPage').classList.add('animated', 'bounceOutUp');
    } catch (e) {
      console.log(e);
    }
  }, 1000);
}
