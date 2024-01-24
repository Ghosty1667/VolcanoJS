import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import { useVolcano } from "../compenents/data/VolcanoesAPI";
import Headlines from "../compenents/elements/Headlines";
import { MyMap } from "../compenents/elements/VolcanoMap";
import VolcanoNavBar from "../compenents/elements/VolcanoNavbar";
import VolcanoBar from "../compenents/elements/VolcanoBar"

export default function Volcanoes() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("title");
  const { loading, volcanoData, error, login } = useVolcano(id);


  return (
    <div>
      <VolcanoNavBar />
      <h1 className="p-3">Volcano Data</h1>
      {error === null && !loading ? (
        <div className="p-3">
          <Row className="bg-light ">
            <Col className="border">
              <Headlines  {...volcanoData} />
            </Col>
            <Col className=" border"  >
              < MyMap {...volcanoData} />
            </Col>
          </Row>
          {login ? <div className="centre"> <VolcanoBar {...volcanoData} /></div> : null}
        </div>)
        : (
          <p>Error: {error}</p>
        )
      }
      <Button
        color="info"
        size="sm"
        className="m-auto"
        onClick={() => navigate("/VolcanoList")}
      >
        Back
      </Button>
    </div >
  );
}
