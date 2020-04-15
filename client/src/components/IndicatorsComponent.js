import React from 'react';
import MaterialTable from 'material-table';
import {isEqual} from 'lodash';
import {toastr} from 'react-redux-toastr';

const IndicatorsComponent = (props) =>{
    const {
        indicators,
        createData,
        editData,
        deleteData,
    } = props;

    const columns = [
        {
            title: 'Value',
            field: 'value',
            filterPlaceholder: 'Enter value'
        },
        {
            title: 'Device',
            field: 'device',
            filterPlaceholder: 'Enter device'
        },
        {
            title: 'Type',
            field: 'type',
            lookup: {
                "термометр": "термометр",
                "барометр": "барометр",
                "гігрометр": "гігрометр",
                "флюгер": "флюгер",
                "опадомір": "опадомір"
            }
        },
        {
            title: 'Timestamp',
            field: 'timestamp',
            type: "datetime",
            editable: "onAdd"
        }
    ];

    const validateData = ({value, device, type, timestamp}, callback = null, fallback = null) => {
        if (value && device && type && timestamp){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };

    return (
        <MaterialTable
            title="Indicators"
            columns={columns}
            data={indicators}
            options={{
                pageSize: 10,
                pageSizeOptions: [5, 10, /*20*/],
                toolbar: true,
                paging: true,
                actionsColumnIndex: -1,
                filtering: true
            }}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        validateData(newData, () =>{
                            createData({table:"indicators"}, newData, "INDICATOR");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "indicators", key: "timestamp"}, newData, "INDICATOR");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"indicators", key:"timestamp", value: data.name}, "INDICATOR");
                        resolve();
                    }),
            }}
        />
    );
};


export default IndicatorsComponent
