// ========== DADOS DO JOGO ==========
let jogador = {
  xp: 0,
  skinAtiva: 'basica',
  skins: {
    basica: { nome: 'Básica', emoji: '👤', preco: 0, comprada: true },
    ninja: { nome: 'Ninja', emoji: '🥷', preco: 500, comprada: false },
    mago: { nome: 'Mago', emoji: '🧙', preco: 750, comprada: false },
    astronauta: { nome: 'Astronauta', emoji: '👨‍🚀', preco: 1000, comprada: false },
    pirata: { nome: 'Pirata', emoji: '🏴‍☠️', preco: 600, comprada: false },
    super: { nome: 'Super', emoji: '🦸', preco: 1200, comprada: false }
  },
  historico: []
};

// Dados de exemplo das atividades
const atividades = {
  quiz: {
    xp: 50,
    perguntas: [
      {
        pergunta: 'Qual é a capital da França?',
        opcoes: ['Paris', 'Lyon', 'Marseille', 'Nice'],
        resposta: 0
      },
      {
        pergunta: 'Qual é o maior planeta do sistema solar?',
        opcoes: ['Saturno', 'Júpiter', 'Netuno', 'Urano'],
        resposta: 1
      },
      {
        pergunta: 'Em que ano terminou a Segunda Guerra Mundial?',
        opcoes: ['1943', '1944', '1945', '1946'],
        resposta: 2
      }
    ]
  },
  estudar: {
    xp: 75,
    topicos: [
      { titulo: 'Matemática', desc: 'Estude conceitos de álgebra e geometria' },
      { titulo: 'História', desc: 'Aprenda sobre eventos históricos importantes' },
      { titulo: 'Ciências', desc: 'Explore a física, química e biologia' },
      { titulo: 'Programação', desc: 'Desenvolva habilidades de coding' }
    ]
  },
  ler: {
    xp: 60,
    artigos: [
      { titulo: 'O Futuro da IA', texto: 'A inteligência artificial está transformando o mundo. Ela está sendo usada em diversos campos como medicina, educação e tecnologia. O futuro promete ainda mais inovações e desafios éticos a serem considerados.' },
      { titulo: 'Sustentabilidade', texto: 'A sustentabilidade é fundamental para o futuro do planeta. Precisamos adotar práticas ecológicas e reduzir nosso impacto ambiental. Cada ação conta na luta contra as mudanças climáticas.' },
      { titulo: 'Produtividade', texto: 'Ser produtivo não é apenas trabalhar mais, mas trabalhar melhor. Organização, foco e descanso adequado são essenciais para manter a produtividade em longo prazo.' }
    ]
  },
  exercitar: {
    xp: 80,
    exercicios: [
      { titulo: 'Corrida', desc: 'Corra por 30 minutos no seu ritmo' },
      { titulo: 'Musculação', desc: 'Faça 3 séries de 10 repetições' },
      { titulo: 'Yoga', desc: 'Pratique yoga por 20 minutos' },
      { titulo: 'Natação', desc: 'Nade 10 voltas na piscina' }
    ]
  }
};

let atividadeAtual = null;
let perguntaAtual = 0;
let respostasCorretas = 0;

// ========== FUNÇÕES PRINCIPAIS ==========

function abrirTela(telaNome) {
  document.querySelectorAll('.screen').forEach(tela => tela.classList.remove('active'));
  document.getElementById(telaNome).classList.add('active');

  if (telaNome === 'home') {
    atualizarHome();
  } else if (telaNome === 'loja') {
    atualizarLoja();
  } else if (telaNome === 'historico') {
    atualizarHistorico();
  }
}

function atualizarHome() {
  document.getElementById('xpDisplay').textContent = jogador.xp;
  document.getElementById('playerAvatar').textContent = jogador.skins[jogador.skinAtiva].emoji;
  
  const xpMax = 500;
  const xpAtual = jogador.xp % xpMax;
  const percentual = (xpAtual / xpMax) * 100;
  document.getElementById('xpFill').style.width = percentual + '%';
}

