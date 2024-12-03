import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom';

const SubMenu = ({ item, location }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
                <div
                    key={item.title}
                    className={`sidebar-menu ${location.pathname === item.path ? 'sidebar-menu__active' : ''}`}
                    onClick={item.subNav && showSubnav}
                >
                    <Link className="sidebar-menu__link" to={item.subNav ? location.pathname : item.path}>
                        <div className='title-panel'>
                            <div className='title-panel__icon'>
                                {item.icon}
                            </div>
                            <div className='title-panel__title'>{item.title}</div>
                        </div>
                        <div>
                            {item.subNav && subnav
                                ? item.iconOpened
                                : item.subNav
                                ? item.iconClosed
                                : null
                            }
                        </div>
                    </Link>
                </div>
                {subnav && item.subNav.map((item, index) => (
                    <div
                    key={item.title}
                    className={`sidebar-menu sidebar-menu__sub ${location.pathname === item.path ? 'sidebar-menu__active' : ''}`}
                    onClick={item.subNav && showSubnav}
                    >
                        <Link className="sidebar-menu__link" to={item.path}>
                            <div className='title-panel'>
                                <div className='title-panel__icon'>
                                    {item.icon}
                                </div>
                                <div className='title-panel__title'>{item.title}</div>
                            </div>
                        </Link>
                    </div>
                ))}
        </>
    );
};

export default withRouter(SubMenu);