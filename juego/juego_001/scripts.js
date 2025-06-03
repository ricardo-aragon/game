
document.getElementById('pc').addEventListener('mouseenter', function () {
  const img = this.querySelector('.img-hover');
  const src = img.src;
  img.src = ''; // forzar recarga
  img.src = src;
});


