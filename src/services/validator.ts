export const DIGITBLOCKS = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
export const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// custom Sudoku app validator
export default class SudokuValidator {
  puzzleData: Array<Array<string>>;
  rowId: number;
  colId: number;
  changedValue: string;
  validStatus: boolean = false;

  constructor(data: Array<Array<string>>, rowId: number, colId: number) {
    this.puzzleData = data;
    this.rowId = rowId;
    this.colId = colId;
    this.changedValue = data[rowId][colId];
  }

  // find which block include the index from DIGITBLOCKS - [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
  private _getExistingBlock(id: number): Array<number> {
    const foundBlock: Array<number> | undefined = DIGITBLOCKS.find((v: Array<number>) => v.indexOf(id) > -1);
    if (foundBlock === undefined || foundBlock === null) {
      throw new TypeError('Not valid numeric');
    }
    return foundBlock;
  }

  // return square block indexes that include [rowId, colId]. return type Array<[rowId, colId]>
  private _getSquareIndexes(): Array<Array<number>> {
    const rowBlock: Array<number> = this._getExistingBlock(this.rowId);
    const colBlock: Array<number> = this._getExistingBlock(this.colId);
    const squareIndexes: Array<Array<number>> = [];
    rowBlock.map(r => squareIndexes.push(...colBlock.map(c => ([r, c]))));
    return squareIndexes;
  }

  // check if duplicate numeric value is exist among parameter array value. note: should escape comparing same rowId, colId value
  private checkIfNumerisIsExist(indexes: Array<Array<number>>): boolean {
    return indexes.findIndex(index => (index.join('') !== `${this.rowId}${this.colId}`) && (this.puzzleData[index[0]][index[1]] === this.changedValue)) >= 0
  }

   // return error cells like Array<`${rowId}${colId}`>
  validateSquare(): Array<string> {
    const squareIndexes: Array<Array<number>> = this._getSquareIndexes();
    if (this.checkIfNumerisIsExist(squareIndexes)) {
      return squareIndexes.map(index => `${index[0]}${index[1]}`);
    }
    return [];
  }

  // return error cells like Array<`${rowId}${colId}`>
  validateRowCol(): Array<string> {
    const rowIndexes: Array<Array<number>> = DIGITS.map(d => [this.rowId, d]);
    const colIndexes: Array<Array<number>> = DIGITS.map(d => [d, this.colId]);
    let errorCells: Array<string> = [];
    if (this.checkIfNumerisIsExist(rowIndexes)) {
      errorCells.push(...rowIndexes.map(index => `${index[0]}${index[1]}`));
    }
    if (this.checkIfNumerisIsExist(colIndexes)) {
      errorCells.push(...colIndexes.map(index => `${index[0]}${index[1]}`));
    }
    return errorCells;
  }

  // return error Sqaure and RowCol  Array<Array<`${rowId}${colId}`>>
  validate(): {squareErrors: Array<string>, rowColErrors: Array<string>} {
    const squareErrors = this.validateSquare();
    const rowColErrors = this.validateRowCol();
    if (squareErrors.length === 0 && rowColErrors.length === 0) {
      this.validStatus = true;
    } else {
      this.validStatus = false;
    }
    return { squareErrors, rowColErrors };
  }

  // check if all filled successfully
  allFilled(matrixData: Array<Array<string>>, initialPuzzleData: Array<Array<string>>): boolean {
    return matrixData.findIndex(row => row.findIndex(cell => cell === '0') > -1) == -1
  }

  // return valid statue
  isValid(): boolean {
    return this.validStatus;
  }
}
