const canvas = document.getElementById('matrixBackground');
const ctx = canvas.getContext('2d');

// Define o tamanho inicial do canvas para cobrir a janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres usados na Matrix (alfabeto japonês/katakana)
const matrixChars = "アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const chars = matrixChars.split('');

// Tamanho da fonte e cálculo de colunas
const fontSize = 16;
const columns = canvas.width / fontSize;

// Array para controlar a posição y de cada coluna
// Cada elemento representa a posição y (em termos de linhas de texto) para uma coluna
const drops = [];

// Inicializa o array 'drops' com a posição inicial (topo) para cada coluna
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Função principal de desenho e animação
function draw() {
    // Fundo semi-transparente para o efeito de rastro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41'; // Cor verde Matrix
    ctx.font = fontSize + 'px monospace';

    // Loop por todas as colunas
    for (let i = 0; i < drops.length; i++) {
        // Seleciona um caractere aleatório
        const text = chars[Math.floor(Math.random() * chars.length)];

        // Desenha o caractere na posição (x, y)
        // x = índice da coluna * tamanho da fonte
        // y = posição vertical atual * tamanho da fonte
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia a "gota" (coluna) se ela atingir o fundo, com uma chance aleatória (para efeito de chuva)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Incrementa a posição y da "gota"
        drops[i]++;
    }
}

// Animação contínua (loop principal)
setInterval(draw, 33); // Ajuste o valor para controlar a velocidade (menor = mais rápido)

// Lida com redimensionamento da janela para manter o efeito responsivo
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalcula colunas após redimensionar
    const columns = canvas.width / fontSize;
    drops.length = 0; // Limpa o array e recria
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
});
