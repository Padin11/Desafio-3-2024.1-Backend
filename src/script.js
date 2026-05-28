// Funções para ajudar a mudar as coisas no HTML
function changeImage(id, url) {
  document.getElementById(id).src = url; // Muda o link da imagem
}
function changeText(id, text) {
  document.getElementById(id).innerText = text; // Muda o texto no ecrã
}

// Variáveis globais para guardar a nossa lista e o número do pokémon atual
let listaPokemons = [];
let indiceAtual = 0;

// Função assíncrona para ir buscar todos os pokémons à API de uma vez
async function carregarListaPokemons() {
    try {
        // Usa o fetch para ir à internet buscar os dados
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292");
        const dados = await resposta.json(); // Transforma a resposta em formato JSON
        listaPokemons = dados.results; // Guarda a lista de resultados na nossa variável
        
        // Depois de guardar a lista, mostra o primeiro pokémon no ecrã
        await mostrarPokemonAtual();
    } catch (erro) {
        // Se der algum erro, mostra na consola
        console.error("Erro ao tentar obter a lista de pokémons:", erro);
    }
}

// Função para procurar a imagem e o nome do pokémon que está no índice atual
async function mostrarPokemonAtual() {
    // Se a lista ainda estiver vazia, sai da função para não dar erro
    if (listaPokemons.length === 0) {
        return; 
    }

    // Obtém o nome do pokémon usando o índice atual
    const nomePokemon = listaPokemons[indiceAtual].name;
    
    try {
        // Faz outro fetch para obter os detalhes específicos deste pokémon
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nomePokemon);
        const dados = await resposta.json();

        // Muda o nome e a imagem no HTML usando as nossas funções de ajuda
        changeText("name", dados.name);
        changeImage("img_sprite_front_default", dados.sprites.front_default);
    } catch (erro) {
        console.error("Erro ao mostrar o pokémon " + nomePokemon + ":", erro);
    }
}

// Função do botão Anterior
async function previousPokemon() {
    // Verifica se a lista tem alguma coisa antes de continuar
    if (listaPokemons.length === 0) {
        return;
    }
    
    // Diminui 1 ao índice para ir para o pokémon anterior
    indiceAtual = indiceAtual - 1;
    
    // Se o índice for menor que zero, vai para o último pokémon da lista
    if (indiceAtual < 0) {
        indiceAtual = listaPokemons.length - 1;
    }

    // Mostra o pokémon com o novo índice
    await mostrarPokemonAtual();
}

// Função do botão Próximo
async function nextPokemon() {
    // Verifica se a lista tem alguma coisa antes de continuar
    if (listaPokemons.length === 0) {
        return;
    }
    
    // Soma 1 ao índice para ir para o próximo pokémon
    indiceAtual = indiceAtual + 1;
    
    // Se o índice passar do tamanho da lista, volta para o primeiro (índice 0)
    if (indiceAtual >= listaPokemons.length) {
        indiceAtual = 0;
    }

    // Mostra o pokémon com o novo índice
    await mostrarPokemonAtual();
}

// Chama a função para começar a carregar tudo quando o código é executado
carregarListaPokemons();
