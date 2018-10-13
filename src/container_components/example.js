import React from 'react';
import { connect } from 'react-redux';

import DownloadButton from '../presentational_components/DownloadButton';

const mapStateToProps = (state) => ({
    reports: state.reports.reports
})

let ReportsTable = ({
    reports
}) => {
    return (
        <div className='table-body'>
            { Object.entries(reports).map( report => {
                    report = report[1]
                    const date = new Date(report.date)
                    const humanDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
                    const readableDateTime = humanDate + ' ' + date.getHours() + ':' + date.getMinutes();
                    return (
                        <div className="table-row" key={ report.sessionID }>
                            <div className="cell report-date">{ readableDateTime }</div>
                            <div className='cell download'>
                                <DownloadButton url={ report.blockedEmailsLink } >Download</DownloadButton>
                            </div>
                            <div className='cell download'>
                                <DownloadButton url={ report.notBlockedEmailsLink } >Download</DownloadButton>
                            </div>
                            <div className='cell download'>
                                <DownloadButton url={ report.invalidEmailsLink } >Download</DownloadButton>
                            </div>
                        </div>
                    )
                }
            )}
        </div>
    )
}

ReportsTable = connect(
    mapStateToProps
)(ReportsTable)

export default ReportsTable