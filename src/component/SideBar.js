
import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class SideBar extends React.Component {

    /**
     * 
     */
    // Refactot this use navitem external component in flatlist or similar
    render() {
        return (
            <SideNav
                onSelect={(selected) => {
                    if (this.props.history) {
                        this.props.history.push(selected);
                    }
                }}
            >
                <SideNav.Nav defaultSelected="/">
                    <NavItem eventKey="/">
                        <NavIcon>
                        <svg className="bi bi-house-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z" clipRule="evenodd"/>
                        </svg>
                        </NavIcon>
                        <NavText>
                            Home
                      </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        )
    }
}

export default  SideBar;