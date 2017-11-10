var masterPassword = '1885',
    fourDigitPassword = '',
    passwordHistory = [],
    historyIndex = 0;

function setup() {
  createCanvas(500,500);
  fourDigitPassword = strangerThingsHackLab();
}

function strangerThingsHackLab() {
  for (var i = 0; i <= 9; i++) {
    for (var j = 0; j <= 9; j++) {
      for (var k = 0; k <= 9; k++) {
        for (var l = 0; l <= 9; l++) {
          var _fourDigitPassword = getFourDigitPassword(i,j,k,l);
          passwordHistory.push(_fourDigitPassword);
          if (checkPasswordMatch(_fourDigitPassword))
            return _fourDigitPassword;
        }
      }
    }
  }
}

function prepareStrangeVisual() {
  background(0);
  textSize(100);
  textFont('Courier');
  strokeWeight(5);
  stroke(0, 255, 0);
  fill(0, 255, 0);
}

function checkPasswordMatch(password) {
  return password === masterPassword;
}

function getFourDigitPassword(i, j, k, l) {
  return i + '' + j + '' + k + '' + l;
}

function draw() {
  prepareStrangeVisual();
    
  text(passwordHistory[historyIndex], 125, 250);

  if (historyIndex + 1 < passwordHistory.length)
    historyIndex++;
}
