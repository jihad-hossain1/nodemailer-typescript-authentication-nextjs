export function validateJSON(jsonObj: any) {
  let invalidFields: any = {};
  for (let key in jsonObj) {
    if (!jsonObj[key] && jsonObj[key] !== 0) {
      let invalidType: any;
      switch (typeof jsonObj[key]) {
        case "undefined":
          invalidType = "undefined";
          break;
        case "object":
          invalidType = "null";
          break;
        default:
          invalidType = "field are empty";
          break;
      }
      invalidFields[key] = invalidType;
    }
  }
  return Object.keys(invalidFields).length === 0 ? true : invalidFields;
}
