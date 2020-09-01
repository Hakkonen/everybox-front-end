// Finds item in object basket
const findItem = (basket, id) => {
    let found = false
    for(const item of basket) {
        console.log("itemID: ", item.id, id)
        if(item.id == id) {
            found = true
            break
        }
    }
    return found
}

export default findItem