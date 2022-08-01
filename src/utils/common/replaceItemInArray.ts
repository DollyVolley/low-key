export function replaceItemInArray(array: any[], item: any, idAttributeName: string): any[] {

    const index = array.findIndex(meta => meta[idAttributeName] === item[idAttributeName])
    if(index === -1) throw new Error("Item not found in array")

    return [...array.splice(index, 1, item)]
}