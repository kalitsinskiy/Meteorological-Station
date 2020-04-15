function querySelectParser(key, data){
    let params = '';

    data.forEach(it =>params += `${!params ? '' : ' OR '}${key}='${it}'`);

    return params
}

module.exports = querySelectParser;
