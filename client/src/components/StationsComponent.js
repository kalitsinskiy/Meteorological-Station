import React, {useEffect, memo} from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty} from 'lodash';
import {toastr} from 'react-redux-toastr';

import queryOptionsParser from '../helpers/queryOptionsParser';

const StationsComponent = (props) =>{
    const {
        stations,
        getData,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        setStationsOptions,
        pageSize,
        isAdmin
    } = props;

    useEffect(() => getData("meteo_stations", "METEO_STATIONS"),[getData]);

    const columns = [
        {
            title: 'Name',
            field: 'name',
            filterPlaceholder: 'Enter name',
            editable: "onAdd"
        },
        {
            title: 'City',
            field: 'city',
            filterPlaceholder: 'Enter city'
        },
        {
            title: 'Type',
            field: 'type',
            lookup: {"дорожня": "дорожня", "лісова": "лісова", "гідрологічна": "гідрологічна", "побутова": "побутова"},
            initialEditValue: "дорожня"
        },
        {
            title: 'Degree',
            field: 'degree',
            lookup: {"І": "І", "II": "II", "ІІІ": "ІІІ"},
            initialEditValue: "І",
        },
        {
            title: 'Opening Year',
            field: 'openingYear',
            initialEditValue: "2000",
            filterPlaceholder: 'Enter year'
        },
        {
            title: 'Location',
            field: 'location',
            filterPlaceholder: 'Enter location'
        },
    ];

    const validateData = ({name, city, type, degree, openingYear, location}, callback = null, fallback = null) => {
        if (name && city && type &&degree && location && openingYear){
            callback();
        } else {
            toastr.info("Attention", "All field must be field in");
            fallback();
        }
    };

    const onSelectionChange = all =>{
        if (!isEmpty(all)){
            const stationNames = all.map(it => it.name).join();

            const options = [
                {
                    name: "meteo_posts",
                    method: "get",
                    type: `complex_selection${queryOptionsParser({table:"meteo_posts", key:"meteo_station", values: stationNames})}`
                },
                {
                    name: "employees",
                    method: "get",
                    type: `complex_selection${queryOptionsParser({table:"employees", key:"meteo_station", values: stationNames})}`
                },
            ];

            setStationsOptions(options);

            setWizardNavigation({...wizNav, nextDisabled: false});
        }else {
            setStationsOptions([]);
            setWizardNavigation({...wizNav, nextDisabled: true, nextCallback: null, prevCallback: null})
        }
    };

    const onRowClick = (e, it) =>{
        const index = stations.indexOf(it);
        stations[index].tableData.checked = !stations[index].tableData.checked;

        onSelectionChange(stations.filter(it => it.tableData.checked))
    };

    return (
        <MaterialTable
            title="Meteo Stations"
            columns={columns}
            data={stations}
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
                            createData({table:"meteo_stations"}, newData, "METEO_STATION");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "meteo_stations", key: "name"}, newData, "METEO_STATION");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"meteo_stations", key:"name", value: data.name}, "METEO_STATION");
                        resolve();
                    }),
            } : {}}
        />
    );
};


export default memo(StationsComponent)
