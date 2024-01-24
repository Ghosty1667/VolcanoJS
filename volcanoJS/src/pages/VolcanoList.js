import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css"
import { useState } from "react";
import { Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";
import VolcanoNavBar from '../compenents/elements/VolcanoNavbar';
import { useVolcanoes } from '../compenents/data/VolcanoesAPI';

import Dropdown from '../compenents/elements/Dropdown';


export default function Volcanoes() {
    const [country, setCountry] = useState("Japan");
    const [populatedWithin, setPopulatedWithin] = useState();

    let navigate = useNavigate();
    const { loading, volcanoData, error } = useVolcanoes(country, populatedWithin);

    const handleSubmit = (data) => {
        console.log(data)
        setCountry(data.country)
        setPopulatedWithin(data.populatedWithin)
    }

    const lColumns = [
        { headerName: "ID", field: "id" },
        { headerName: "Name", field: "name" },
        { headerName: "Country", field: "country" },
        { headerName: "Region", field: "region" },
        { headerName: "Subregion", field: "subregion" }
    ];

    return (
        <div >
            <VolcanoNavBar />
            <div className='p-5'>
                {error === null && !loading ? (
                    <div className='bg-light border w-80 m-auto text-center p-3'>
                        <h1>Volcanoes</h1>
                        <p>
                            <Badge color="success">{volcanoData.length}</Badge> Volcanoes found
                        </p>
                        <Dropdown onSubmit={handleSubmit} />
                        <div className="ag-theme-balham-dark App" style={{ height: "320px", width: "80%", margin: "auto" }}>
                            <AgGridReact columnDefs={lColumns} rowData={volcanoData} pagination={true} paginationPageSize={10} onRowClicked={(row) => navigate(`/Volcanoes?title=${row.data.id}`)} />
                        </div>
                        <strong>Click on a entry to view more information</strong>
                    </div>
                ) : error ? <p>Error :{error}</p> : null}
            </div>

        </div>
    );
}