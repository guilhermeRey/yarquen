var b;
var c;
var w = 1280;
var h = 768;
var yarquen_logo;

class SIR {
  static get S() {
    return 0;
  }
  static get I() {
    return 1;
  }
  static get R() {
    return 2;
  }
}

function preLoad() {
  
}

function setup() {
  createCanvas(w, h);
  yarquen_logo = loadImage('yarquen.jpg');
  cidade = new Cidade();
  ministerio = new MinisterioDaSaude(cidade);
} 

function draw() { 
 
  background('#0e0e0e');

  let y_start = 200;

  image(yarquen_logo, 0, 195, 50, 50);

  textSize(32);
  fill('green');
  noStroke();
  text('Coronga Simulator', 60, y_start+30);
  textSize(28);
  fill('yellow');
  text('População: ' + cidade.populacao, 0, y_start+80);
  text('% em casa: ' + cidade.taxaDeIsolamento + '%', 0, y_start+120);
  textSize(28);
  
  fill('white');
  text('Suscetíveis: ' + cidade.status[SIR.S], 0, y_start+180);
  fill('red');
  text('Infectados: ' + cidade.status[SIR.I], 0, y_start+220);
  fill('green');
  text('Recuperados: ' + cidade.status[SIR.R], 0, y_start+260);
  
  cidade.update();
  cidade.draw();

  ministerio.draw();
}


  
  


