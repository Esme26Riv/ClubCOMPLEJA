// --- LÓGICA DEL TEMPORIZADOR ---
let tiempoRestante = 180;
let tiempoInicial = 180;
let temporizadorId = null;

function actualizarReloj() {
    const min = Math.floor(tiempoRestante / 60);
    const seg = tiempoRestante % 60;
    document.getElementById('reloj').innerText =
        `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}

function fijarTiempo(segundos) {
    pausarTemporizador();
    tiempoInicial = segundos;
    tiempoRestante = segundos;
    actualizarReloj();
}

function iniciarTemporizador() {
    if (temporizadorId) return;
    temporizadorId = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            actualizarReloj();
        } else {
            pausarTemporizador();
            alert("¡Tu infusión está lista!");
        }
    }, 1000);
}

function pausarTemporizador() {
    clearInterval(temporizadorId);
    temporizadorId = null;
}

function reiniciarTemporizador() {
    pausarTemporizador();
    tiempoRestante = tiempoInicial;
    actualizarReloj();
}

// --- LÓGICA DE LA CALCULADORA ---
function calcularDosis() {
    const tazas = parseInt(document.getElementById('tazas').value) || 1;
    const gramos = (tazas * 2.5).toFixed(1);
    const ml = tazas * 250;

    document.getElementById('res-hojas').innerText = `${gramos} g`;
    document.getElementById('res-agua').innerText = `${ml} ml`;
}

// --- LÓGICA DEL CATÁLOGO Y FILTROS ---
const catalogo = [
    { nombre: "Té Matcha", cat: "energizante", desc: "Té verde molido de alta concentración.", temp: "80°C" },
    { nombre: "Earl Grey", cat: "energizante", desc: "Té negro con delicadas notas de bergamota.", temp: "95°C" },
    { nombre: "Manzanilla", cat: "relajante", desc: "Infusión herbal aromática para inducir el descanso.", temp: "100°C" },
    { nombre: "Jengibre y Limón", cat: "digestivo", desc: "Mezcla picante y cítrica excelente para la digestión.", temp: "90°C" },
    { nombre: "Té Verde Sencha", cat: "energizante", desc: "Té verde japonés en hebras, fresco y vegetal.", temp: "75°C" },
    { nombre: "Menta Piperita", cat: "digestivo", desc: "Refrescante y calmante para el malestar estomacal.", temp: "100°C" }
];

function renderizarTes(lista) {
    const contenedor = document.getElementById('contenedor-tes');
    contenedor.innerHTML = lista.map(item => `
        <div class="tea-card">
          <h3>${item.nombre}</h3>
          <p>${item.desc}</p>
          <span class="tag">${item.cat} • ${item.temp}</span>
        </div>
      `).join('');
}

function filtrar(categoria, elemento) {
    const botones = document.querySelectorAll('.filter-btn');
    botones.forEach(b => b.classList.remove('activo'));
    elemento.classList.add('activo');

    if (categoria === 'todos') {
        renderizarTes(catalogo);
    } else {
        const filtrados = catalogo.filter(t => t.cat === categoria);
        renderizarTes(filtrados);
    }
}

// Carga inicial
renderizarTes(catalogo);