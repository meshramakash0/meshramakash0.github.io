import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Card, CardBody, CardHeader, Col, Row, Table, Nav, NavItem, NavLink, Badge, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import LoanItems from './LoanItems';

const axios = require('axios');


class Loans extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      loans: [],
      activeTab: 'A',

    };
  }

  componentWillMount() {
    axios.get('http://localhost/healthfin1.1/api/2/get/getLoansNew.php?flag=A')
      .then((response) => {
        // handle success
        // console.log(response.data.data);
        this.setState({
          loans: response.data.data,
        });
        // console.log(this.state.loans);

      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  toggle(tab) {

    axios.get('http://localhost/healthfin1.1/api/2/get/getLoansNew.php?flag=' + tab)
      .then((response) => {
        // handle success
        // console.log(response.data.data);
        this.setState({
          loans: response.data.data,
        });
        // console.log(this.state.loans);

      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });


    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">

            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'A' })}
                  onClick={() => { this.toggle('A'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span className={this.state.activeTab === 'A' ? '' : 'd-none'}> </span>{'\u00A0'}
                  <Badge color="success"> New Loan</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'B' })}
                  onClick={() => { this.toggle('B'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span
                    className={this.state.activeTab === 'B' ? '' : 'd-none'}> </span>{'\u00A0'}
                  <Badge color="success"> HF Processing</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'C' })}
                  onClick={() => { this.toggle('C'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span className={this.state.activeTab === 'C' ? '' : 'd-none'}> </span>
                  <Badge color="success"> Bank Processing</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'D' })}
                  onClick={() => { this.toggle('D'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span className={this.state.activeTab === 'D' ? '' : 'd-none'}> </span>
                  <Badge color="success"> Bank Approved</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'E' })}
                  onClick={() => { this.toggle('E'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span className={this.state.activeTab === 'E' ? '' : 'd-none'}> </span>
                  <Badge color="success"> Bank Query</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'G' })}
                  onClick={() => { this.toggle('G'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span className={this.state.activeTab === 'G' ? '' : 'd-none'}> </span>
                  <Badge color="success"> HF Rejected</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'F' })}
                  onClick={() => { this.toggle('F'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span className={this.state.activeTab === 'F' ? '' : 'd-none'}> </span>
                  <Badge color="success"> Bank Rejected</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'H' })}
                  onClick={() => { this.toggle('H'); }}
                >
                  <i className="cui-box icons font-2xl d-block mt-2"></i> <span className={this.state.activeTab === 'H' ? '' : 'd-none'}> </span>
                  <Badge color="success"> Disbursed</Badge><Badge pill color="danger">29</Badge>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="A">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> New Loan
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No new loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="B">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Healthfin Processing
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="C">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Bank Processing
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="D">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> bank Approved
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="E">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Bank Query
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="G">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Healthfin Rejected
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="F">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Bank Rejected
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="H">
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Disbursed
                  </CardHeader>
                  <CardBody>
                    {this.state.loans ?
                      <Table responsive striped>
                        <thead>
                          <tr>
                            <th>Loan Id</th>
                            <th>Applicant Name</th>
                            <th>Loan Amount</th>
                            <th>Mobile Number</th>
                            <th>Hospital City</th>
                            <th>Hospital Name</th>
                            <th>Financial Associates</th>
                            <th>Application Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <LoanItemsByPass loan={this.state.loans} />
                      </Table>
                      : "No loans to show.."}
                    {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                  </CardBody>
                </Card>
              </TabPane>
            </TabContent>



          </Col>
        </Row>
      </div >
    );
  }
}

class LoanItemsByPass extends Component {

  render() {

    console.log(this.props.loan);

    var loanItem;
    if (this.props.loan) {
      loanItem = this.props.loan.map((loanItem) => {
        // console.log(loanItem);
        return (
          <LoanItems key={loanItem.id} loan={loanItem} />
        );
      });
    }

    return (
      <tbody>
        {loanItem}
      </tbody>
    );
  }
}


export default Loans;
