export default function arrayToObject(arr, key) {
    let rv = {};

    arr.forEach(it =>{
        rv[it[key]] = it[key]
    });

    return rv;
}
