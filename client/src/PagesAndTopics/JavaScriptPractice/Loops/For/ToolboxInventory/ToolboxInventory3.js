const toolbox = [
    ["молоток", "брак_гвозди"], // коробка 1
    ["брак_болты", "шурупы"], // коробка 2
    ["брак_молоток", "отвёртка", "пила"] // коробка 3
  ];
  

console.log(findDefectiveTools(toolbox)) // → ["брак_гвозди", "брак_гвозди", "брак_молоток"]

//Мой код
function findDefectiveTools (toolbox) {
    const resultDefectTols = [];
    for(let a = 0; a < toolbox.length; a++){
        for(let b = 0; b < toolbox[a].length; b++){
            let word = toolbox[a][b] //Сохраняю слово молоток
            for(let letter = 0; letter < word.length - 3; letter++) {
                if(
                    //Увеличивая каждый индекс на 1, сравниваю буквы слова с словом брак
                    word[letter] === 'б' &&
                    word[letter + 1] === 'р' &&
                    word[letter + 2] === 'а' &&
                    word[letter + 3] === 'к'
                ){
                    resultDefectTols.push(word);
                    break;
                }
            }
        }
    }
    return resultDefectTols;
}





console.log(findDefectiveTools([["молоток", "брак_гвозди"], ["брак_гвозди", "шурупы"], ["брак_молоток", "отвёртка"]])); // ["брак_гвозди", "брак_гвозди", "брак_молоток"]
console.log(findDefectiveTools([["пила", "брак_пила"]])); // ["брак_пила"]
console.log(findDefectiveTools([])); // []