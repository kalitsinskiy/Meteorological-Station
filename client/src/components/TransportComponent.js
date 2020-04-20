import React from 'react';
import MaterialTable from 'material-table';
import {isEmpty, isEqual} from 'lodash';
import {toastr} from 'react-redux-toastr';
import arrayToObject from "../helpers/arrayToObject";

const TransportComponent = (props) =>{
    const {
        transport,
        meteoposts,
        createData,
        editData,
        deleteData,
        pageSize,
        isAdmin
    } = props;

    const columns = [
        {
            title: 'Name',
            field: 'name',
            filterPlaceholder: 'Enter name'
        },
        {
            title: 'Number',
            field: 'number',
            filterPlaceholder: 'Enter number',
            editable: "onAdd"
        },
        {
            title: 'Driver',
            field: 'driver',
            filterPlaceholder: 'Enter driver'
        },
        {
            title: 'Type',
            field: 'type',
            lookup: {
                "гелікоптер": "гелікоптер",
                "позашляховик": "позашляховик",
                "легковий автомобіль": "легковий автомобіль",
                "квадроцикл": "квадроцикл",
                "снігохід": "снігохід"
            }
        },
        {
            title: 'Meteo post',
            field: 'meteo_post',
            lookup: isEmpty(meteoposts) ? {} : arrayToObject(meteoposts, "name"),
        },
        {
            title: 'Inspection date',
            field: 'inspection_date',
            type: "date"
        },
    ];

    const validateData = ({name, number,  type, meteo_post, driver, inspection_date}, callback = null, fallback = null) => {
        if (name && number && type && meteo_post && driver && inspection_date){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };


    return (
        <MaterialTable
            title="Transport"
            columns={columns}
            data={transport}
            options={{
                pageSize,
                pageSizeOptions: [5, 8, 10],
                toolbar: true,
                paging: true,
                actionsColumnIndex: -1,
                filtering: true
            }}
            editable={isAdmin ? {
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        validateData(newData, () =>{
                            createData({table:"transport"}, newData, "TRANSPORT");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "transport", key: "number"}, newData, "TRANSPORT");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"transport", key:"number", value: data.name}, "TRANSPORT");
                        resolve();
                    }),
            } : {}}
        />
    );
};


export default TransportComponent
