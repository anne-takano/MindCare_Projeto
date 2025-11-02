/**
 * Remove acentos de uma string
 */
function removerAcentos(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Calcula similaridade entre duas strings usando Levenshtein distance
 * Retorna um valor entre 0 (sem similaridade) e 1 (idêntico)
 */
function calcularSimilaridade(str1, str2) {
  const s1 = removerAcentos(str1);
  const s2 = removerAcentos(str2);

  // Se uma string contém a outra, maior similaridade
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.8 + 0.2 * (Math.min(s1.length, s2.length) / Math.max(s1.length, s2.length));
  }

  // Calcula distância de Levenshtein
  const len1 = s1.length;
  const len2 = s2.length;
  const matrix = [];

  // Inicializa a matriz
  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  // Preenche a matriz
  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substituição
          matrix[i][j - 1] + 1, // inserção
          matrix[i - 1][j] + 1 // remoção
        );
      }
    }
  }

  const distance = matrix[len2][len1];
  const maxLen = Math.max(len1, len2);
  
  // Retorna similaridade (1 = idêntico, 0 = completamente diferente)
  return 1 - distance / maxLen;
}

/**
 * Busca inteligente em múltiplos campos de um terapeuta
 * @param {Object} terapeuta - Objeto do terapeuta
 * @param {string} termoBusca - Termo de busca do usuário
 * @returns {Object} - { pontuacao: number, camposEncontrados: string[] }
 */
export function buscarNoTerapeuta(terapeuta, termoBusca) {
  if (!termoBusca || termoBusca.trim() === "") {
    return { pontuacao: 1, camposEncontrados: [] };
  }

  const termoNormalizado = removerAcentos(termoBusca.trim());
  
  // Extrai cidade do endereço (última parte após vírgula)
  const cidadeDoEndereco = terapeuta.endereco 
    ? terapeuta.endereco.split(',').pop().trim()
    : "";
  
  const camposParaBuscar = [
    { valor: terapeuta.nome, peso: 3, nome: "nome" },
    { valor: terapeuta.especialidade, peso: 3, nome: "especialidade" },
    { valor: terapeuta.endereco, peso: 2, nome: "endereco" },
    { valor: terapeuta.cidade || cidadeDoEndereco, peso: 1.5, nome: "cidade" },
  ];

  let pontuacaoTotal = 0;
  let pesoTotal = 0;
  const camposEncontrados = [];

  camposParaBuscar.forEach((campo) => {
    if (!campo.valor) return;

    const valorNormalizado = removerAcentos(campo.valor);
    
    // Busca exata (maior peso)
    if (valorNormalizado === termoNormalizado) {
      pontuacaoTotal += campo.peso * 1.0;
      pesoTotal += campo.peso;
      camposEncontrados.push(campo.nome);
    }
    // Busca por substring (peso médio)
    else if (valorNormalizado.includes(termoNormalizado) || termoNormalizado.includes(valorNormalizado)) {
      const similaridade = 0.7;
      pontuacaoTotal += campo.peso * similaridade;
      pesoTotal += campo.peso;
      camposEncontrados.push(campo.nome);
    }
    // Busca por similaridade (peso menor)
    else {
      const similaridade = calcularSimilaridade(termoNormalizado, valorNormalizado);
      if (similaridade > 0.3) {
        // Só conta se a similaridade for razoável
        pontuacaoTotal += campo.peso * similaridade * 0.5;
        pesoTotal += campo.peso * 0.5;
        if (similaridade > 0.6) {
          camposEncontrados.push(campo.nome);
        }
      }
    }
  });

  // Também busca palavras individuais se o termo tiver múltiplas palavras
  const palavras = termoNormalizado.split(/\s+/).filter((p) => p.length > 2);
  if (palavras.length > 1) {
    palavras.forEach((palavra) => {
      camposParaBuscar.forEach((campo) => {
        if (campo.valor && removerAcentos(campo.valor).includes(palavra)) {
          pontuacaoTotal += campo.peso * 0.3;
          pesoTotal += campo.peso * 0.3;
        }
      });
    });
  }

  const pontuacaoFinal = pesoTotal > 0 ? pontuacaoTotal / pesoTotal : 0;
  
  return {
    pontuacao: pontuacaoFinal,
    camposEncontrados: [...new Set(camposEncontrados)],
  };
}

/**
 * Filtra e ordena terapeutas baseado em um termo de busca
 * @param {Array} terapeutas - Lista de terapeutas
 * @param {string} termoBusca - Termo de busca
 * @returns {Array} - Lista de terapeutas filtrados e ordenados por relevância
 */
export function filtrarETOrdenarTerapeutas(terapeutas, termoBusca) {
  if (!termoBusca || termoBusca.trim() === "") {
    return terapeutas;
  }

  const terapeutasComPontuacao = terapeutas.map((terapeuta) => {
    const resultado = buscarNoTerapeuta(terapeuta, termoBusca);
    return {
      ...terapeuta,
      pontuacaoBusca: resultado.pontuacao,
      camposEncontrados: resultado.camposEncontrados,
    };
  });

  // Ordena por pontuação (maior primeiro) e depois pela distância original se existir
  terapeutasComPontuacao.sort((a, b) => {
    if (Math.abs(a.pontuacaoBusca - b.pontuacaoBusca) > 0.1) {
      return b.pontuacaoBusca - a.pontuacaoBusca;
    }
    // Se a pontuação for muito similar, mantém ordenação original (distância)
    if (a.distancia !== null && b.distancia !== null) {
      return a.distancia - b.distancia;
    }
    return 0;
  });

  // Sempre retorna todos os resultados, mesmo os com pontuação baixa
  // Isso garante que sempre haverá resultados para o usuário
  return terapeutasComPontuacao;
}

