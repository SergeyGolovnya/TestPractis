function* generatorFun () {
    yield console.log('Что то 1')
    yield console.log('Что то 2')
    yield console.log('Что то 3')
    yield console.log('Что то 4')
}

const objGenerator = generatorFun()

for (const _ of objGenerator) {}