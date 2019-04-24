import * as React from 'react'
import styled from 'styled-components'

type ErrorState = {
    errorMessage: null | string
}

export default class ErrorBoundary extends React.Component<{}, ErrorState> {
    state: ErrorState = {
        errorMessage: null
    }
    render() {
        const { errorMessage } = this.state
        if (errorMessage) {
            // Show Error Message:
            return <Error>An unexpected error occured: {errorMessage}</Error>
        }

        // Otherwise show children:
        return this.props.children; 
    }
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { errorMessage: error.message };
    }
}

const Error = styled.div`
    color: red;
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    padding-left: 20px;
`