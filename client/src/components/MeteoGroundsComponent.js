import React, {memo} from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty} from 'lodash';
import {toastr} from 'react-redux-toastr';
import arrayToObject from "../helpers/arrayToObject";

const MeteoGroundsComponent = (props) =>{
    const {
        meteogrounds,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        setMeteoGroundsOptions,
        meteoposts,
        pageSize,
        isAdmin
    } = props;

    const columns = [
        {
            title: 'Name',
            field: 'name',
            filterPlaceholder: 'Enter name',
            editable: "onAdd"
        },
        {
            title: 'Type',
            field: 'type',
            lookup: {"відкрита": "відкрита", "закрита": "закрита"}
        },
        {
            title: 'Meteo post',
            field: 'meteo_post',
            lookup: isEmpty(meteoposts) ? {} : arrayToObject(meteoposts, "name"),
        },
        {
            title: 'Surface',
            field: 'surface',
            lookup: {"бетон": "бетон", "трава": "трава", "асфальт":"асфальт"}
        },
        {
            title: 'Size',
            field: 'size',
            filterPlaceholder: 'Enter size'
        },
        {
            title: 'Altitude',
            field: 'altitude',
            filterPlaceholder: 'Enter altitude'
        }
    ];

    const validateData = ({name, type, meteo_post, surface, size, altitude}, callback = null, fallback = null) => {
        if (name && type && meteo_post && surface && size && altitude){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };

    const onSelectionChange = all =>{
        if (!isEmpty(all)){
            const groundsNames = all.map(it => it.name).join();

            const options = {
                table: "meteo_poles",
                key: "meteo_ground",
                values: groundsNames
            };

            setMeteoGroundsOptions(options);
            setWizardNavigation({...wizNav, nextDisabled: false,});
        }else {
            setMeteoGroundsOptions({});
            setWizardNavigation({...wizNav, nextDisabled: true})
        }
    };

    const onRowClick = (e, it) =>{
        const index = meteogrounds.indexOf(it);
        meteogrounds[index].tableData.checked = !meteogrounds[index].tableData.checked;

        onSelectionChange(meteogrounds.filter(it => it.tableData.checked))
    };


    return (
        <MaterialTable
            title="Meteo Grounds"
            columns={columns}
            data={meteogrounds}
            onRowClick={onRowClick}
            onSelectionChange={onSelectionChange}
            options={{
                pageSize,
                pageSizeOptions: [5, 8, 10],
                toolbar: true,
                paging: true,
                actionsColumnIndex: -1,
                filtering: true,
                selection: true
            }}
            editable={isAdmin ? {
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        validateData(newData, () =>{
                            createData({table:"meteo_grounds"}, newData, "METEO_GROUND");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "meteo_grounds", key: "name"}, newData, "METEO_GROUND");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"meteo_grounds", key:"name", value: data.name}, "METEO_GROUND");
                        resolve();
                    }),
            } : {}}
        />
    );
};


export default memo(MeteoGroundsComponent)
