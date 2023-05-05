class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {
    let data = readToArray(sudoku);
    // Your code here
  }
}

function readToArray(SudokuString){
  let SudokuArr = [];
  let RowArr = [];
  let currentChar;
  for (let i = 0; i < SudokuString.length; i++){
    currentChar = SudokuString.charAt(i);
    if (currentChar === '|' || currentChar === '+' || currentChar === '-' || currentChar === ' ') continue;
    if (currentChar === '\n'){
      SudokuArr.push(RowArr);
      RowArr = [];
      continue
    }
    RowArr.push(parseInt(currentChar));
  }
  if (RowArr.length !== 0)SudokuArr.push(RowArr);
  return SudokuArr;

}
module.exports = Validator
