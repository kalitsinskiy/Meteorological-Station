function queryParser(data){
    let params = '';

    for (let key in data) {
        params += `${!params ? '' : ', '}${key}='${data[key]}'`
    }

    return params
}

module.exports = queryParser;
