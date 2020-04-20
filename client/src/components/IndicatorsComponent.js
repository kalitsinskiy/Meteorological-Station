import React, {memo} from 'react';
import MaterialTable from 'material-table';
import {isEmpty, isEqual} from 'lodash';
import {toastr} from 'react-redux-toastr';
import arrayToObject from "../helpers/arrayToObject";

const IndicatorsComponent = (props) =>{
    const {
        indicators,
        devices,
        createData,
        editData,
        deleteData,
        pageSize,
        isAdmin
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
            lookup: isEmpty(devices) ? {} : arrayToObject(devices, "name"),
            editable: "onAdd"
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
                        deleteData({table:"indicators", key:"timestamp", value: data.timestamp}, "INDICATOR");
                        resolve();
                    }),
            } : {}}
        />
    );
};


export default memo(IndicatorsComponent)
