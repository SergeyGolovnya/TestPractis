const once = 11


const onceLol = once(() => console.log("Lol"))
const onceKek = once(() => console.log("Kek"))


onceLol(); // Lol (первый вызов)
onceLol();

onceKek(); // Kek (первый вызов)
onceKek();