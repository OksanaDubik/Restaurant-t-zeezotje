//слайдер
let swiper = new Swiper(".mySwiper", {

    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


//форма регистрации
document.querySelector('.reserve').addEventListener('click', function () {
    document.querySelector('.registration').classList.add('opened')
    document.querySelector('.registration').classList.remove('registration')

})

function close() {
    document.querySelector('.opened').classList.add('registration')
    document.querySelector('.opened').classList.remove('opened')

}

document.querySelector('.close').addEventListener('click', close)

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();


        let error = 0;
        let formReq = document.querySelectorAll('._req')

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }

        let formData = new FormData(form);

        if (error === 0) {

            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            } else {
                alert('error')
            }
        } else {
            alert('Preencha os campos obrigatórios (Заполните обязательные поля.)')
        }

    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

});
