import React, {Component} from 'react';
import {toastr} from "react-redux-toastr";
import { ClipLoader } from 'react-spinners';

class Spinner extends Component{
    constructor(props){
        super(props);

        this.timeout = null
    }

    componentDidUpdate(prevProps){
        const {show, stopSpinner} = this.props;

        if(show !== prevProps.show){
            clearTimeout(this.timeout);

            if (show !== 0) {
                this.timeout = setTimeout(() => {
                    stopSpinner();
                    toastr.error("Error", "Please reload page or try again later");
                }, 330000);
            }
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            this.timeout = null
        }
    }

    render(){
        const { show } = this.props;

        return (
            <div className={`dimScreen ${show > 0  ? "" : "disabled"}`}>
                <div >
                    <ClipLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#FF0068'}
                        loading={show > 0}
                    />

                </div>
            </div>
        )
    }
}

export default Spinner
