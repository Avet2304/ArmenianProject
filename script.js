const questions = {
  level1: [
    ["Ու՞մ ոչխարներն են գողացել «Մենք մեր սարերը» ֆիլմում։", "Ռևազ"],
    ["Ինչպես է «Մենք ենք, մեր սարերը» ֆիլմի ռեժիսորի անունը", "Հենրիկ Մալյան"],
    ["Ինչպես է «Մենք ենք, մեր սարերը» ստեղծագործության հեղինակի անունը", "Հրանտ Մաթևոսյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմը խորհրդային է, թե՞ հայկական։", "Խորհրդային"]
  ],
  level2: [
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է լեյտենանտի դերակատարը", "Սոս Սարգսյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Իշխանի դերակատարը", "Մհեր Մկրտչյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Պավլեի դերակատարը", "Խորեն Աբրահամյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Ավագի դերակատարը", "Ազատ Շերենց"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Զավենի դերակատարը", "Արմեն Այվազյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Ռևազի դերակատարը", "Արտավազդ Փելեշյան"]
  ],
  level3: [
    ["Ո՞վ է այս խոսքերի հեղինակը «Բա կարծում ես մի մարդով եզ շուռ տալը հե՞շտ է, մի մարդ սկի մի կնիկ էլ չի կարող շուռ տալ, ուր մնաց մի եզ։»", "Իշխան"],
    ["Լրացրու բաց թողնված բառը «... ես եմ, ոչխար եմ պահում, բուրդ եմ խուզում, խոտ եմ հնձում...»", "Սովետականը"],
    ["Ո՞վ է այս խոսքերի հեղինակը «Արածդ հունձ չի՞։ Հնձածդ խոտ չի՞։»", "Լեյտենանտ"],
    ["Ո՞վ է այս խոսքերի հեղինակը «Ես քեզանից շա՜տ շնորհակալ եմ։ Թե որ դու ինձ չէիր կանչել ես ըսկի լողացողը չէի։»", "Ավագ"],
    ["Ո՞վ է այս խոսքերի հեղինակը «Սա կեղտ չի, թրիք է։ Կեղտն ու թրիքն էլ չեք տարբերում։»", "Զավեն"]
  ],
  level4: [
    ["Ո՞վ է «Ափսոս էր երեխան» ստեղծագործության հեղինակը", "Վանո Սիրադեղյան"],
    ["Ո՞վ է «Գրա-մեքենա» ստեղծագործության հեղինակը", "Ռաֆայել Նահապետյան"],
    ["Ո՞վ է «Մի մարդու քաղաքը» ստեղծագործության հեղինակը", "Գրիգ"],
    ["Ո՞վ է «Հողի դողը» ստեղծագործության հեղինակը", "Լևոն Խեչոյան"],
    ["Ո՞վ է «Թափանցիկ շշեր» ստեղծագործության հեղինակը", "Արամ Պաչյան"],
    ["Ո՞վ է «Նկուղը» ստեղծագործության հեղինակը", "Գրիգ"]
  ],
  level5: [
    ["«Հողի դողը» ստեղծագործության մեջ ո՞ւմ են բազմիցս փնտրում, բայց չեն կարողանում գտնել", "Սերոբ"],
    ["Ի՞նչ անմիջական սպառնալիքի առաջ կանգնեցին զինվորները գյուղ մտնելիս «Հողի դողը» ստեղծագործության մեջ", "Շների հարձակումներ"],
    ["«Նկուղը» պատմվածքում ո՞վ էր նկուղի «հիմնադիրը և կենտրոնական դեմքը»", "Սամվել"],
    ["«Մի մարդու քաղաքը» Ի՞նչ էր ծերուկի նախկին մասնագիտությունը", "Օպերային երգիչ"],
    ["«Ճակատագրի սև շունը» վեպում ինչ անուն ուներ տաղանդավոր վիրաբույժը, որին մերժեցին ընդունել ակումբում։", "Ռեյհադի"]
  ]
};

