import React from 'react'
import logo from '../../assets/logo.jpg'
import './index.less'

interface UserLayoutProps {
    children: (React.ReactElement | null)[]
}

const UserLayout: React.FC<UserLayoutProps> = props => {
    const { children } = props
    return (
        <div className="users-container">
            <div className="users-content">
                <div className="users-logo">
                    <img className="users-logo-img" src={logo} alt="logo" width="48" />
                </div>
                {children}
            </div>
        </div>
    )
}

export default UserLayout