function iniciarAtividade(tipo) {
  atividadeAtual = tipo;
  
  if (tipo === 'quiz') {
    perguntaAtual = 0;
    respostasCorretas = 0;
    mostrarProximaPergunta();
    abrirTela('quiz');
  } else if (tipo === 'estudar') {
    const topico = atividades.estudar.topicos[Math.floor(Math.random() * atividades.estudar.topicos.length)];
    document.getElementById('topicoTitulo').textContent = topico.titulo;
    document.getElementById('topicoDesc').textContent = topico.desc;
    abrirTela('estudar');
  } else if (tipo === 'ler') {
    const artigo = atividades.ler.artigos[Math.floor(Math.random() * atividades.ler.artigos.length)];
    document.getElementById('artigoTitulo').textContent = artigo.titulo;
    document.getElementById('artigoTexto').textContent = artigo.texto;
    abrirTela('ler');
  } else if (tipo === 'exercitar') {
    const exercicio = atividades.exercitar.exercicios[Math.floor(Math.random() * atividades.exercitar.exercicios.length)];
    document.getElementById('exercicioTitulo').textContent = exercicio.titulo;
    document.getElementById('exercicioDesc').textContent = exercicio.desc;
    abrirTela('exercitar');
  }
}

// ========== QUIZ ==========

function mostrarProximaPergunta() {
  if (perguntaAtual >= atividades.quiz.perguntas.length) {
    finalizarQuiz();
    return;
  }

  const pergunta = atividades.quiz.perguntas[perguntaAtual];
  document.getElementById('perguntaNum').textContent = perguntaAtual + 1;
  document.getElementById('pergunta').textContent = pergunta.pergunta;

  const opcoesDiv = document.getElementById('opcoes');
  opcoesDiv.innerHTML = '';

  pergunta.opcoes.forEach((opcao, index) => {
    const botao = document.createElement('div');
    botao.className = 'opcao';
    botao.textContent = opcao;
    botao.onclick = () => responderPergunta(index, pergunta.resposta);
    opcoesDiv.appendChild(botao);
  });

  const progresso = ((perguntaAtual + 1) / atividades.quiz.perguntas.length) * 100;
  document.getElementById('progressFill').style.width = progresso + '%';
}

function responderPergunta(respostaEscolhida, respostaCorreta) {
  const opcoes = document.querySelectorAll('.opcao');
  opcoes.forEach(o => o.style.pointerEvents = 'none');

  if (respostaEscolhida === respostaCorreta) {
    opcoes[respostaEscolhida].classList.add('correta');
    respostasCorretas++;
  } else {
    opcoes[respostaEscolhida].classList.add('incorreta');
    opcoes[respostaCorreta].classList.add('correta');
  }

  setTimeout(() => {
    perguntaAtual++;
    mostrarProximaPergunta();
  }, 1500);
}

function finalizarQuiz() {
  ganharXP(atividades.quiz.xp);
  adicionarHistorico('Quiz', atividades.quiz.xp);
  document.getElementById('quizContent').style.display = 'none';
  document.getElementById('quizResultado').style.display = 'flex';
}

// ========== OUTRAS ATIVIDADES ==========

function confirmarEstudo() {
  const tempo = parseInt(document.getElementById('tempoEstudo').value);
  if (tempo > 0) {
    ganharXP(atividades.estudar.xp);
    adicionarHistorico('Estudar', atividades.estudar.xp);
    finalizarAtividade();
  }
}

function confirmarLeitura() {
  ganharXP(atividades.ler.xp);
  adicionarHistorico('Ler', atividades.ler.xp);
  finalizarAtividade();
}

function confirmarExercicio() {
  const series = parseInt(document.getElementById('seriesCompletas').value);
  if (series > 0) {
    ganharXP(atividades.exercitar.xp);
    adicionarHistorico('Exercitar', atividades.exercitar.xp);
    finalizarAtividade();
  }
}

function finalizarAtividade() {
  perguntaAtual = 0;
  respostasCorretas = 0;
  document.getElementById('quizContent').style.display = 'block';
  document.getElementById('quizResultado').style.display = 'none';
  abrirTela('atividades');
}

// ========== SISTEMA DE XP ==========