let currentLevel = null;
let currentIndex = 0;
let correctAnswers = 0;
let modalCallback = null;
let userAnswers = [];
let currentAnswerLength = 0;
let letterInputs = [];
let timerInterval = null;
let startTime = null;
let gameState = JSON.parse(localStorage.getItem('gameState')) || {
  level1Completed: false,
  level2Completed: false,
  level3Completed: false,
  level4Completed: false,
  level5Completed: false,
  levelTimes: {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0
  },
  currentScreen: 'main-menu',
  currentLevel: null,
  currentIndex: 0,
  userAnswers: [],
  timerStartTime: null
};
let level1Completed = gameState.level1Completed;
let level2Completed = gameState.level2Completed;
let level3Completed = gameState.level3Completed;
let level4Completed = gameState.level4Completed;
let level5Completed = gameState.level5Completed;
let levelTimes = gameState.levelTimes;
currentLevel = gameState.currentLevel;
currentIndex = gameState.currentIndex;
userAnswers = gameState.userAnswers;
startTime = gameState.timerStartTime;

document.addEventListener('DOMContentLoaded', function() {
  setupButtonEffects();
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-button').addEventListener('click', handleModalAction);
  document.getElementById('level1-button').addEventListener('click', startLevel1);
  document.getElementById('level2-button').addEventListener('click', startLevel2);
  document.getElementById('level3-button').addEventListener('click', startLevel3);
  document.getElementById('level4-button').addEventListener('click', startLevel4);
  document.getElementById('level5-button').addEventListener('click', startLevel5);
  document.getElementById('final-results-button').addEventListener('click', () => {
    document.getElementById('final-results-modal').classList.add('hidden');
    showScreen('main-menu');
  });
  updateLevelButtons();
  // Restore the saved screen and state
  if (gameState.currentScreen === 'level1' && currentLevel && questions[currentLevel]) {
    // Initialize userAnswers if not set or incorrect length for the current level
    if (!userAnswers || userAnswers.length !== questions[currentLevel].length) {
      userAnswers = Array(questions[currentLevel].length).fill('');
    }
    // Resume timer if in a level
    startTimer();
    showScreen('level1');
  } else {
    showScreen(gameState.currentScreen || 'main-menu');
  }
});

function setupButtonEffects() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('touchstart', () => btn.classList.add('active-tap'));
    btn.addEventListener('touchend', () => btn.classList.remove('active-tap'));
    btn.addEventListener('touchcancel', () => btn.classList.remove('active-tap'));
    btn.addEventListener('mousedown', () => btn.classList.add('active-tap'));
    btn.addEventListener('mouseup', () => btn.classList.remove('active-tap'));
    btn.addEventListener('mouseleave', () => btn.classList.remove('active-tap'));
  });
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  
  if (id === 'level-selection') {
    updateLevelButtons();
  }
  
  if (id === 'level1') {
    loadQuestion();
  }

  // Save the current screen to gameState
  gameState.currentScreen = id;
  saveGameState();
}

function updateLevelButtons() {
  const level1Button = document.getElementById('level1-button');
  const level2Button = document.getElementById('level2-button');
  const level3Button = document.getElementById('level3-button');
  const level4Button = document.getElementById('level4-button');
  const level5Button = document.getElementById('level5-button');

  // Update Level 1 button
  level1Button.classList.toggle('completed', level1Completed);
  level1Button.disabled = level1Completed;
  level1Button.style.opacity = level1Completed ? '0.7' : '1';
  level1Button.style.cursor = level1Completed ? 'default' : 'pointer';

  // Update Level 2 button
  level2Button.classList.toggle('completed', level2Completed);
  level2Button.disabled = !level1Completed || level2Completed;
  level2Button.style.opacity = level1Completed ? (level2Completed ? '0.7' : '1') : '0.5';
  level2Button.style.cursor = level1Completed && !level2Completed ? 'pointer' : level2Completed ? 'default' : 'not-allowed';

  // Update Level 3 button
  level3Button.classList.toggle('completed', level3Completed);
  level3Button.disabled = !level2Completed || level3Completed;
  level3Button.style.opacity = level2Completed ? (level3Completed ? '0.7' : '1') : '0.5';
  level3Button.style.cursor = level2Completed && !level3Completed ? 'pointer' : level3Completed ? 'default' : 'not-allowed';

  // Update Level 4 button
  level4Button.classList.toggle('completed', level4Completed);
  level4Button.disabled = !level3Completed || level4Completed;
  level4Button.style.opacity = level3Completed ? (level4Completed ? '0.7' : '1') : '0.5';
  level4Button.style.cursor = level3Completed && !level4Completed ? 'pointer' : level4Completed ? 'default' : 'not-allowed';
  
  // Update Level 5 button
  level5Button.classList.toggle('completed', level5Completed);
  level5Button.disabled = !level4Completed || level5Completed;
  level5Button.style.opacity = level4Completed ? (level5Completed ? '0.7' : '1') : '0.5';
  level5Button.style.cursor = level4Completed && !level5Completed ? 'pointer' : level5Completed ? 'default' : 'not-allowed';

  const restartButton = document.getElementById('restart-game-btn');
  if (level1Completed && level2Completed && level3Completed && level4Completed && level5Completed) {
    restartButton.classList.remove('hidden');
  } else {
    restartButton.classList.add('hidden');
  }
}

