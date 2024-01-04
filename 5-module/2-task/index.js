function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  const text = document.getElementById('text');

  btn.addEventListener('click', () => {
    if (!text.hidden) {
      text.hidden = true;
    } else {
      text.hidden = false;
    }
  })
}
