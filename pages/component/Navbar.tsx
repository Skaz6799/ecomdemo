import React, { useState, useEffect } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // for navigation menu

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);   // automatically close on scroll
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMenuOpen]);
    return (
        <div className='navmain'>
            <div className='container customnav'>
                <div className='navlogo'>
                    <a className="navbar-brand" href="#">Flatlogic</a>
                </div>
                <div className={`navlink ${isMenuOpen ? '' : 'navhide'}`}>     { /* for class assign based on click */}
                    <div className='navlink1'>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Pages
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Page1</a></li>
                                    <li><a className="dropdown-item" href="#">Page2</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Shop
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Shop1</a></li>
                                    <li><a className="dropdown-item" href="#">Shop2</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Blog
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Blog1</a></li>
                                    <li><a className="dropdown-item" href="#">Blog2</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className='navlink2'>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active nav-text-end" aria-current="page" href="#"><i className="bi bi-search"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active nav-text-end" aria-current="page" href="#"><i className="bi bi-person"></i></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active nav-text-end" aria-current="page" href="#"><i className="bi bi-cart"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mobilenav' onClick={handleMenuToggle}>
                    <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} navmenu`}></i>
                </div>
            </div>
        </div>
    )
}

export default Navbar
