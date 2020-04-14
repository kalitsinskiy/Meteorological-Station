import React, {Component} from "react";

class ErrorBoundary extends Component {
    state = {
        error: null,
        errorInfo: null
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="global_error">
                    <h2>Something went wrong, please try reload page and inform us</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary tabIndex="2"><span>Description</span></summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;