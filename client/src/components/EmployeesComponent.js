import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty, clone} from 'lodash';
import {toastr} from 'react-redux-toastr';

const EmployeesComponent = (props) =>{
    const {
        employees,
        createData,
        editData,
        deleteData
    } = props;

    const columns = [
        {
            title: 'Full name',
            field: 'full_name',
            filterPlaceholder: 'Enter name'
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
        },
        {
            title: 'Meteo station',
            field: 'meteo_station',
            filterPlaceholder: 'Enter meteo post'
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
            data={clone(employees)}
            onRowClick={(e, it) => console.log(it)}
            options={{
                pageSize: 10,
                pageSizeOptions: [5, 10, /*20*/],
                toolbar: true,
                paging: true,
                actionsColumnIndex: -1,
                filtering: true,
                selection: true
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        console.log(newData);
                        validateData(newData, () =>{
                            createData({table:"meteo_posts"}, newData, "METEO_POSTS");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "meteo_posts", key: "name"}, newData, "METEO_POSTS");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"meteo_posts", key:"name", value: data.name}, "METEO_POSTS");
                        resolve();
                    }),
            }}
        />
    );
};


export default EmployeesComponent
