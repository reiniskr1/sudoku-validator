class Validator {
  static validate(sudoku) {
    const validator = new Validator
    return validator.validate(sudoku)
  }


  // Initializes global variables to be accessed later in methods
  constructor() {
    this.isValid = true;
    this.isComplete = true;
  }


  // Given the sudoku in a string format, transfers it into a 2d array of numbers, excluding special symbols
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


  // Checks if all the rows in the sudoku are valid
  ValidateRows(SudokuArr){
    for (let i = 0; i < SudokuArr.length; i++) {
      this.ValidateArr(SudokuArr[i]);
    }
  }


  // Checks if all the columns in the sudoku are valid
  ValidateCols(SudokuArr){
    for (let i = 0; i < SudokuArr.length;i++){
      this.ValidateArr(SudokuArr.map(column => column[i]));
    }
  }


  // Given a number array, checks whether it contains zeroes or multiple numbers of the same value
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


  // Validates whether a 3x3 grid has valid values
  ValidateGrids(SudokuArr){
    for (let startRow = 0; startRow < 9; startRow += 3) {
      for (let startCol = 0; startCol < 9; startCol += 3) {
        this.ValidateArr(this.ReadGridToArr(SudokuArr, startRow, startCol));
      }
    }
  }


  // Given the coordinates of the top left corner of the 3x3 grid, reads it to an array
  ReadGridToArr(SudokuArr, StartRow, StartColl){
    let res = [];
    for(let currentRow = StartRow; currentRow < 3 + StartRow; currentRow++){
      for (let currentCol = StartColl; currentCol < 3 + StartColl; currentCol++){
        res.push(SudokuArr[currentRow][currentCol]);
      }
    }
    return res;
  }



  validate(sudoku) {
    let validator = new Validator();
    const SudokuArr = this.readToArray(sudoku);
    validator.ValidateRows(SudokuArr);
    validator.ValidateCols(SudokuArr);
    validator.ValidateGrids(SudokuArr);
    if(validator.isValid){
      if (validator.isComplete)return "Sudoku is valid.";
      return "Sudoku is valid but incomplete."
    }
    return "Sudoku is invalid.";
  }
}

module.exports = Validator
