const startButton = document.getElementById("startRace");
const horses = document.querySelectorAll(".horse");
const winnerDisplay = document.getElementById("winner");
const trotSound = document.getElementById("trotSound"); // Obtém o som de trote

startButton.addEventListener("click", () => {
  const userChoice = parseInt(document.getElementById("chosenHorse").value, 10);
  const resultDisplay = document.getElementById("result");

  // Valida a entrada do usuário
  if (isNaN(userChoice) || userChoice < 1 || userChoice > horses.length) {
    resultDisplay.textContent = "Por favor, escolha um número de cavalo válido (1-4)";
    resultDisplay.style.color = "red";
    return;
  }

  // Reinicia o som de trote para começar do início
  trotSound.currentTime = 0;
  trotSound.loop = true; // Garante que o som toque continuamente
  trotSound.play(); // Começa a tocar o som

  winnerDisplay.textContent = ""; // Limpa o vencedor anterior
  winnerDisplay.classList.remove("blink");
  resultDisplay.textContent = ""; // Limpa o resultado anterior
  horses.forEach(horse => (horse.style.left = "0px")); // Reinicia todos os cavalos

  const trackWidth = document.getElementById("track").offsetWidth;
  const horseSpeeds = Array.from(horses).map(() => Math.random() * 3 + 2); // Velocidades aleatórias
  const horsePositions = Array(horses.length).fill(0); // Inicializa posições

  const raceInterval = setInterval(() => {
    horses.forEach((horse, index) => {
      horsePositions[index] += horseSpeeds[index]; // Atualiza posição
      horse.style.left = `${horsePositions[index]}px`;

      if (horsePositions[index] >= trackWidth - 100) {
        clearInterval(raceInterval);

        // Para o som de trote ao final da corrida
        trotSound.pause();
        trotSound.currentTime = 0; // Reseta o som para o início

        const winnerIndex = horsePositions.indexOf(Math.max(...horsePositions));
        winnerDisplay.textContent = `Vencedor: Cavalo ${winnerIndex + 1}!`;
        winnerDisplay.classList.add("blink"); // Faz o letreiro piscar

        // Verifica se o usuário escolheu o cavalo vencedor
        if (userChoice === winnerIndex + 1) {
          resultDisplay.textContent = "Parabéns! Seu cavalo venceu!";
          resultDisplay.style.color = "green";
        } else {
          resultDisplay.textContent = "Desculpe, seu cavalo perdeu. Tente novamente!";
          resultDisplay.style.color = "red";
        }
      }
    });
  }, 20);
});



