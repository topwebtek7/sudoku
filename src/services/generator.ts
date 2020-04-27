
// Sudoku Matrix data generating class - Ref: https://scriptographer.org/scripts/general-scripts/sudoku-generator-solver/
class SudokuGenerator {
  matrix: Array<number> = new Array(81);
	blankNumbers: number;

  constructor(blankNumbers: number) {
    this.blankNumbers = blankNumbers;
  }

	// generate shuffled random all filled matrix
  private _shuffle() {
		// initialize with random data
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.matrix[i * 9 + j] = (i*3 + Math.floor(i/3) + j) % 9 + 1;
      }
		}

		// randomly swap corresponding columns from each column of subsquares
		for (let c = 0; c < 42; c++) {
			const s1 = Math.floor(Math.random() * 3);
			const s2 = Math.floor(Math.random() * 3);

			for(let row = 0; row < 9; row++) {
				const tmp = this.matrix[row * 9 + (s1 * 3 + c % 3)];
				this.matrix[row * 9 + (s1 * 3 + c % 3)] = this.matrix[row * 9 + (s2 * 3 + c % 3)];
				this.matrix[row * 9 + (s2 * 3 + c % 3)] = tmp;
			}
		}

		// randomly swap columns within each column of subsquares
		for (let s = 0; s < 42; s++) {
			const c1 = Math.floor(Math.random() * 3);
			const c2 = Math.floor(Math.random() * 3);

			for(let row = 0; row < 9; row++) {
				const tmp = this.matrix[row * 9 + (s % 3 * 3 + c1)];
				this.matrix[row * 9 + (s % 3 * 3 + c1)] = this.matrix[row * 9 + (s % 3 * 3 + c2)];
				this.matrix[row * 9 + (s % 3 * 3 + c2)] = tmp;
			}
		}

		// randomly swap rows within each row of subsquares
		for (let s = 0; s < 42; s++) {
			let r1 = Math.floor(Math.random() * 3);
			let r2 = Math.floor(Math.random() * 3);

			for(let col = 0; col < 9; col++)
			{
				let tmp = this.matrix[(s % 3 * 3 + r1) * 9 + col];
				this.matrix[(s % 3 * 3 + r1) * 9 + col] = this.matrix[(s % 3 * 3 + r2) * 9 + col];
				this.matrix[(s % 3 * 3 + r2) * 9 + col] = tmp;
			}
		}
	}
	
	// replace random position values with 0 
  private _doMask() {
    for (let i = 0; i < this.blankNumbers; i++) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 81);
      } while (this.matrix[randomNumber] === 0)
      this.matrix[randomNumber] = 0;
    }
	}
	
	// convert one dimension array to 2 dimension array according to rows
	private _chunk(matrix: Array<number>): Array<Array<string>> {
		const matrixString: string = matrix.map(d => `${d}`).join('');
		const matrixArray: Array<string> = matrixString.match(/.{1,9}/g) || [];
		return matrixArray.map(v => v.split(''));
	}

	// generate random sudoku matrix which has this.blankNumbers blanks
  generate(): Array<Array<string>> {
    this._shuffle();
		this._doMask();
		return this._chunk(this.matrix);
  }
}

export default SudokuGenerator;
