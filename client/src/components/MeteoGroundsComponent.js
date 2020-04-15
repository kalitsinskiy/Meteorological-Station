import React from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty} from 'lodash';
import {toastr} from 'react-redux-toastr';
import queryOptionsParser from "../helpers/queryOptionsParser";

const MeteoGroundsComponent = (props) =>{
    const {
        meteogrounds,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        setMeteoGroundsOptions
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
            field: 'meteo_post'
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

    const onSelectionChange = (all, cur) =>{
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
            }}
        />
    );
};


export default MeteoGroundsComponent
