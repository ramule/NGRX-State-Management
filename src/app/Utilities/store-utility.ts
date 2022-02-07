export class StoreUtility{
  // [{id:1 ,...}, {id:2 ,...}] => normal form
  // entities: {1:{id:1, ...}}, {2:{id:2, ...}} => normalize form
  static normalize(entitiesArr: Entity[]) {
    return entitiesArr.reduce((previousValue, currentValue) => {
      return {...previousValue, ...{[currentValue.id]: currentValue}}
    }, {})
  }

  static unNormalize(entities: any) {
    if(!entities) {
      return
    }
    else {
      return Object.keys(entities).map(key => entities[key]);
    }
  }

  static filterDuplicateIds(ids: number[]) {
    return ids.filter((value, index, array) => index === (array.indexOf(value)));
  }

  static removeKeys(entities: any, id: number) {
    const newObj = {...entities};
    delete newObj[id];
    return newObj;
  }
}

export interface Entity {
  id: any;
}
