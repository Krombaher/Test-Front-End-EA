"use strict"

document.addEventListener('DOMContentLoaded', function () {
//Form
        const form = document.getElementById('form');
        const email = document.getElementById('email');
        const modalTitle = document.querySelector('.modal__title');
        const modalDescription = document.querySelector('.modal__description');

        form.addEventListener('submit', formSubmit);

        function formSubmit(e) {
            e.preventDefault();
            let error = formValidate(form);

            if (error === 0) {
                formSend()
                openModal('SUCCESS!', 'You have successfully subscribed to the email newsletter!')
                email.value = ''
                email.classList.remove('error')
            } else {
                email.classList.add('error')
                openModal('ERROR!', 'Email not sent, please check your details')
            }
        }

        function formSend() {
            const formData = new FormData(form);
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
                .then(res => {
                    console.log(res);
                })
                .catch(res => {
                    console.error(res)
                    openModal('ERROR!', 'Email not sent, please check your details')
                });
        }

// Validate Form
        function formValidate() {
            let isError = 0

            const emailValue = email.value.trim()
            if (emailValue === '') {
                isError++
            } else {
                return isError
            }
        }
//Modal
        const modal = document.getElementById('modal')
        const closeBtnModal = document.querySelectorAll('[data-close]')


        function openModal(title, description) {
            modalTitle.innerHTML = title
            modalDescription.innerHTML = description
            modal.classList.add('show');
            modal.classList.remove('hide');
        }

        closeBtnModal.forEach(item => {
            item.addEventListener('click', closeModal);
        });

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
        }

// Timer
        const deadline = '2023-05-31';

        function getTimeRemaining(onetime) {
            const result = Date.parse(onetime) - Date.parse(Date()),
                days = Math.floor((result / (1000 * 60 * 60 * 24))),
                seconds = Math.floor((result / 1000) % 60),
                minutes = Math.floor((result / 1000 / 60) % 60),
                hours = Math.floor((result / (1000 * 60 * 60) % 24));

            return {
                'total': result,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }

        function setClock(selector, endtime) {

            const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

            updateClock();

            function updateClock() {
                const result = getTimeRemaining(endtime);

                days.innerHTML = getZero(result.days);
                hours.innerHTML = getZero(result.hours);
                minutes.innerHTML = getZero(result.minutes);
                seconds.innerHTML = getZero(result.seconds);

                if (result.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }

        setClock('.timer', deadline);
    }
)


