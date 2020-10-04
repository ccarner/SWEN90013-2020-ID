import React from 'react'

export default function Header() {
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="index3.html" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Contact</a>
                    </li>
                </ul>
                {/* SEARCH FORM */}
                <form className="form-inline ml-3">
                    <div className="input-group input-group-sm">


                    </div>
                </form>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Messages Dropdown Menu */}

                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments" />
                        <span className="badge badge-danger navbar-badge">3</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">



                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                    </div>




                    {/* Notifications Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell" />
                            <span className="badge badge-warning navbar-badge">15</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider" />


                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>

                </ul>
            </nav>
        </div >

    )
}
