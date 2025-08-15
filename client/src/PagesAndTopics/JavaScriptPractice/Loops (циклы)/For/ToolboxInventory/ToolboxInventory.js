//Твоя задача — написать функцию listTools, которая проходит по всем инструментам в ящике и возвращает список всех уникальных инструментов (без дубликатов).

//Входящий объект
const toolbox = [
    [ // отдел 1
      [ // коробка 1
        ["молоток", "гвозди"], // пакет 1
        ["отвёртка"] // пакет 2
      ],
      [ // коробка 2
        ["гвозди", "шурупы"] // пакет 1
      ]
    ],
    [ // отдел 2
      [ // коробка 1
        ["молоток", "отвёртка"], // пакет 1
        ["пила"], // пакет 2
        ["пасатижи"] // пакет 3
      ]
    ]
  ];
  
//Ожидаемый результат
//   listTools(toolbox) // → ["молоток", "гвозди", "отвёртка", "шурупы", "пила"]

function listTools(toolbox) {
    const uniqueTools = [];

    for (let i = 0; i < toolbox.length; i++) {
        for (let j = 0; j < toolbox[i].length; j++) {
            for (let k = 0; k < toolbox[i][j].length; k++) {
                for (let m = 0; m < toolbox[i][j][k].length; m++) {
                    let isUnique = true;
                    for (let n = 0; n < uniqueTools.length; n++){
                      if(uniqueTools[n] === toolbox[i][j][k][m]){
                        isUnique = false;
                        break
                      }
                    }
                    if(isUnique){
                      uniqueTools.push(toolbox[i][j][k][m])
                    }
                }
            }
        }
    }
    return uniqueTools;
}

console.log(listTools(toolbox)); // Все уникально

console.log(listTools([[[["пила"]]]])); // ["пила"] - совпадает
console.log(listTools([])); // [] - совпадает