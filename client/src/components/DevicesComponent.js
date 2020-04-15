import React from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty} from 'lodash';
import {toastr} from 'react-redux-toastr';

const MeteoPostsComponent = (props) =>{
    const {
        devices,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        setDevicesOptions
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
            lookup: {
                "термометр": "термометр",
                "барометр": "барометр",
                "гігрометр": "гігрометр",
                "флюгер": "флюгер",
                "опадомір": "опадомір"
            }
        },
        {
            title: 'Meteo pole',
            field: 'meteo_pole',
            filterPlaceholder: 'Enter meteo pole'
        },
        {
            title: 'Installation date',
            field: 'installation_date',
            type: "date"
        },
        {
            title: 'Inspection frequency',
            field: 'inspection_frequency',
            filterPlaceholder: 'Enter inspection frequency'
        },
    ];

    const validateData = ({name, type, meteo_pole, installation_date, inspection_frequency}, callback = null, fallback = null) => {
        if (name && type && meteo_pole && installation_date && inspection_frequency){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };

    const onSelectionChange = (all) =>{
        if (!isEmpty(all)){
            const devicesNames = all.map(it => it.name).join();

            const options = {table:"indicators", key:"device", values: devicesNames};

            setDevicesOptions(options);
            setWizardNavigation({...wizNav, nextDisabled: false});
        }else {
            setWizardNavigation({...wizNav, nextDisabled: true})
        }
    };

    const onRowClick = (e, it) =>{
        const index = devices.indexOf(it);
        devices[index].tableData.checked = !devices[index].tableData.checked;

        onSelectionChange(devices.filter(it => it.tableData.checked))
    };


    return (
        <MaterialTable
            title="Devices"
            columns={columns}
            data={devices}
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
                            createData({table:"devices"}, newData, "DEVICE");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "devices", key: "name"}, newData, "DEVICE");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"devices", key:"name", value: data.name}, "DEVICE");
                        resolve();
                    }),
            }}
        />
    );
};


export default MeteoPostsComponent
