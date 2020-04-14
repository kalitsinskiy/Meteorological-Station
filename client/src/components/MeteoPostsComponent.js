import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty, clone} from 'lodash';
import {toastr} from 'react-redux-toastr';

const StationsComponent = (props) =>{
    const {
        meteoposts,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        getComplexSelection
    } = props;

    const columns = [
        {
            title: 'Name',
            field: 'name',
            filterPlaceholder: 'Enter name'
        },
        {
            title: 'Chief',
            field: 'chief',
            filterPlaceholder: 'Enter chief'
        },
        {
            title: 'Transport',
            field: 'transport',
            filterPlaceholder: 'Enter transport'
        },
        {
            title: 'Meteo station',
            field: 'meteo_station',
        },
        {
            title: 'Time zone',
            field: 'time_zone',
            filterPlaceholder: 'Enter time zone'
        },
    ];

    const validateData = ({name, chief, transport, meteo_station, time_zone}, callback = null, fallback = null) => {
        if (name && chief && transport && meteo_station && time_zone){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };

    const onSelectionChange = (all, cur) =>{
        if (!isEmpty(all)){

            const stationNames = all.map(it => it.name).join();
            console.log(stationNames);


            setWizardNavigation({
                ...wizNav,
                nextDisabled: false,
                nextCallback: () => {
                    // getComplexSelection({table:"meteo_poles", key:"meteo_ground", values: ["ММ-23","ММ-131"].join()},"TEST");
                    setWizardNavigation({nextDisabled: false, nextHidden: false, prevDisabled: false, prevHidden: false});
                }
            });
        }else {
            setWizardNavigation({...wizNav, nextDisabled: true, nextCallback: null, prevCallback: null})
        }
    };


    return (
        <MaterialTable
            title="Meteo Posts"
            columns={columns}
            data={clone(meteoposts)}
            onRowClick={(e, it) => console.log(it)}
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


export default StationsComponent
