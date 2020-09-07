var mask = document.getElementById('mask')

window.addEventListener('blur', () => {
    mask.classList.remove('hide')
})

window.addEventListener('focus', () => {
    mask.classList.add('hide')
})
