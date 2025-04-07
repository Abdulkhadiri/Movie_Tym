import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './NavigationArrows.css';

const NavigationArrows = ({ prevPath, nextPath }) => {
    const navigate = useNavigate();

    return (
        <div className="nav-arrows">
            {/* Left Arrow (Previous Page) */}
            {prevPath && (
                <button className="nav-arrow left" onClick={() => navigate(prevPath)}>
                    <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                </button>
            )}
        </div>
    );
};

export default NavigationArrows;