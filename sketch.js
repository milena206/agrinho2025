function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
// Variáveis para o personagem
let xPersonagem;
let yPersonagem;
let tamanhoPersonagem = 40;
let velocidadePersonagem = 5;

// Variáveis para as árvores (obstáculos)
let arvores = [];
let numArvores = 10; // Quantidade de árvores no campo

function setup() {
  createCanvas(800, 600); // Cria uma tela de 800x600 pixels
  
  // Posição inicial do personagem no centro inferior da tela
  xPersonagem = width / 2;
  yPersonagem = height - 50;
  
  // Gera as posições aleatórias para as árvores
  for (let i = 0; i < numArvores; i++) {
    arvores.push({
      x: random(50, width - 50),
      y: random(50, height - 150), // Evita que as árvores fiquem muito perto da base
      tamanho: random(50, 100) // Tamanho aleatório para as árvores
    });
  }
}

function draw() {
  desenharCenarioCampo(); // Desenha o fundo e elementos do campo
  desenharArvores();     // Desenha as árvores
  desenharPersonagem();  // Desenha o personagem
  moverPersonagem();     // Lógica de movimento do personagem
  
  // Opcional: Adicionar lógica de colisão aqui, se o personagem não puder passar pelas árvores
}

// --- Funções de Desenho ---

function desenharCenarioCampo() {
  // Céu azul
  background(135, 206, 235);
  
  // Campo verde (parte inferior da tela)
  fill(34, 139, 34); // Verde floresta
  noStroke(); // Sem borda
  rect(0, height / 2, width, height / 2); // Começa na metade da tela para baixo

  // Sol no canto superior direito
  fill(255, 255, 0); // Amarelo
  ellipse(width - 80, 80, 80, 80); // Círculo para o sol
  
  // Nuvens simples
  fill(255, 255, 255, 200); // Branco com transparência
  ellipse(150, 80, 70, 50);
  ellipse(200, 70, 80, 60);
  ellipse(250, 90, 75, 55);
  
  ellipse(500, 120, 60, 40);
  ellipse(550, 110, 70, 50);
}

function desenharArvores() {
  for (let arvore of arvores) {
    // Tronco marrom
    fill(139, 69, 19); // Cor marrom
    rect(arvore.x - arvore.tamanho / 8, arvore.y, arvore.tamanho / 4, arvore.tamanho / 2);
    
    // Folhagem verde (usando elipses para uma forma mais orgânica)
    fill(0, 128, 0); // Verde
    ellipse(arvore.x, arvore.y, arvore.tamanho, arvore.tamanho * 0.8);
    ellipse(arvore.x - arvore.tamanho * 0.2, arvore.y + arvore.tamanho * 0.1, arvore.tamanho * 0.6, arvore.tamanho * 0.5);
    ellipse(arvore.x + arvore.tamanho * 0.2, arvore.y + arvore.tamanho * 0.1, arvore.tamanho * 0.6, arvore.tamanho * 0.5);
  }
}

function desenharPersonagem() {
  fill(255, 0, 0); // Vermelho para o personagem
  noStroke(); // Sem borda para o personagem
  ellipse(xPersonagem, yPersonagem, tamanhoPersonagem, tamanhoPersonagem); // Personagem como um círculo
  
  // Olhos do personagem
  fill(0); // Preto
  ellipse(xPersonagem - 8, yPersonagem - 5, 5, 5);
  ellipse(xPersonagem + 8, yPersonagem - 5, 5, 5);
  
  // Boca do personagem
  arc(xPersonagem, yPersonagem + 5, 15, 10, 0, PI); // Arco para a boca
}

// --- Funções de Lógica ---

function moverPersonagem() {
  // Verifica se as setas do teclado estão pressionadas
  if (keyIsDown(LEFT_ARROW)) {
    xPersonagem -= velocidadePersonagem;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xPersonagem += velocidadePersonagem;
  }
  if (keyIsDown(UP_ARROW)) {
    yPersonagem -= velocidadePersonagem;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yPersonagem += velocidadePersonagem;
  }

  // Garante que o personagem não saia da tela
  xPersonagem = constrain(xPersonagem, tamanhoPersonagem / 2, width - tamanhoPersonagem / 2);
  yPersonagem = constrain(yPersonagem, tamanhoPersonagem / 2, height - tamanhoPersonagem / 2);
}