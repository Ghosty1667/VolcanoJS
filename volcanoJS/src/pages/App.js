import '../App.css';
import VolcanoNavBar from "../compenents/elements/VolcanoNavbar";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Row, Col, UncontrolledAccordion } from "reactstrap"


function App() {
  return (
    <div className='App'>
      <VolcanoNavBar />
      <div className='bg-light p-3 m-5'>
        <Row>
          <h1> Volcanoes</h1>
        </Row>
        <Row>
          <Col className='border '>
            <div className='p-5 text-start'>
              <h3>What is the voclanoes of the world? </h3>
              <p>Website built for displaying data from many volcanoes around the world. To preview features of the site, view the features list on the left</p>
              <h3>FAQ</h3>
              <h5>Why create an account?</h5>
              <p>If you create an account it gives you more data on the many different volcanoes</p>
              <h5>How can I view this data?</h5>
              <p>Navigate to this data  <a href='/volcanoList'>here</a></p>
            </div>
          </Col>
          <Col>
            <div>
              <UncontrolledAccordion defaultOpen="1">
                <AccordionItem>
                  <AccordionHeader targetId="1">
                    Volcano List
                  </AccordionHeader>
                  <AccordionBody accordionId="1">
                    View a database of the world's many volcanoes. On the page use the dropdown to select then submit to view the many different volcanoes
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="2">
                    Volcanoes
                  </AccordionHeader>
                  <AccordionBody accordionId="2">
                    Click on any Volcano with the table to view more data on the them. If you want to see even more data, login!
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="3">
                    Accounts
                  </AccordionHeader>
                  <AccordionBody accordionId="3">
                    Register an account to view more data or login to already existing one!
                  </AccordionBody>
                </AccordionItem>
              </UncontrolledAccordion>
            </div>

          </Col>
        </Row>
      </div>
      <div >

      </div>
    </div >
  );
}

export default App;
