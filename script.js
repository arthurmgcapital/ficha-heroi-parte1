/* Trilha */
const trilha = document.getElementById("trilha");
const musica = document.getElementById("musica");
const botaoDisco = document.getElementById("botao-disco");
const iconePlay = document.getElementById("icone-play");
const statusTrilha = document.getElementById("status-trilha");
const volume = document.getElementById("volume");

const notas = ["♪", "♫", "♬"];
const cores = ["#E9B44C", "#E8394F", "#FAFAFA"];

trilha.volume = volume.value / 100;

function atualizarPlayer() {
    if (trilha.paused) {
        musica.classList.remove("tocando");
        iconePlay.className = "fa-solid fa-play icone-play";
        statusTrilha.textContent = "Pausada";
    } else {
        musica.classList.add("tocando");
        iconePlay.className = "fa-solid fa-pause icone-play";
        statusTrilha.textContent = "Tocando";
    }
}

function tocar() {
    trilha.play();
}

botaoDisco.addEventListener("click", () => {
    if (trilha.paused) {
        trilha.play();
    } else {
        trilha.pause();
    }
});

volume.addEventListener("input", () => {
    trilha.volume = volume.value / 100;
});

trilha.addEventListener("play", atualizarPlayer);
trilha.addEventListener("pause", atualizarPlayer);

trilha.play().catch(() => {
    statusTrilha.textContent = "Clique na página para ouvir";
    document.addEventListener("click", tocar, { once: true });
});

function soltarNota() {
    if (trilha.paused || trilha.volume === 0) return;

    const nota = document.createElement("span");
    nota.className = "nota";
    nota.textContent = notas[Math.floor(Math.random() * notas.length)];
    nota.style.color = cores[Math.floor(Math.random() * cores.length)];
    nota.style.left = 6 + Math.random() * 30 + "px";
    nota.style.fontSize = 14 + trilha.volume * 14 + "px";
    nota.addEventListener("animationend", () => nota.remove());
    musica.appendChild(nota);
}

setInterval(soltarNota, 600);

/* Menu e URL de cada seção */
const menuCheck = document.getElementById("menu-check");
const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach(link => {
    link.addEventListener("click", () => {
        menuCheck.checked = false;
    });
});

let paginaRolou = false;
window.addEventListener("scroll", () => {
    paginaRolou = true;
}, { once: true });

const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        if (!entrada.isIntersecting) return;

        const id = entrada.target.id;
        linksMenu.forEach(link => {
            link.classList.toggle("ativo", link.getAttribute("href") === "#" + id);
        });

        if (paginaRolou) {
            history.replaceState(null, "", "#" + id);
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

document.querySelectorAll("main section").forEach(secao => observador.observe(secao));

/* Janela de contato */
const janela = document.getElementById("janela-contato");
const formulario = document.getElementById("formulario");
const avisoEnvio = document.getElementById("aviso-envio");

document.querySelectorAll(".abrir-contato").forEach(botao => {
    botao.addEventListener("click", () => janela.showModal());
});

document.getElementById("fechar-contato").addEventListener("click", () => janela.close());

formulario.addEventListener("submit", async evento => {
    evento.preventDefault();
    avisoEnvio.textContent = "Enviando...";

    try {
        const resposta = await fetch("https://formsubmit.co/ajax/syx.company00@gmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
        });
        const dados = await resposta.json();

        if (dados.success === "true" || dados.success === true) {
            avisoEnvio.textContent = "Mensagem enviada! Logo eu respondo.";
            formulario.reset();
        } else {
            avisoEnvio.textContent = "Não deu para enviar agora. Tente pelo WhatsApp ou pelo e-mail.";
        }
    } catch (erro) {
        avisoEnvio.textContent = "Sem conexão. Tente pelo WhatsApp ou pelo e-mail.";
    }
});

/* Barra lateral que encolhe */
const botaoRecolher = document.getElementById("recolher-menu");

if (localStorage.getItem("menuRecolhido") === "sim") {
    document.body.classList.add("recolhida");
}

botaoRecolher.addEventListener("click", () => {
    document.body.classList.toggle("recolhida");

    if (document.body.classList.contains("recolhida")) {
        localStorage.setItem("menuRecolhido", "sim");
    } else {
        localStorage.setItem("menuRecolhido", "nao");
    }
});
