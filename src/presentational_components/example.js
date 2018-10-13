import React from 'react';

import ReportsTable from '../container_components/ReportsTable';

const HistoricalReports = () => {
    return (
        <div className="email-report">
            <div className="module-header">
                <h1>Account Reports</h1>
            </div>
            <div className="table-wrapper">
                <div className="table-head">
                    <div className="table-row">
                        <div className="header-cell report-date">Reports Date</div>
                        <div className="header-cell download">Blocked Addresses</div>
                        <div className="header-cell download">Not Blocked Addresses</div>
                        <div className="header-cell download">Invalid Addresses</div>
                    </div>
                </div>
                <ReportsTable />
            </div>
        </div>
    )
}

export default HistoricalReports