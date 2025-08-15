// 1. Создание коллекции


// 2. Методы коллекции

// 3. Практическое использование коллекции

// 3.1 - удалить дубли из массива
// const arr = [ 'df','df',3,2,59,2,93,'eke','eje',9,2,94,1,3,2,4,8]
// const cleanDub = new Set(arr)
// console.log(cleanDub)

// 3.2 - получение доступа к объктам внутри, расширение коллекции

const set = new Set();

uniqueSkills.add({skill: 'JavaScript'});
uniqueSkills.add('HTML');
uniqueSkills.add('CSS');
uniqueSkills.add('JavaScript'); // Дубликат не будет добавлен
console.log(uniqueSkills)