class Cidadao {
  
    constructor(id, taxaIsolamento) {
      this.id = id;
      this.speed = 2;
      this.size = 14;
      this.status = SIR.S;
      this.dataInfeccao = 0;
      this.tempoRecuperacao = random(2, 14);
      this.estaEmCasa = random(0, 100) < taxaIsolamento;
  
      this.location = createVector(random(width/3, width), random(0, height));
      this.velocity = createVector(this.speed, this.speed);
    }

    verificaInteracoes(outrasPessoas) {
        
        for (let i = 0; i < outrasPessoas.length; i++) {
            if (this.id === i)
                continue;
            
            let dx = outrasPessoas[i].location.x - this.location.x;
            let dy = outrasPessoas[i].location.y - this.location.y;
            let distance = sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            let minDist = this.size + outrasPessoas[i].size;

            if (distance <= minDist) {
                if (outrasPessoas[i].status === SIR.I && this.status === SIR.S) {
                    this.status = SIR.I; // PEGOU CORONGA
                    this.dataInfeccao = floor(millis()/1000);
                }
            }
        }
    }
    
    update() {
        if (this.status === SIR.I) {
            let hoje = floor(millis()/1000);
            if (hoje - this.dataInfeccao >= this.tempoRecuperacao) {
                this.status = SIR.R;
            }
        }

        if (this.estaEmCasa) {
            return;
        }
        
        this.location.add(this.velocity);
        this.velocity.rotate(radians(random(-30, 30)));

        if (this.location.x <= width/3 || this.location.x > width || this.location.y < 0 || this.location.y >= height) {
            this.velocity.y = this.velocity.y * -1;
            this.velocity.x = this.velocity.x * -1;
        }
    }
    
    draw() {
      
      strokeWeight(1);
      if (this.status === SIR.S) {
        stroke(0);
        fill(255, 255, 255);
      }
      else if (this.status === SIR.I) {
        stroke(255,0,0);
        fill(255, 0, 0);
      }
      else if (this.status === SIR.R) {
        stroke(0, 255, 0);
        fill(0, 255, 0);
      }
     
     ellipse(this.location.x, this.location.y, this.size);
    }
    
  }