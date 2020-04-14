import axios from 'axios'
import {toastr} from 'react-redux-toastr'
import Cookies from "js-cookie";

import queryOptionsParser from "../helpers/queryOptionsParser";

const API_URL = process.env.REACT_APP_API_URL;


export const apiCall = (method, type, data = null) => {
    const url = `${API_URL + type}`;

    const CancelToken = axios.CancelToken.source();


    const settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": method,
        "processData": false,
        "contentType": false,
        "mimeType": "application/json",
        "data": data,
        cancelToken: CancelToken.token
    };

    setTimeout(() => {  //Canceling request if it too long
        CancelToken.cancel('Too long waiting');
        return []
    }, 40000); //Waiting delay

    return axios(settings)
        .then(response => response.data)
};

export const complexRequest = (reqArr, dispatchType, callback = null) => {
    const payload = Promise.all(
        reqArr.map(({method, type, data, name, catchType}) => {
            return apiCall(method, type, data)
                .catch((e) => {
                    toastr.error("Error", e.toString());
                    return catchType ? catchType : []
                })
        })
    ).then((response) => {
        return  reqArr.map(({name}, index) => { //convert array into object with your keys(name)
            return {
                [name]: response[index]
            }
        }).reduce((a, b) => Object.assign(a, b), {})
    }).then(res =>{
        if (callback && typeof callback === 'function') {
            callback();
        }
        return res
    });

    return (dispatch) => {
        dispatch({
            type: dispatchType,
            payload: payload
        })
    }
};



export const getData = (table, type) => {
    const payload = apiCall("get", `data?table=${table}`)
        .catch((e) => {
            toastr.error("Error", e.toString());
            return []
        });

    return (dispatch) => {
        dispatch({
            type: `GET_${type}`,
            payload
        });
    };
};

export const getComplexSelection = (options, type) => {
    const payload = apiCall("get", `complex_selection${queryOptionsParser(options)}`)
        .catch((e) => {
            toastr.error("Error", e.toString());
            return []
        });

    return (dispatch) => {
        dispatch({
            type: `GET_${type}`,
            payload
        });
    };
};

export const createData = (options, data, type) => {
    const payload = apiCall("post", `post${queryOptionsParser(options)}`, data)
        .catch((e) => {
            toastr.error("Error", e.toString());
            return false
        });

    return (dispatch) => {
        dispatch({
            type: `CREATE_${type}`,
            payload
        });
    };
};

export const editData = (options, data, type) => {
    const payload = apiCall("put", `edit${queryOptionsParser(options)}`, data)
        .catch((e) => {
            toastr.error("Error", e.toString());
            return false
        });

    return (dispatch) => {
        dispatch({
            type: `EDIT_${type}`,
            payload
        });
    };
};

export const deleteData = (options, type) => {
    const payload = apiCall("delete", `delete${queryOptionsParser(options)}`)
        .catch((e) => {
            toastr.error("Error", e.toString());
            return false
        });

    return (dispatch) => {
        dispatch({
            type: `DELETE_${type}`,
            payload
        });
    };
};

export const login = (pass = "") => {
    const payload = apiCall("get", `access_req?pass=${pass}`)
        .then(response =>{
            if (response.error) {
                toastr.error(response.status, response.message);
                return false
            }

            Cookies.set('isDBAvailable', true, {expires: 1});
            return true
        });

    return (dispatch) => {
        dispatch({
            type: 'LOGIN',
            payload
        });
    };
};
