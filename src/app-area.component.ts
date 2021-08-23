// @ts-ignore
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-area",
  template: `
    <div id="statusArea" className="status">
      Next player: <span>{{ status }}</span>
    </div>
    <div id="winnerArea" className="winner">
      Winner: <span>{{ vencedor }}</span>
    </div>
    <button (click)="novoJogo()">Reset</button>
    <section>
      <div class="row" *ngFor="let row of [0, 1, 2]">
        <app-square
          *ngFor="let col of [0, 1, 2]"
          [status]="squares[col + row * 3]"
          (click)="pegarMovimento(col + row * 3)"
          class="square"
          style="width:40px;height:40px;"
        ></app-square>
      </div>
    </section>
  `,
  styles: [
    `
      .row {
        clear: both;
      }
    `
  ]
})
export class MainAppComponent implements OnInit {
  squares = Array(9).fill(null);
  jogador = "X";
  vencedor = null;

  novoJogo() {
    this.squares = Array(9).fill(null);
    this.jogador = "X";
    this.vencedor = null;
  }

  get status() {
    return this.vencedor
      ? `Vencedor: ${this.vencedor}`
      : `Jogador: ${this.jogador}`;
  }

  pegarMovimento(posicao) {
    if (!this.vencedor && !this.squares[posicao]) {
      this.squares[posicao] = this.jogador;
      if (this.movimentoVencedor()) {
        this.vencedor = this.jogador;
      }
      this.jogador = this.jogador == "X" ? "0" : "X";
    }
  }

  movimentoVencedor(): boolean {
    const linhas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let linha of linhas) {
      if (
        this.squares[linha[0]] &&
        this.squares[linha[0]] == this.squares[linha[1]] &&
        this.squares[linha[1]] == this.squares[linha[2]]
      ) {
        return true;
      }
    }
    return false;
  }
}

@Component({
  selector: "app-square",
  template: ` {{ status }} `,
  styles: [
    `
      :host {
        width: 45px;
        height: 45px;
        border: solid 1px grey;
        float: left;
        font-size: 36px;
        text-align: center;
      }
    `
  ]
})
export class Square {
  @Input() status;
}
