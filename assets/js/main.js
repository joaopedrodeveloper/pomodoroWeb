function pomodoro() {
    const cronometro = document.querySelector('.pomo-time');
    const mainPomodoro = document.querySelector('.main-pomodoro');
    const btnTarefas = document.querySelector('.btn-tarefas');
    const btnStart = document.querySelector('.btn-start');
    const btnPausar = document.querySelector('.btn-pausar')
    const btnPomodoro = document.querySelector('.btn-pomodoro');
    const btnShortBreak = document.querySelector('.btn-short-break');
    const btnLongBreak = document.querySelector('.btn-long-break');
    const timeTitle = document.querySelector('title');
    const audio = new Audio('assets/audio/mixkit-racing-countdown-timer-1051.wav');
    let segundos = 1500;
    let timer;
    let contadorPomo = 0;
    let contadorPomo2 = 8;

    function pegaTempoDosSegundos(segundos) {
        const data = new Date(segundos * 1000);
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        });
    }

    function iniciaCronometro() {
        timer = setInterval(function () {
            segundos--;
            cronometro.innerHTML = pegaTempoDosSegundos(segundos).slice(3);
            timeTitle.innerText = `${pegaTempoDosSegundos(segundos).slice(3)} - Fique focado!`;
            resetCronometro(segundos);
        }, 1000);
    }

    function resetCronometro(segundos) {
        if (segundos <= 0) {
            clearInterval(timer);
            if (contadorPomo % 2 === 0) {
                btnShortBreak.click();
                if (contadorPomo === contadorPomo2) {
                    btnLongBreak.click();
                    contadorPomo = -1;
                } else {
                    contadorPomo++;
                }
            } else {
                btnPomodoro.click();
                contadorPomo++;
                console.log('par')
            }
            audio.play()
        }
    }

    function btnPausarF() {
        btnPausar.classList.add('btn-esconder');
        btnStart.classList.remove('btn-esconder');
    }

    document.addEventListener('click', function (e) {
        const elemento = e.target;

        if (elemento.classList.contains('btn-start')) {
            clearInterval(timer);
            iniciaCronometro();
            btnStart.classList.add('btn-esconder');
            btnPausar.classList.remove('btn-esconder');
        } else if (elemento.classList.contains('btn-pausar')) {
            clearInterval(timer);
            btnPausarF();
        }

        if (elemento.classList.contains('btn-short-break')) {
            clearInterval(timer);
            segundos = 300;
            cronometro.innerHTML = '05:00';
            this.body.style.background = 'var(--fourth-color)';
            mainPomodoro.style.background = 'var(--fourth-color-menos)';
            btnPomodoro.style.background = 'none';
            btnLongBreak.style.background = 'none';
            btnShortBreak.style.background = 'var(--fourth-color)';
            btnTarefas.style.color = 'var(--fourth-color)';
            btnPomodoro.style.fontWeight = 'normal';
            btnLongBreak.style.fontWeight = 'normal';
            btnShortBreak.style.fontWeight = 'bolder';
            btnPausar.style.color = 'var(--fourth-color)'
            btnPausarF();
        } else if (elemento.classList.contains('btn-pomodoro')) {
            clearInterval(timer);
            segundos = 1500;
            cronometro.innerHTML = '25:00';
            this.body.style.background = 'var(--main-color)';
            mainPomodoro.style.background = 'var(--main-color-menos)';
            btnPomodoro.style.background = 'var(--main-color)';
            btnShortBreak.style.background = 'none';
            btnLongBreak.style.background = 'none';
            btnTarefas.style.color = 'var(--main-color)';
            btnShortBreak.style.fontWeight = 'normal';
            btnLongBreak.style.fontWeight = 'normal';
            btnPomodoro.style.fontWeight = 'bolder';
            btnPausar.style.color = 'var(--main-color)'
            btnPausarF();
        } else if (elemento.classList.contains('btn-long-break')) {
            clearInterval(timer);
            segundos = 900;
            cronometro.innerHTML = '15:00';
            this.body.style.background = 'var(--third-color)';
            mainPomodoro.style.background = 'var(--third-color-menos)';
            btnPomodoro.style.background = 'none';
            btnShortBreak.style.background = 'none';
            btnLongBreak.style.background = 'var(--third-color)';
            btnTarefas.style.color = 'var(--third-color)';
            btnPomodoro.style.fontWeight = 'normal';
            btnShortBreak.style.fontWeight = 'normal';
            btnLongBreak.style.fontWeight = 'bolder';
            btnPausar.style.color = 'var(--third-color)'
            btnPausarF();
            contadorPomo++;
        }
    });
}

pomodoro();