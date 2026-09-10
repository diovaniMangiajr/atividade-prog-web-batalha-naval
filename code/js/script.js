const TAMANHO_GRID = 10;
const FROTA = [
    { nome: 'Porta-aviões', tamanho: 5 },
    { nome: 'Encouraçado', tamanho: 4 },
    { nome: 'Cruzador', tamanho: 3 },
    { nome: 'Submarino', tamanho: 3 },
    { nome: 'Contratorpedeiro', tamanho: 2 }
];

// Estado lógico do jogo
let tabuleiroJogador = [];
let tabuleiroComputador = [];
let partesNavioJogador = 17;
let partesNavioComputador = 17;
let jogoAtivo = false;
let turnoJogador = true;

// Histórico de pontuação (mantido entre partidas)
let placarJogador = 0;
let placarComputador = 0;

function inicializarDados() {
    tabuleiroJogador = Array(TAMANHO_GRID * TAMANHO_GRID).fill(0);
    tabuleiroComputador = Array(TAMANHO_GRID * TAMANHO_GRID).fill(0);
    partesNavioJogador = 17;
    partesNavioComputador = 17;
    jogoAtivo = true;
    turnoJogador = true;

    posicionarFrota(tabuleiroJogador);
    posicionarFrota(tabuleiroComputador);

    document.getElementById('navios-jogador').textContent = partesNavioJogador;
    document.getElementById('navios-computador').textContent = partesNavioComputador;
    atualizarStatus('Sua vez! Clique no Radar Inimigo para disparar.', 'alert-info');
}

function posicionarFrota(tabuleiro) {
    FROTA.forEach(navio => {
        let posicionado = false;
        while (!posicionado) {
            const horizontal = Math.random() < 0.5;
            const linha = Math.floor(Math.random() * TAMANHO_GRID);
            const coluna = Math.floor(Math.random() * TAMANHO_GRID);

            if (podePosicionar(tabuleiro, linha, coluna, navio.tamanho, horizontal)) {
                for (let i = 0; i < navio.tamanho; i++) {
                    const idx = horizontal 
                        ? linha * TAMANHO_GRID + (coluna + i) 
                        : (linha + i) * TAMANHO_GRID + coluna;
                    tabuleiro[idx] = 'N';
                }
                posicionado = true;
            }
        }
    });
}

function podePosicionar(tabuleiro, linha, coluna, tamanho, horizontal) {
    if (horizontal) {
        if (coluna + tamanho > TAMANHO_GRID) return false;
        for (let i = 0; i < tamanho; i++) {
            if (tabuleiro[linha * TAMANHO_GRID + (coluna + i)] !== 0) return false;
        }
    } else {
        if (linha + tamanho > TAMANHO_GRID) return false;
        for (let i = 0; i < tamanho; i++) {
            if (tabuleiro[(linha + i) * TAMANHO_GRID + coluna] !== 0) return false;
        }
    }
    return true;
}

function renderizarGrids() {
    const tabuleiroJogadorEl = document.getElementById('tabuleiro-jogador');
    const tabuleiroComputadorEl = document.getElementById('tabuleiro-computador');

    tabuleiroJogadorEl.innerHTML = '';
    tabuleiroComputadorEl.innerHTML = '';

    for (let i = 0; i < TAMANHO_GRID * TAMANHO_GRID; i++) {
        // Células do Jogador
        const celulaJogador = document.createElement('div');
        celulaJogador.classList.add('celula');
        celulaJogador.id = `jogador-${i}`;
        if (tabuleiroJogador[i] === 'N') {
            celulaJogador.classList.add('navio-proprio');
        }
        tabuleiroJogadorEl.appendChild(celulaJogador);

        // Células do Computador
        const celulaComputador = document.createElement('div');
        celulaComputador.classList.add('celula');
        celulaComputador.id = `computador-${i}`;
        celulaComputador.onclick = () => dispararJogador(i);
        tabuleiroComputadorEl.appendChild(celulaComputador);
    }
}

function dispararJogador(indice) {
    if (!jogoAtivo || !turnoJogador) return;

    if (tabuleiroComputador[indice] === 'X' || tabuleiroComputador[indice] === 'O') {
        atualizarStatus('Você já atirou nessa coordenada! Escolha outra.', 'alert-warning');
        return;
    }

    const celula = document.getElementById(`computador-${indice}`);

    if (tabuleiroComputador[indice] === 'N') {
        tabuleiroComputador[indice] = 'X';
        celula.classList.add('tiro-acerto');
        celula.textContent = '💥';
        partesNavioComputador--;
        document.getElementById('navios-computador').textContent = partesNavioComputador;

        if (verificarFimDeJogo()) return;
        atualizarStatus('Fogo! Você atingiu uma embarcação inimiga!', 'alert-success');
    } else {
        tabuleiroComputador[indice] = 'O';
        celula.classList.add('tiro-agua');
        celula.textContent = '🌊';
        atualizarStatus('Água! O computador está mirando...', 'alert-info');
    }

    turnoJogador = false;
    setTimeout(dispararComputador, 750);
}

function dispararComputador() {
    if (!jogoAtivo) return;

    const posicoesDisponiveis = [];
    for (let i = 0; i < tabuleiroJogador.length; i++) {
        if (tabuleiroJogador[i] !== 'X' && tabuleiroJogador[i] !== 'O') {
            posicoesDisponiveis.push(i);
        }
    }

    const escolhaAleatoria = Math.floor(Math.random() * posicoesDisponiveis.length);
    const indice = posicoesDisponiveis[escolhaAleatoria];
    const celula = document.getElementById(`jogador-${indice}`);

    if (tabuleiroJogador[indice] === 'N') {
        tabuleiroJogador[indice] = 'X';
        celula.classList.add('tiro-acerto');
        celula.textContent = '💥';
        partesNavioJogador--;
        document.getElementById('navios-jogador').textContent = partesNavioJogador;

        if (verificarFimDeJogo()) return;
        atualizarStatus('Alerta! A máquina acertou sua frota!', 'alert-danger');
    } else {
        tabuleiroJogador[indice] = 'O';
        celula.classList.add('tiro-agua');
        celula.textContent = '🌊';
        atualizarStatus('A máquina errou o disparo! Sua vez de atacar.', 'alert-info');
    }

    turnoJogador = true;
}

// Checa as condições de vitória ou derrota
function verificarFimDeJogo() {
    if (partesNavioComputador === 0) {
        jogoAtivo = false;
        placarJogador++;
        document.getElementById('placar-jogador').textContent = placarJogador;
        atualizarStatus('Vitória gloriosa! Toda a frota inimiga foi destruída!', 'alert-success');
        return true;
    }

    if (partesNavioJogador === 0) {
        jogoAtivo = false;
        placarComputador++;
        document.getElementById('placar-computador').textContent = placarComputador;
        atualizarStatus('Derrota! Sua frota foi completamente aniquilada.', 'alert-danger');
        return true;
    }

    return false;
}

// Atualiza mensagem e classe de alerta do Bootstrap no DOM
function atualizarStatus(mensagem, classeAlerta = 'alert-info') {
    const statusEl = document.getElementById('status');
    const containerAlerta = statusEl.parentElement;

    // Reseta classes de cor do Bootstrap
    containerAlerta.className = `alert ${classeAlerta} py-2`;
    statusEl.textContent = mensagem;
}

// Reinicia o tabuleiro mantendo a pontuação geral
function reiniciarJogo() {
    inicializarDados();
    renderizarGrids();
}

window.onload = reiniciarJogo;