function startLevel1() {
  if (level1Completed) return;
  currentLevel = 'level1';
  currentIndex = 0;
  correctAnswers = 0;
  userAnswers = Array(questions.level1.length).fill('');
  startTimer();
  loadQuestion();
  showScreen('level1');
  saveGameState();
}

function startLevel2() {
  if (!level1Completed) {
    showModal('Խնդրում ենք նախ ավարտել Մակարդակ 1-ը։');
    return;
  }
  if (level2Completed) return;
  currentLevel = 'level2';
  currentIndex = 0;
  correctAnswers = 0;
  userAnswers = Array(questions.level2.length).fill('');
  startTimer();
  loadQuestion();
  showScreen('level1');
  saveGameState();
}

function startLevel3() {
  if (!level2Completed) {
    showModal('Խնդրում ենք նախ ավարտել Մակարդակ 2-ը։');
    return;
  }
  if (level3Completed) return;
  currentLevel = 'level3';
  currentIndex = 0;
  correctAnswers = 0;
  userAnswers = Array(questions.level3.length).fill('');
  startTimer();
  loadQuestion();
  showScreen('level1');
  saveGameState();
}

function startLevel4() {
  if (!level3Completed) {
    showModal('Խնդրում ենք նախ ավարտել Մակարդակ 3-ը։');
    return;
  }
  if (level4Completed) return;
  currentLevel = 'level4';
  currentIndex = 0;
  correctAnswers = 0;
  userAnswers = Array(questions.level4.length).fill('');
  startTimer();
  loadQuestion();
  showScreen('level1');
  saveGameState();
}

function startLevel5() {
  if (!level4Completed) {
    showModal('Խնդրում ենք նախ ավարտել Մակարդակ 4-ը։');
    return;
  }
  if (level5Completed) return;
  currentLevel = 'level5';
  currentIndex = 0;
  correctAnswers = 0;
  userAnswers = Array(questions.level5.length).fill('');
  startTimer();
  loadQuestion();
  showScreen('level1');
  saveGameState();
}

function loadQuestion() {
  if (currentLevel && currentIndex >= 0 && currentIndex < questions[currentLevel].length) {
    document.getElementById('question-text').textContent = questions[currentLevel][currentIndex][0];
    createLetterInputs(questions[currentLevel][currentIndex][1]);
    restoreAnswer();
    updateNavButtons();
  }
}

function createLetterInputs(answer) {
  const container = document.getElementById('answer-container');
  container.innerHTML = '';
  letterInputs = [];

  const words = answer.split(' ');
  currentAnswerLength = answer.replace(/\s/g, '').length;

  let globalIndex = 0;

  words.forEach((word) => {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'row-container';

    const wrapper = document.createElement('div');
    wrapper.className = 'word-row-wrapper';

    const wordRow = document.createElement('div');
    wordRow.className = 'word-row';

    for (let i = 0; i < word.length; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.className = 'letter-input';
      input.dataset.index = globalIndex;
      input.autocapitalize = 'none'; // Disable auto-capitalization
      input.autocorrect = 'off'; // Disable autocorrect
      input.spellcheck = false; // Disable spellcheck

      input.addEventListener('input', function(e) {
        const index = parseInt(this.dataset.index);
        if (e.target.value && index < currentAnswerLength - 1) {
          setTimeout(() => {
            letterInputs[index + 1].focus();
            letterInputs[index + 1].scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }, 10);
        }
        saveCurrentAnswer(); // Save answer on input
      });

      input.addEventListener('keydown', handleLetterNavigation);
      wordRow.appendChild(input);
      letterInputs.push(input);
      globalIndex++;
    }

    wrapper.appendChild(wordRow);
    rowContainer.appendChild(wrapper);
    container.appendChild(rowContainer);
  });

  if (letterInputs.length > 0) {
    letterInputs[0].focus();
  }
}

