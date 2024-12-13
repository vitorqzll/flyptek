// Seleciona o canvas no HTML
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do canvas
canvas.width = 800; // Largura do canvas
canvas.height = 600; // Altura do canvas

// Configurações do grid
const blockSize = 40; // Tamanho de cada bloco em pixels
const gridWidth = canvas.width / blockSize; // Número de colunas
const gridHeight = canvas.height / blockSize; // Número de linhas

// Função para desenhar o grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      // Desenha os blocos do grid
      ctx.strokeStyle = '#ddd'; // Cor da linha do grid
      ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
    }
  }
}

// Chama a função para desenhar o grid inicial
drawGrid();

// Array para armazenar os blocos colocados
const blocks = [];

// Função para desenhar um bloco no grid
function drawBlock(x, y, color = '#8B4513') {
  ctx.fillStyle = color; // Cor do bloco (marrom por padrão)
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize); // Desenha o bloco
}

// Função para lidar com cliques no canvas
canvas.addEventListener('click', (event) => {
  // Calcula a posição do clique no grid
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Converte para coordenadas do grid
  const gridX = Math.floor(mouseX / blockSize);
  const gridY = Math.floor(mouseY / blockSize);

  // Adiciona o bloco à lista de blocos
  blocks.push({ x: gridX, y: gridY, color: '#8B4513' });

  // Atualiza o canvas
  render();
});

// Função para renderizar todos os blocos e o grid
function render() {
  drawGrid(); // Desenha o grid

  // Desenha todos os blocos
  blocks.forEach((block) => {
    drawBlock(block.x, block.y, block.color);
  });
}

// Inicializa a renderização
render();

// Função para lidar com o clique do botão direito (apagar blocos)
canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Impede o menu padrão do navegador
  
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    const gridX = Math.floor(mouseX / blockSize);
    const gridY = Math.floor(mouseY / blockSize);
  
    // Remove o bloco clicado do array de blocos
    const index = blocks.findIndex(block => block.x === gridX && block.y === gridY);
    if (index > -1) {
      blocks.splice(index, 1);
      render(); // Redesenha o canvas
    }
  });  

  let currentColor = '#8B4513'; // Cor padrão

// Função para definir a cor atual
function setColor(color) {
  currentColor = color;
}

// Função para desenhar blocos com a cor selecionada
function drawBlock(x, y, color = currentColor) {
  ctx.fillStyle = color;
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

// Atualize o evento de clique para usar a nova cor
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const gridX = Math.floor(mouseX / blockSize);
  const gridY = Math.floor(mouseY / blockSize);

  blocks.push({ x: gridX, y: gridY, color: currentColor });
  render();
});

// Função para limpar todo o grid
function clearGrid() {
    blocks.length = 0; // Remove todos os blocos do array
    render();         // Redesenha o grid vazio
  }  

  // Função para salvar o canvas como imagem PNG
function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'grid.png';
    link.href = canvas.toDataURL(); // Converte o canvas para uma imagem base64
    link.click();
  }  

  const socket = io();

// Envia mensagens ao servidor
function sendMessage() {
  const msgInput = document.getElementById('messageInput');
  const msg = msgInput.value;
  if (msg) {
    socket.emit('message', msg);
    msgInput.value = '';
  }
}

// Recebe mensagens em tempo real
socket.on('message', (msg) => {
  const messageDiv = document.getElementById('messages');
  const message = document.createElement('div');
  message.textContent = msg;
  messageDiv.appendChild(message);
  messageDiv.scrollTop = messageDiv.scrollHeight;
});