import React, {memo} from 'react';
import MaterialTable from 'material-table';
import {isEmpty, isEqual} from 'lodash';
import {toastr} from 'react-redux-toastr';
import arrayToObject from "../helpers/arrayToObject";

const EmployeesComponent = (props) =>{
    const {
        employees,
        stations,
        meteoposts,
        createData,
        editData,
        deleteData,
        pageSize
    } = props;

    const columns = [
        {
            title: 'Full name',
            field: 'full_name',
            filterPlaceholder: 'Enter name',
            editable: "onAdd"
        },
        {
            title: 'Birth',
            field: 'birth_date',
            filterPlaceholder: 'Enter birth',
            type: "date"
        },
        {
            title: 'Position',
            field: 'position',
            filterPlaceholder: 'Enter position'
        },
        {
            title: 'Meteo post',
            field: 'meteo_post',
            lookup: isEmpty(meteoposts) ? {} : arrayToObject(meteoposts, "name"),
        },
        {
            title: 'Meteo station',
            field: 'meteo_station',
            lookup: isEmpty(stations) ? {} : arrayToObject(stations, "name"),
        },
    ];

    const validateData = ({full_name, birth_date, position, meteo_post, meteo_station}, callback = null, fallback = null) => {
        if (full_name && birth_date && position && meteo_post && meteo_station){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };


    return (
        <MaterialTable
            title="Employees"
            columns={columns}
            data={employees}
            options={{
                pageSize,
                pageSizeOptions: [5, 8, 10],
                toolbar: true,
                paging: true,
                actionsColumnIndex: -1,
                filtering: true
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        validateData(newData, () =>{
                            createData({table:"employees"}, newData, "EMPLOYEE");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "employees", key: "full_name"}, newData, "EMPLOYEE");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"employees", key:"full_name", value: data.full_name}, "EMPLOYEE");
                        resolve();
                    }),
            }}
        />
    );
};


export default memo(EmployeesComponent)
