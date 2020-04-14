import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty, clone} from 'lodash';
import {toastr} from 'react-redux-toastr';

import queryOptionsParser from '../helpers/queryOptionsParser';

const StationsComponent = (props) =>{
    const [data, setData] = useState([]);

    const {
        stations,
        getData,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        complexRequest
    } = props;

    useEffect(() =>{setData(stations)},[stations]);

    useEffect(() =>{
        getData("meteo_stations", "METEO_STATIONS")
    },[getData]);

    const columns = [
        {
            title: 'Name',
            field: 'name',
            filterPlaceholder: 'Enter name'
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

            setWizardNavigation({
                ...wizNav,
                nextDisabled: false,
                nextCallback: () => complexRequest(options, "GET_METEO_POSTS_AND_EMPLOYEES",
                    setWizardNavigation({nextDisabled: false, nextHidden: false, prevDisabled: false, prevHidden: false}))
            });
        }else {
            setWizardNavigation({...wizNav, nextDisabled: true, nextCallback: null, prevCallback: null})
        }
    };

    const onRowClick = (e, it) =>{
        const stations = clone(data);
        const index = stations.indexOf(it);
        stations[index].tableData.checked = !stations[index].tableData.checked;
        setData(stations);

        onSelectionChange(data.filter(it => it.tableData.checked))
    };

    return (
        <MaterialTable
            title="Meteo Stations"
            columns={columns}
            data={data}
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
            }}
        />
    );
};


export default StationsComponent