function restoreAnswer() {
  const savedAnswer = userAnswers[currentIndex];
  if (savedAnswer) {
    const chars = savedAnswer.split('');
    letterInputs.forEach((input, index) => {
      input.value = chars[index] || '';
    });
  }
}

function handleLetterNavigation(e) {
  const input = e.target;
  const index = parseInt(input.dataset.index);

  if (e.key === 'Backspace' || e.key === 'Delete') {
    if (input.value) {
      input.value = '';
    } else if (index > 0) {
      letterInputs[index - 1].value = '';
      letterInputs[index - 1].focus();
    }
    saveCurrentAnswer(); // Save answer on backspace/delete
    e.preventDefault();
    return;
  }

  if (e.key === 'ArrowLeft' && index > 0) {
    letterInputs[index - 1].focus();
    e.preventDefault();
  } else if (e.key === 'ArrowRight' && index < currentAnswerLength - 1) {
    letterInputs[index + 1].focus();
    e.preventDefault();
  }
}

function prevQuestion() {
  saveCurrentAnswer();
  currentIndex--;
  loadQuestion();
  saveGameState();
}

function nextQuestion() {
  saveCurrentAnswer();
  currentIndex++;
  loadQuestion();
  saveGameState();
}

function saveCurrentAnswer() {
  userAnswers[currentIndex] = letterInputs.map(input => input.value).join('');
  console.log(`Saved answer for question ${currentIndex + 1}: ${userAnswers[currentIndex]}`);
  saveGameState();
}

function updateNavButtons() {
  const prevBtn = document.querySelector('.nav-btn:first-child');
  const nextBtn = document.querySelector('.nav-btn:last-child');
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === questions[currentLevel].length - 1;
}

function submitAnswer() {
  saveCurrentAnswer();

  const cleanUserAnswer = userAnswers[currentIndex].replace(/\s+/g, '').toLowerCase();
  const cleanCorrectAnswer = questions[currentLevel][currentIndex][1].replace(/\s+/g, '').toLowerCase();

  if (cleanUserAnswer.length < cleanCorrectAnswer.length) {
    showModal('Խնդրում ենք լրացնել բոլոր տառերը։');
    return;
  }

  currentIndex++;
  if (currentIndex < questions[currentLevel].length) {
    loadQuestion();
    saveGameState();
  } else {
    checkQuiz();
  }
}

function checkQuiz() {
  correctAnswers = 0;
  for (let i = 0; i < questions[currentLevel].length; i++) {
    const cleanUserAnswer = userAnswers[i].replace(/\s+/g, '').toLowerCase();
    const cleanCorrectAnswer = questions[currentLevel][i][1].replace(/\s+/g, '').toLowerCase();
    if (cleanUserAnswer === cleanCorrectAnswer) {
      correctAnswers++;
    }
  }

  if (correctAnswers === questions[currentLevel].length) {
    const elapsedTime = stopTimer();
    if (currentLevel === 'level1') {
      level1Completed = true;
      levelTimes.level1 = elapsedTime;
    } else if (currentLevel === 'level2') {
      level2Completed = true;
      levelTimes.level2 = elapsedTime;
    } else if (currentLevel === 'level3') {
      level3Completed = true;
      levelTimes.level3 = elapsedTime;
    } else if (currentLevel === 'level4') {
      level4Completed = true;
      levelTimes.level4 = elapsedTime;
    } else if (currentLevel === 'level5') {
      level5Completed = true;
      levelTimes.level5 = elapsedTime;
    }
    saveGameState();
    if (level1Completed && level2Completed && level3Completed && level4Completed && level5Completed) {
      showFinalResults();
    } else {
      showModal(`Դուք հաջողությամբ ավարտեցիք ${
        currentLevel === 'level1' ? 'Մակարդակ 1' : 
        currentLevel === 'level2' ? 'Մակարդակ 2' : 
        currentLevel === 'level3' ? 'Մակարդակ 3' : 
        currentLevel === 'level4' ? 'Մակարդակ 4' : 
        'Մակարդակ 5'
      }-ը։ Ժամանակ: ${formatTime(elapsedTime)}`, () => {
        showScreen('level-selection');
      });
    }
  } else {
    currentIndex = 0;
    showModal(`Դուք պատասխանել եք ${correctAnswers} ${correctAnswers === 1 ? 'հարցին' : 'հարցերին'} ճիշտ ${questions[currentLevel].length}-ից։ Վերանայեք Ձեր պատասխանները։`, () => {
      loadQuestion();
    });
  }
}

