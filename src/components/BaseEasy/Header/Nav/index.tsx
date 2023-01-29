import styled from 'styled-components'

export const Nav = styled.nav`
    display: ${props => props.nav};
    justify-content: space-around;
    align-items: center;
    margin-top: 7em;
    @media only screen and (max-width: 600px){
    display: none;
}
`