function ganharXP(quantidade) {
  jogador.xp += quantidade;
  atualizarHome();
}

function adicionarHistorico(atividade, xp) {
  const agora = new Date();
  const hora = agora.getHours().toString().padStart(2, '0') + ':' + agora.getMinutes().toString().padStart(2, '0');
  
  jogador.historico.unshift({
    atividade: atividade,
    xp: xp,
    data: agora.toLocaleDateString('pt-BR'),
    hora: hora
  });

  if (jogador.historico.length > 50) {
    jogador.historico.pop();
  }
}

// ========== LOJA DE SKINS ==========

function atualizarLoja() {
  const lojaContainer = document.getElementById('lojaContainer');
  lojaContainer.innerHTML = '';
  document.getElementById('xpSaldo').textContent = jogador.xp;

  Object.entries(jogador.skins).forEach(([chave, skin]) => {
    const card = document.createElement('div');
    card.className = 'skin-card';

    if (jogador.skinAtiva === chave) {
      card.classList.add('ativa');
    }
    if (skin.comprada) {
      card.classList.add('comprada');
    }

    let conteudo = `
      <div class="skin-avatar">${skin.emoji}</div>
      <div class="skin-nome">${skin.nome}</div>
    `;

    if (skin.comprada) {
      conteudo += `<div class="skin-status">✓ Comprada</div>`;
      if (jogador.skinAtiva !== chave) {
        conteudo += `<button class="btn-comprar" onclick="ativarSkin('${chave}')">Usar</button>`;
      } else {
        conteudo += `<div class="skin-status">Ativa</div>`;
      }
    } else {
      conteudo += `<div class="skin-preco">${skin.preco} XP</div>`;
      conteudo += `<button class="btn-comprar" onclick="comprarSkin('${chave}')" ${jogador.xp < skin.preco ? 'disabled' : ''}>Comprar</button>`;
    }

    card.innerHTML = conteudo;
    lojaContainer.appendChild(card);
  });
}

function comprarSkin(chave) {
  const skin = jogador.skins[chave];
  
  if (jogador.xp >= skin.preco) {
    jogador.xp -= skin.preco;
    skin.comprada = true;
    jogador.skinAtiva = chave;
    adicionarHistorico(`Comprou skin ${skin.nome}`, -skin.preco);
    atualizarLoja();
    atualizarHome();
  } else {
    alert('XP insuficiente!');
  }
}

function ativarSkin(chave) {
  jogador.skinAtiva = chave;
  atualizarLoja();
  atualizarHome();
}

// ========== HISTÓRICO ==========

function atualizarHistorico() {
  const historicoLista = document.getElementById('historicoLista');
  
  if (jogador.historico.length === 0) {
    historicoLista.innerHTML = '<p class="vazio">Nenhuma atividade realizada ainda</p>';
    return;
  }

  historicoLista.innerHTML = '';

  jogador.historico.forEach(item => {
    const div = document.createElement('div');
    div.className = 'historico-item';
    
    const xpClass = item.xp > 0 ? 'historico-item-xp' : '';
    const xpTexto = item.xp > 0 ? `+${item.xp} XP` : `${item.xp} XP`;

    div.innerHTML = `
      <div class="historico-item-titulo">${item.atividade}</div>
      <div class="${xpClass}">${xpTexto}</div>
      <div class="historico-item-data">${item.data} às ${item.hora}</div>
    `;

    historicoLista.appendChild(div);
  });
}

// ========== INICIALIZAÇÃO ==========

window.addEventListener('DOMContentLoaded', function() {
  console.log('🎮 LifeXP Game iniciado!');
  atualizarHome();
  
  // Carregar dados do localStorage se existirem
  const dadosSalvos = localStorage.getItem('lifexpGame');
  if (dadosSalvos) {
    jogador = JSON.parse(dadosSalvos);
    atualizarHome();
  }
});

// Salvar dados a cada mudança
window.addEventListener('beforeunload', function() {
  localStorage.setItem('lifexpGame', JSON.stringify(jogador));
});

// Salvar dados periodicamente
setInterval(() => {
  localStorage.setItem('lifexpGame', JSON.stringify(jogador));
}, 5000);
