import React, {memo} from 'react';
import MaterialTable from 'material-table';
import {isEqual, isEmpty} from 'lodash';
import {toastr} from 'react-redux-toastr';
import queryOptionsParser from "../helpers/queryOptionsParser";
import arrayToObject from "../helpers/arrayToObject";

const MeteoPostsComponent = (props) =>{
    const {
        meteoposts,
        stations,
        createData,
        editData,
        deleteData,
        setWizardNavigation,
        wizNav,
        setMeteoPostsOptions,
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
            lookup: isEmpty(stations) ? {} : arrayToObject(stations, "name"),
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

    const onSelectionChange = (all) =>{
        if (!isEmpty(all)){
            const postsNames = all.map(it => it.name).join();

            const options = [
                {
                    name: "meteo_grounds",
                    method: "get",
                    type: `complex_selection${queryOptionsParser({table:"meteo_grounds", key:"meteo_post", values: postsNames})}`
                },
                {
                    name: "transport",
                    method: "get",
                    type: `complex_selection${queryOptionsParser({table:"transport", key:"meteo_post", values: postsNames})}`
                },
            ];

            setMeteoPostsOptions(options);
            setWizardNavigation({...wizNav, nextDisabled: false});
        }else {
            setWizardNavigation({...wizNav, nextDisabled: true})
        }
    };

    const onRowClick = (e, it) =>{
        const index = meteoposts.indexOf(it);
        meteoposts[index].tableData.checked = !meteoposts[index].tableData.checked;

        onSelectionChange(meteoposts.filter(it => it.tableData.checked))
    };


    return (
        <MaterialTable
            title="Meteo Posts"
            columns={columns}
            data={meteoposts}
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
                            createData({table:"meteo_posts"}, newData, "METEO_POST");
                            resolve();
                        }, reject)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        if (isEqual(newData, oldData)) {
                            reject();
                        }else {
                            validateData(newData, () =>{
                                editData({table: "meteo_posts", key: "name"}, newData, "METEO_POST");
                                resolve()
                            }, reject)
                        }
                    }),
                onRowDelete: data =>
                    new Promise(resolve => {
                        deleteData({table:"meteo_posts", key:"name", value: data.name}, "METEO_POST");
                        resolve();
                    }),
            } : {}}
        />
    );
};


export default memo(MeteoPostsComponent)
