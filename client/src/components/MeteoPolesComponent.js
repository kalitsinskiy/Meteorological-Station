import React from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty} from 'lodash';
import {toastr} from 'react-redux-toastr';

const MeteoPolesComponent = (props) =>{
    const {
        meteopoles,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        setMeteoPolesOptions
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
            lookup: {"капітальна": "капітальна", "переносна": "переносна", "розбірна": "розбірна"},
        },
        {
            title: 'Height',
            field: 'height',
            filterPlaceholder: 'Enter chief'
        },
        {
            title: 'Meteo ground',
            field: 'meteo_ground',
        }
    ];

    const validateData = ({name, type, height, meteo_ground}, callback = null, fallback = null) => {
        if (name && type && height && meteo_ground){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };

    const onSelectionChange = (all) =>{
        if (!isEmpty(all)){
            const polesNames = all.map(it => it.name).join();

            const options = {table:"devices", key:"meteo_pole", values: polesNames};

            setMeteoPolesOptions(options);
            setWizardNavigation({...wizNav, nextDisabled: false});
        }else {
            setWizardNavigation({...wizNav, nextDisabled: true})
        }
    };

    const onRowClick = (e, it) =>{
        const index = meteopoles.indexOf(it);
        meteopoles[index].tableData.checked = !meteopoles[index].tableData.checked;

        onSelectionChange(meteopoles.filter(it => it.tableData.checked))
    };


    return (
        <MaterialTable
            title="Meteo Poles"
            columns={columns}
            data={meteopoles}
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
                        validateData(newData, () =>{
                            createData({table:"meteo_poles"}, newData, "METEO_POLE");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "meteo_poles", key: "name"}, newData, "METEO_POLE");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"meteo_poles", key:"name", value: data.name}, "METEO_POLE");
                        resolve();
                    }),
            }}
        />
    );
};


export default MeteoPolesComponent
