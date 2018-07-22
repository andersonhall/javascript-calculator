
const display = document.querySelector('#display');
const key = document.querySelectorAll('button');
key.forEach(button => {
  button.addEventListener('click', (e) => {
    const btn = button.textContent;
    if (btn !== '=' && 
        btn !== 'C' &&
        btn !== '+' &&
        btn !== '-' &&
        btn !== '×' &&
        btn !== '÷') {
      if (display.textContent.length > 14) {
        alert('You have reached the maximum length allowed.');
      } else if (display.textContent === '0') {
        display.textContent = btn;
      } else if (display.textContent.includes('.') && btn === '.') {
        display.textContent = display.textContent;
      } else {
        display.textContent = display.textContent + btn;
      }; 
    };
    if (btn === 'C') {
      display.textContent = '0'
    };
  });
});
// Makes buttons work
