import React from 'react';

function DataTableButtons() {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <div className="dt-buttons btn-group flex-wrap">
          <button className="btn btn-secondary buttons-copy buttons-html5" tabIndex="0" aria-controls="example1" type="button">
            <span>Copy</span>
          </button>
          <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex="0" aria-controls="example1" type="button">
            <span>CSV</span>
          </button>
          <button className="btn btn-secondary buttons-excel buttons-html5" tabIndex="0" aria-controls="example1" type="button">
            <span>Excel</span>
          </button>
          <button className="btn btn-secondary buttons-pdf buttons-html5" tabIndex="0" aria-controls="example1" type="button">
            <span>PDF</span>
          </button>
          <button className="btn btn-secondary buttons-print" tabIndex="0" aria-controls="example1" type="button">
            <span>Print</span>
          </button>
          <div className="btn-group">
            <button className="btn btn-secondary buttons-collection dropdown-toggle buttons-colvis" tabIndex="0" aria-controls="example1" type="button" aria-haspopup="true" aria-expanded="false">
              <span>Column visibility</span>
              <span className="dt-down-arrow"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-6">
        <div id="example1_filter" className="dataTables_filter">
          <label>Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example1" /></label>
        </div>
      </div>
    </div>
  );
}

export default DataTableButtons;
