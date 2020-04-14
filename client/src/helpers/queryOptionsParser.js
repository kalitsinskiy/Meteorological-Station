export default function queryOptionsParser (options){
    let params = '';

    for (let key in options) {
        params += `${(!params ? '?' : '&')}${key}=${options[key]}`
    }

    return params
}
