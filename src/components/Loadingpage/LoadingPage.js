import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/loadingpage.css';

export default function LoadingPage() {
    return (<>
        <div className="loadingpage">
            <p className="loadingpage_message">Gathering feed data...</p>
            <CircularProgress color='primary' size={100} thickness={2} />
        </div>
    </>)
}
