const filter = (products, key, value) => {
    return products.filter(product => product[key] === value)
}
const find = (products, key, value) => {
    return products.find(product => product[key] === value);
}
const deleteItemByKey = (products, key, value) => {
    return products.filter(product => product[key] !== value);
}

export default {filter, find, deleteItemByKey};