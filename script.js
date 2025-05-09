const questions = {
  level1: [
    ["Ու՞մ ոչխարներն են գողացել «Մենք և մեր լեռները» ֆիլմում։", "Ռևազ"],
    ["Ինչպես է ստեղծագործության ռեժիսորի անունը", "Հենրիկ Մալյան"],
    ["Ինչպես է ստեղծագործության հեղինակի անունը", "Հրանտ Մաթևոսյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմը խորհրդային է, թե՞ հայկական։", "Խորհրդային"]
  ],
  level2: [
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է լեյտենանտի դերակատարը", "Սոս Սարգսյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Իշխանի դերակատարը", "Մհեր Մկրտչյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Պավլեի դերակատար�ը", "Խորեն Աբրահամյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Ավագի դերակատար�ը", "Ազատ Շերենց"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Զավենի դերակատարը", "Արմեն Այվազյան"],
    ["«Մենք ենք, մեր սարերը» ֆիլմում ո՞վ է Ռևազի դերակատար�ը", "Արտավազդ Փելեշյան"]
  ],
  level3: [
    ["Ո՞վ է այս խոսքերի հեղինակը «Բա կարծում ես մի մարդով եզ շուռ տալը հե՞շտ է, մի մարդ սկի մի կնիկ էլ չի կարող շուռ տալ, ուր մնաց մի եզ։»", "Իշխան"],
    ["Լրացրու բաց թողնված բառը «... ես եմ, ոչխար եմ պահում, բորդ եմ խուզում, խոտ եմ հնձում...»", "Սովետականը"],
    ["Ո՞վ է այս խոսքերի հեղինակը «Արածդ հունձ չի՞։ Հնձածդ խոտ չի՞։»", "Լեյտենանտ"],
    ["Ո՞վ է այս խոսքերի հեղինակը «Ես քեզանից շա՜տ շնորհակալ եմ։ Թե որ դու ինձ չէիր կանչել ես ըսկի լողացողը չէի։»", "Ավագ"],
    ["Ո՞վ է այս խոսքերի հեղինակը «Սա կեղտ չի, թրիք է։ Կեղտն ու թրիքն էլ չեք տարբերում։»", "Պավլե"]
  ],
  level4: [
    ["Ո՞վ է «Ափսոս էր երեխան» ստեղծագործության հեղինակը", "Վանո Սիրադեղյան"],
    ["Ո՞վ է «Գրա-մեքենա» ստեղծագործության հեղինակը", "Ռաֆայել Նահապետյան"],
    ["Ո՞վ է «Մի մարդու քաղաքը» ստեղծագործության հեղինակը", "Գրիգ"],
    ["Ո՞վ է «Հողի դողը» ստեղծագործության հեղինակը", "Լևոն Խեչոյան"],
    ["Ո՞վ է «Թափանցիկ շշեր» ստեղծագործության հեղինակը", "Արամ Պաչյան"],
    ["Ո՞վ է «Նուղը» ստեղծագործության հեղինակը", "Գրիգ"],
  ]
};

let currentLevel = null;
let currentIndex = 0;
let correctAnswers = 0;
let modalCallback = null;
let level1Completed = false;
let level2Completed = false;
let level3Completed = false;
let level4Completed = false;
let userAnswers = [];
let currentAnswerLength = 0;
let letterInputs = [];

document.addEventListener('DOMContentLoaded', function() {
  setupButtonEffects();
  showScreen('main-menu');
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-button').addEventListener('click', handleModalAction);
  document.getElementById('level1-button').addEventListener('click', startLevel1);
  document.getElementById('level2-button').addEventListener('click', startLevel2);
  document.getElementById('level3-button').addEventListener('click', startLevel3);
  document.getElementById('level4-button').addEventListener('click', startLevel4);
  updateLevelButtons();
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
}

function updateLevelButtons() {
  const level1Button = document.getElementById('level1-button');
  const level2Button = document.getElementById('level2-button');
  const level3Button = document.getElementById('level3-button');
  const level4Button = document.getElementById('level4-button');
  
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
}

function startLevel1() {
  if (level1Completed) return;
  currentLevel = 'level1';
  currentIndex = 0;
  correctAnswers = 0;
  userAnswers = Array(questions.level1.length).fill('');
  loadQuestion();
  showScreen('level1');
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
  loadQuestion();
  showScreen('level1');
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
  loadQuestion();
  showScreen('level1');
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
  loadQuestion();
  showScreen('level1');
}

function loadQuestion() {
  if (currentLevel && currentIndex >= 0 && currentIndex < questions[currentLevel].length) {
    document.getElementById('question-text').textContent = questions[currentLevel][currentIndex][0];
    createLetterInputs(questions[currentLevel][currentIndex][1]);
    restoreAnswer();
    updateNavButtons();
    addAutocompleteButton();
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

function addAutocompleteButton() {
  const existingButton = document.getElementById('autocomplete-btn');
  if (existingButton) return;

  const button = document.createElement('button');
  button.id = 'autocomplete-btn';
  button.className = 'submit-btn';
  button.textContent = 'Ավտոլրացնել';
  button.onclick = autocompleteAnswer;
  document.getElementById('level1').appendChild(button);
}

function autocompleteAnswer() {
  const correctAnswer = questions[currentLevel][currentIndex][1].replace(/\s/g, '');
  letterInputs.forEach((input, index) => {
    if (index < correctAnswer.length) {
      input.value = correctAnswer[index];
    }
  });
  saveCurrentAnswer();
}

function prevQuestion() {
  saveCurrentAnswer();
  currentIndex--;
  loadQuestion();
}

function nextQuestion() {
  saveCurrentAnswer();
  currentIndex++;
  loadQuestion();
}

function saveCurrentAnswer() {
  userAnswers[currentIndex] = letterInputs.map(input => input.value).join('');
  console.log(`Saved answer for question ${currentIndex + 1}: ${userAnswers[currentIndex]}`);
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
    if (currentLevel === 'level1') level1Completed = true;
    else if (currentLevel === 'level2') level2Completed = true;
    else if (currentLevel === 'level3') level3Completed = true;
    else if (currentLevel === 'level4') level4Completed = true;
    
    showModal(`Դուք հաջողությամբ ավարտեցիք ${currentLevel === 'level1' ? 'Մակարդակ 1' : currentLevel === 'level2' ? 'Մակարդակ 2' : currentLevel === 'level3' ? 'Մակարդակ 3' : 'Մակարդակ 4'}-ը։`, () => {
      showScreen('level-selection');
    });
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