import React from 'react';
import { Link } from 'react-router-dom';

export function FeedBox({info}) {
    return (<>
        <Link to={`/${info.id}`} >
            <div className="feedbox_container">
                <div className="feedbox_name">

                </div>
                <div className="feedbox_price">

                </div>
            </div>
        </Link>
    </>)
}