function showModal(message, callback = null) {
  modalCallback = callback;
  document.getElementById('modal-message').textContent = message;
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('modal-button').focus();
}

function handleModalAction() {
  document.getElementById('modal-overlay').classList.add('hidden');
  if (modalCallback && typeof modalCallback === 'function') {
    modalCallback();
  }
  modalCallback = null;
}

function startTimer() {
  // Clear any existing timer to prevent multiple intervals
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  // Use saved startTime if valid, otherwise set new startTime
  if (!startTime || isNaN(startTime) || startTime <= 0) {
    startTime = Date.now();
    console.log('Starting new timer with startTime:', startTime);
  } else {
    console.log('Resuming timer with startTime:', startTime);
  }
  // Start the timer interval
  timerInterval = setInterval(updateTimer, 1000);
  // Immediately update the display to avoid 1-second delay
  updateTimer();
  saveGameState();
}

function updateTimer() {
  if (!startTime) {
    console.warn('updateTimer called with no startTime, resetting timer');
    startTime = Date.now();
  }
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const seconds = (elapsed % 60).toString().padStart(2, '0');
  document.getElementById('timer-display').textContent = `Ժամանակ: ${minutes}:${seconds}`;
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    console.log('Timer stopped');
  }
  const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  startTime = null; // Clear startTime
  gameState.timerStartTime = null; // Clear from gameState
  saveGameState();
  return elapsed;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function showFinalResults() {
  const totalSeconds = Object.values(levelTimes).reduce((sum, time) => sum + time, 0);
  const message = `
    Դուք ավարտեցիք բոլոր մակարդակները:<br>
    Մակարդակ 1: ${formatTime(levelTimes.level1)}<br>
    Մակարդակ 2: ${formatTime(levelTimes.level2)}<br>
    Մակարդակ 3: ${formatTime(levelTimes.level3)}<br>
    Մակարդակ 4: ${formatTime(levelTimes.level4)}<br>
    Մակարդակ 5: ${formatTime(levelTimes.level5)}<br>
    Ընդհանուր ժամանակ: ${formatTime(totalSeconds)}
  `;
  document.getElementById('final-results-message').innerHTML = message;
  document.getElementById('final-results-modal').classList.remove('hidden');
  document.getElementById('final-results-button').focus();
}

function saveGameState() {
  gameState = {
    level1Completed,
    level2Completed,
    level3Completed,
    level4Completed,
    level5Completed,
    levelTimes,
    currentScreen: gameState.currentScreen || 'main-menu',
    currentLevel,
    currentIndex,
    userAnswers,
    timerStartTime: startTime
  };
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

function resetGame() {
  localStorage.removeItem('gameState');
  level1Completed = false;
  level2Completed = false;
  level3Completed = false;
  level4Completed = false;
  level5Completed = false;
  levelTimes = {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0
  };
  currentLevel = null;
  currentIndex = 0;
  userAnswers = [];
  startTime = null;
  gameState = {
    level1Completed,
    level2Completed,
    level3Completed,
    level4Completed,
    level5Completed,
    levelTimes,
    currentScreen: 'main-menu',
    currentLevel,
    currentIndex,
    userAnswers,
    timerStartTime: null
  };
  saveGameState();
  updateLevelButtons();
  showScreen('main-menu');
} 
