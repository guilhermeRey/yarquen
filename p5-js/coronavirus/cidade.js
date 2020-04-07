class Cidade {
    constructor() {
      this.populacao = 200;
      this.taxaDeIsolamento = 0;
      this.cidadaos = [];

      this.status = {};
      this.status[SIR.S] = 0;
      this.status[SIR.I] = 0;
      this.status[SIR.R] = 0;

      this.isCorongaGone = false;

      for (let i = 0; i < this.populacao; i++) {
          this.cidadaos.push(new Cidadao(i, this.taxaDeIsolamento));
      }

      // Vamos infectar duas pessoinhas?
      random(this.cidadaos).status = SIR.I;
      random(this.cidadaos).status = SIR.I;
      random(this.cidadaos).status = SIR.I;
      random(this.cidadaos).status = SIR.I;
      random(this.cidadaos).status = SIR.I;
    }

    update() {
        if (this.status[SIR.S] + this.status[SIR.R] === this.populacao) {
            this.isCorongaGone = true;
            return;
        }


        let s = 0, i = 0, r = 0;
        for (let k = 0; k < this.populacao; k++) {
            let cidadao = this.cidadaos[k];
            cidadao.update();
            s += cidadao.status === SIR.S ? 1 : 0;
            i += cidadao.status === SIR.I ? 1 : 0;
            r += cidadao.status === SIR.R ? 1 : 0;
            cidadao.verificaInteracoes(this.cidadaos);
        }

        this.status[SIR.S] = s;
        this.status[SIR.I] = i;
        this.status[SIR.R] = r;
    }

    draw() {
        for (let i = 0; i < this.populacao; i++) {
            this.cidadaos[i].draw();
        }
    }
  }
  