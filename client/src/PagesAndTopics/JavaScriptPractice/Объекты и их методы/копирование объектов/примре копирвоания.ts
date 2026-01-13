// Пример копирования Вали

// clonedObjects - это объект в который копирую который является new WeakMap
// obj - это объект который копирую
export default function smartClone<T extends object>(obj: any, clonedObjects = new WeakMap()) : T {
    // Если объект без значения или не обект то возвращаем объект
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    
    // если объект уже есть в колекции то возвращаем объект из колеции
    if (clonedObjects.has(obj)) {
      return clonedObjects.get(obj)
    }
    
    // если объекта нет в колеции то создаем новую колекцию Map в которую вкладываем типы DateConstructor... + функцию (объект)
    const constructorMap: Map<DateConstructor | RegExpConstructor | ArrayConstructor, (obj: any) => any> = new Map([
      [Date, (obj: Date) => new Date(obj.getTime())],
      [RegExp, (obj: RegExp) => new RegExp(obj)],
      [Array, (obj: any[]) => obj.map((item) => smartClone(item, clonedObjects))],
    ] as Iterable<[DateConstructor | RegExpConstructor | ArrayConstructor, (obj: any) => any]>)

    const objConstructor = obj.constructor // сохраняем в objConstructor значение obj.constructor 
    const cloneConstructor = constructorMap.get(objConstructor) // получаем из cloneConstructor objConstructor
    
    // если значение есть то создаем клон cloneConstructor(obj) добавляем в колецию 
    if (cloneConstructor) {
      const clone = cloneConstructor(obj)
      clonedObjects.set(obj, clone)
      return clone
    }
  
    const proto = Object.getPrototypeOf(obj)
    const clone = Object.create(proto)
  
    clonedObjects.set(obj, clone)
  
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clone[key] = smartClone(obj[key], clonedObjects)
      }
    })
  
    return clone
  }