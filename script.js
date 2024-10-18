// Seleciona todos os elementos da página com a classe .sensor e armazena-os na constante sensores.
const sensores = document.querySelectorAll('.sensor');

// Para cada sensor, é adicionado um listener para o evento mousedown (clique e segurar com o mouse), 
//que chama a função iniciarArraste quando o sensor é clicado.
sensores.forEach(sensor => {
    sensor.addEventListener('mousedown', iniciarArraste);
});

// Função para iniciar o arraste
function iniciarArraste(e) {
    e.preventDefault(); //Previne comportamentos padrão do navegador, como seleção de texto, durante o arraste.
    const sensor = e.target; //Armazena o elemento que foi clicado (o sensor) na constante sensor.
    const campo = document.getElementById('campo'); //Seleciona o elemento com o id campo, que provavelmente representa o local onde os sensores estão sendo movidos.

    // Posição inicial do mouse
    let posX = e.clientX; //Armazena a posição horizontal do mouse no momento do clique.
    let posY = e.clientY; //Armazena a posição vertical do mouse no momento do clique.

    // Posição inicial do sensor
    let sensorX = sensor.offsetLeft; //Armazena a posição horizontal do sensor em relação ao seu contêiner.
    let sensorY = sensor.offsetTop; //Armazena a posição vertical do sensor em relação ao seu contêiner.

    // Função para mover o sensor
    function moverSensor(e) {
        let dx = e.clientX - posX; //Calcula a diferença horizontal entre a posição atual do mouse e a posição inicial.
        let dy = e.clientY - posY; //Calcula a diferença vertical entre a posição atual do mouse e a posição inicial.
        sensor.style.left = (sensorX + dx) + 'px'; //Atualiza a posição horizontal do sensor no estilo inline com base no deslocamento.
        sensor.style.top = (sensorY + dy) + 'px'; //Atualiza a posição vertical do sensor no estilo inline com base no deslocamento.


        // Atualiza os gráficos com a nova posição
        atualizarDados(sensor); //Chama a função atualizarDados para atualizar os gráficos com base na nova posição do sensor.
    }

    // Função para parar o arraste
    function pararArraste() {
        document.removeEventListener('mousemove', moverSensor); //Remove o listener de mousemove para interromper o movimento do sensor.
        document.removeEventListener('mouseup', pararArraste); //Remove o listener de mouseup para interromper o arraste.
    }

    // Adiciona os listeners para o movimento e parar o arraste
    document.addEventListener('mousemove', moverSensor); //Adiciona o listener de mousemove para mover o sensor enquanto o mouse é arrastado.
    document.addEventListener('mouseup', pararArraste); //Adiciona o listener de mouseup para parar o arraste quando o mouse é solto.
}

// Função para atualizar os dados dos gráficos
function atualizarDados(sensor) {
    const sensorId = sensor.id; //Obtém o id do sensor, caso precise ser utilizado (não é usado no exemplo atual).
    const temp = getRandomInt(15, 35); // Gera uma temperatura aleatória entre 15 e 35 graus Celsius.
    const ph = getRandomFloat(5.5, 7.5); // Gera um valor de pH aleatório entre 5.5 e 7.5.
    const umidade = getRandomInt(30, 90); // Gera um valor de umidade aleatório entre 30% e 90%.

    // Adiciona os dados aos gráficos
    adicionarDadosGrafico(tempChart, temp); //Chama a função para adicionar o valor de temperatura ao gráfico de temperatura.
    adicionarDadosGrafico(phChart, ph); //Chama a função para adicionar o valor de pH ao gráfico de pH.
    adicionarDadosGrafico(humidityChart, umidade); //Chama a função para adicionar o valor de umidade ao gráfico de umidade.
}

// Função para gerar números inteiros aleatórios
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //Gera e retorna um número inteiro aleatório entre min e max (inclusive).
}

// Função para gerar números de ponto flutuante aleatórios
function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2); //Gera e retorna um número de ponto flutuante aleatório entre min e max, com duas casas decimais.
}

// Função para adicionar dados aos gráficos
function adicionarDadosGrafico(grafico, dado) {
    const horaAtual = new Date().toLocaleTimeString(); //Obtém o horário atual no formato de string.
    grafico.data.labels.push(horaAtual); //Adiciona o horário atual aos rótulos do gráfico.
    grafico.data.datasets[0].data.push(dado); //Adiciona o valor (temperatura, pH ou umidade) ao conjunto de dados do gráfico.

    // Limita a quantidade de pontos no gráfico
    if (grafico.data.labels.length > 20) { 
        grafico.data.labels.shift();
        grafico.data.datasets[0].data.shift();
    }

    grafico.update(); //tualiza o gráfico para refletir os novos dados.
}

// Configuração dos Gráficos usando Chart.js
const ctxTemp = document.getElementById('tempChart').getContext('2d');
const ctxPH = document.getElementById('phChart').getContext('2d');
const ctxUmidade = document.getElementById('humidityChart').getContext('2d');

//Configura o gráfico de temperatura usando o Chart.js, com uma linha e dados vazios inicialmente.
const tempChart = new Chart(ctxTemp, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura (°C)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 10,
                suggestedMax: 40
            }
        }
    }
});

//Configura o gráfico de pH de maneira semelhante.
const phChart = new Chart(ctxPH, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'pH do Solo',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 4,
                suggestedMax: 8
            }
        }
    }
});

//Configura o gráfico de umidade com a mesma lógica.
const humidityChart = new Chart(ctxUmidade, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Umidade (%)',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 20,
                suggestedMax: 100
            }
        }
    }
});
