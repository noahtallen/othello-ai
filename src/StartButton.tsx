import styled from 'styled-components'

const StartButton = styled.button`
    width: 200px;
    cursor: pointer;
    height: 50px;
    border-radius: 4px;
    background-color: black;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
    border: none;
    font-weight: bold;
    color: white;
    font-size: 1.2em;
    margin: auto;
    margin-top: 20px;
    &:hover {
        background-color: gray;
    }
`

export default StartButton