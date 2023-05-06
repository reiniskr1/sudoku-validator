class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }
  constructor() {
    this.isValid = true;
    this.isComplete = true;
  }
  readToArray(SudokuString){
    let SudokuArr = [];
    let RowArr = [];
    let currentChar;
    for (let i = 0; i < SudokuString.length; i++){
      currentChar = SudokuString.charAt(i);
      if (currentChar === '|' || currentChar === '+' || currentChar === '-' || currentChar === ' ' || currentChar === '\n') continue;
      if (currentChar === '\r'){
        if (RowArr.length !== 0)SudokuArr.push(RowArr);
        RowArr = [];
        continue
      }
      RowArr.push(parseInt(currentChar));
    }
    if (RowArr.length !== 0)SudokuArr.push(RowArr);
    return SudokuArr;
  }
  ValidateRows(SudokuArr){
    for (let i = 0; i < SudokuArr.length; i++) {
      this.ValidateArr(SudokuArr[i]);
    }
  }
  ValidateCols(SudokuArr){
    for (let i = 0; i < SudokuArr.length;i++){
      this.ValidateArr(SudokuArr.map(column => column[i]));

    }
  }
  ValidateArr(NumArr){
    let numMap = new Map();
    let currentNum;
    for (let i = 0; i < NumArr.length; i++) {
      currentNum = NumArr[i];
      if (numMap.has(currentNum) && currentNum !== 0 || currentNum > 9){
        this.isValid = false;
      }
      numMap.set(currentNum, 1);
    }
    if (numMap.has(0)){
      this.isComplete = false;
    }
  }
  ReadGridToArr(SudokuArr, StartRow, StartColl){
    let res = [];
    for(let currentRow = StartRow; currentRow < 3 + StartRow; currentRow++){
      for (let currentColl = StartColl; currentColl < 3 + StartColl; currentColl++){
        res.push(SudokuArr[currentRow][currentColl]);
      }
    }
    return res;
  }
  ValidateGrid(SudokuArr){
    for (let startRow = 0; startRow < 9; startRow += 3) {
      for (let startColl = 0; startColl < 9; startColl += 3) {
        this.ValidateArr(this.ReadGridToArr(SudokuArr, startRow, startColl));
      }
    }
  }
  validate(sudoku) {
    let validator = new Validator();
    const SudokuArr = this.readToArray(sudoku);
    validator.ValidateRows(SudokuArr);
    validator.ValidateCols(SudokuArr);
    validator.ValidateGrid(SudokuArr);
    if(validator.isValid){
      if (validator.isComplete)return "Sudoku is valid.";
      return "Sudoku is valid but incomplete."
    }
    return "Sudoku is invalid.";
  }
}

module.exports = Validator
