import React from 'react'
import { Button } from '@material-ui/core'

export default function Menu() {
    return (
        <aside class="main-sidebar">
            <section class="sidebar">
                <div class="user-panel">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                        <span className="brand-text font-weight-light"><strong>Admin Dashbord</strong></span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Ash Alsaqer </a>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
                                <li className="nav-item has-treeview menu-open">
                                    <a href="#" className="nav-link active">
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Dashboard
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item has-treeview">
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/UI/general.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>General</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-edit" />
                                        <p>
                                            Survey
                                        </p>
                                    </a>

                                </li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-table" />
                                        <p>
                                            Users
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">

                                    </ul>
                                </li>
                                <li className="nav-item has-treeview">

                                </li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-book" />
                                        <p>
                                            Action Plans
                                        </p>
                                    </a>

                                </li>
                                <li className="nav-item has-treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon far fa-plus-square" />
                                        <p>
                                            Extras
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                    </ul>
                                </li>
                            </ul>
                            <br />
                            <br />
                            <br />
                            <Button variant="contained">Log Out</Button>

                        </nav>
                        {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </div>
            </section>
        </aside >

    )
}
