/* Trilha */
const trilha = document.getElementById("trilha");
const musica = document.getElementById("musica");
const botaoDisco = document.getElementById("botao-disco");
const iconePlay = document.getElementById("icone-play");
const statusTrilha = document.getElementById("status-trilha");
const volume = document.getElementById("volume");

const coresNotas = ["#E9B44C", "#E8394F", "#FAFAFA"];
const simbolosNotas = ["♪", "♫", "♬"];

let analisador = null;
let dadosSom = null;
let jaComecou = false;
let ultimaNota = 0;

trilha.volume = volume.value / 100;

function atualizarPlayer() {
    const tocando = !trilha.paused;
    musica.classList.toggle("tocando", tocando);
    iconePlay.className = tocando ? "fa-solid fa-pause icone-play" : "fa-solid fa-play icone-play";
    statusTrilha.textContent = tocando ? "Tocando" : "Pausada";
}

function ligarAnalisador() {
    if (analisador || !location.protocol.startsWith("http")) return;
    const contexto = new AudioContext();
    const fonte = contexto.createMediaElementSource(trilha);
    analisador = contexto.createAnalyser();
    analisador.fftSize = 256;
    dadosSom = new Uint8Array(analisador.frequencyBinCount);
    fonte.connect(analisador);
    analisador.connect(contexto.destination);
    contexto.resume();
}

function tocar() {
    jaComecou = true;
    ligarAnalisador();
    trilha.play().catch(() => {});
}

function comecarNoPrimeiroToque(evento) {
    if (jaComecou || botaoDisco.contains(evento.target)) return;
    tocar();
}

botaoDisco.addEventListener("click", () => {
    if (trilha.paused) {
        tocar();
    } else {
        trilha.pause();
    }
});

volume.addEventListener("input", () => {
    trilha.volume = volume.value / 100;
});

trilha.addEventListener("play", atualizarPlayer);
trilha.addEventListener("pause", atualizarPlayer);

trilha.play().then(() => {
    jaComecou = true;
}).catch(() => {
    statusTrilha.textContent = "Clique na página para ouvir";
    document.addEventListener("pointerdown", comecarNoPrimeiroToque);
    document.addEventListener("keydown", comecarNoPrimeiroToque);
});

function nivelDoSom() {
    if (!analisador) return 0.5 * trilha.volume;
    analisador.getByteFrequencyData(dadosSom);
    let soma = 0;
    for (const valor of dadosSom) soma += valor;
    return Math.min(1, (soma / dadosSom.length / 255) * 2.5);
}

function soltarNota(nivel) {
    const nota = document.createElement("span");
    nota.className = "nota";
    nota.textContent = simbolosNotas[Math.floor(Math.random() * simbolosNotas.length)];
    nota.style.color = coresNotas[Math.floor(Math.random() * coresNotas.length)];
    nota.style.left = 6 + Math.random() * 30 + "px";
    nota.style.fontSize = 14 + nivel * 14 + "px";
    nota.addEventListener("animationend", () => nota.remove());
    musica.appendChild(nota);
}

function animarNotas(tempo) {
    if (!trilha.paused) {
        const nivel = nivelDoSom();
        if (nivel > 0.02 && tempo - ultimaNota > 1200 - nivel * 900) {
            soltarNota(nivel);
            ultimaNota = tempo;
        }
    }
    requestAnimationFrame(animarNotas);
}

requestAnimationFrame(animarNotas);

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
        linksMenu.forEach(link => link.classList.toggle("ativo", link.getAttribute("href") === "#" + id));
        if (paginaRolou) history.replaceState(null, "", "#" + id);
    });
}, { rootMargin: "-45% 0px -50% 0px" });

document.querySelectorAll("main section").forEach(secao => observador.observe(secao));

/* Contato */
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
        if (dados.success !== "true" && dados.success !== true) throw new Error(dados.message);
        avisoEnvio.textContent = "Mensagem enviada! Logo eu respondo.";
        formulario.reset();
    } catch (erro) {
        avisoEnvio.textContent = "Não deu para enviar agora. Tente pelo WhatsApp ou pelo e-mail.";
    }
});

/* Barra lateral */
const botaoRecolher = document.getElementById("recolher-menu");

if (localStorage.getItem("menuRecolhido") === "sim") {
    document.body.classList.add("recolhida");
}

botaoRecolher.addEventListener("click", () => {
    document.body.classList.toggle("recolhida");
    const recolhida = document.body.classList.contains("recolhida");
    localStorage.setItem("menuRecolhido", recolhida ? "sim" : "nao");
});
