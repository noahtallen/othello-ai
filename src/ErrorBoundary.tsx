import * as React from 'react'
import styled from 'styled-components'
import StartButton from './StartButton';

type ErrorProps = {
    setIsPlaying: (isPlaying: boolean) => void
}
type ErrorState = {
    errorMessage: null | string
}

export default class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
    state: ErrorState = {
        errorMessage: null
    }

    backToStart = () => {
        this.props.setIsPlaying(false)
    }

    render() {
        const { errorMessage } = this.state
        if (errorMessage) {
            // Show Error Message:
            return (
                <Container>
                    <Error>An unexpected error occured: {errorMessage}</Error>
                    <StartButton onClick={this.backToStart}>Back to Start</StartButton>
                </Container>
            )
        }

        // Otherwise show children:
        return this.props.children; 
    }
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { errorMessage: error.message };
    }
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
`
const Error = styled.div`
    color: red;
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    padding-left: 20px;
    margin: 50px;
`