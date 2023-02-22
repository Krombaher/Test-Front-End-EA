"use strict"

document.addEventListener('DOMContentLoaded', function () {
//Form
        const form = document.getElementById('form');
        const email = document.getElementById('email');
        const modalTitle = document.querySelector('.modal__title');
        const modalDescription = document.querySelector('.modal__description');
        const errorMessage = document.getElementById('small')
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/


        form.addEventListener('submit', formSubmit);

        function formSubmit(e) {
            e.preventDefault();
            let error = formValidate()

            if (error === 0) {
                formSend()
                openModal('SUCCESS!', 'You have successfully subscribed to the email newsletter!')
                email.value = ''
            } else {
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
                });
        }

// Validate Form
        function formValidate() {
            let isError = 0

            if (email.value.match(pattern)) {
                errorMessage.style.display = 'none'
                email.style.border = '1px solid rgba(0, 0, 0, 0.8)'
            } else {
                email.style.border = '3px solid #DF2224'
                errorMessage.style.display = 'block'
                isError++
            }
            return isError
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

//Tabs
        const tabsBtn = document.querySelectorAll('.tabs__btn'),
            tabsContent = document.querySelectorAll('.tabs__content'),
            tabsInfo = document.querySelectorAll('.tabs__info')


        tabsBtn.forEach((item, i) => {
            item.addEventListener('click', () => {
                let currentBtn = item
                let tabId = currentBtn.getAttribute("data-tab")
                let currentTab = document.querySelector(tabId)

                if (!currentBtn.classList.contains('active-tab')) {
                    tabsBtn.forEach((item) => {
                        item.classList.remove('active-tab')
                    })

                    tabsContent.forEach((item) => {
                        item.classList.remove('contentActive')
                    })

                    tabsInfo.forEach((item, iInfo) => {
                        if (i === iInfo) {
                            item.classList.add('showInfo')
                        } else {
                            item.classList.remove('showInfo')
                        }
                    })

                    currentBtn.classList.add('active-tab')
                    currentTab.classList.add('contentActive')
                }
            })
        })

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


