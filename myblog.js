const toggle_mode_btn = document.getElementById("toggle_mode")
const scl_logos = document.querySelector('socials')

toggle_mode_btn.addEventListener('click', function(){
    const body = document.body
    body.classList.toggle('dark_mode');
    scl_logos.style.backgroundColor= 'black'
})
