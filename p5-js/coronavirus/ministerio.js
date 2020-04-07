class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class LineChart {
    constructor(color) {
        this.color = color;
        this.points = [];
    }

    add (x, y) {
        if (!(y >= width)) {
            this.points.push(new Point2D(x,y));
        }
    }

    draw() {
        stroke(this.color);
        strokeWeight(3);

        for (let i = 0; i < this.points.length; i++) {
            if (i === this.points.length - 1) {
                continue;                
            }
            line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
        }
    }
}



class MinisterioDaSaude {
    constructor(cidade) {
        this.infected = new LineChart('red');
        this.suscetivel = new LineChart('white');
        this.recovered = new LineChart('green');
        this.cidade = cidade;
        this.janela = 60;

        this.panelWidth = width / 3;
        this.panelHeight = height / 3;
    }

    draw() {
        translate(0, height);
        scale(1, -1);

        let seconds_elapsed = floor(millis() / 1000);
        let x = seconds_elapsed;

        if (!this.cidade.isCorongaGone) {
            this.suscetivel.add(x * this.panelWidth / this.janela, this.cidade.status[SIR.S] * this.panelHeight / this.cidade.populacao);
            this.infected.add(x * this.panelWidth / this.janela, this.cidade.status[SIR.I] * this.panelHeight / this.cidade.populacao);
            this.recovered.add(x * this.panelWidth / this.janela, this.cidade.status[SIR.R] * this.panelHeight / this.cidade.populacao);
        }

        this.suscetivel.draw();
        this.infected.draw();
        this.recovered.draw();
    }

}