import React from 'react';
import PropTypes from 'prop-types';

const NetworkMembers = ({members}) => (
    <div>
        <header>
            Educator network members:
        </header>
        <ul>
            {members.map(member => (
                <li key={member}>{member}</li>
            ))}
        </ul>
    </div>
)

NetworkMembers.propTypes = {
    members: PropTypes.arrayOf(
        PropTypes.string
    )
}

export default NetworkMembers;