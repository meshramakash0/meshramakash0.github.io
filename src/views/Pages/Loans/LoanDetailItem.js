import React, { Component } from 'react';
import classnames from 'classnames';
import { Badge, Col, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardHeader, CardBody, Table } from 'reactstrap';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

class LoanDetailItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            error: null,
            isLoaded: false,
            loanDetail: [],
        };

        this.toggle = this.toggle.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    render() {

        return (
            <Col xs="12" md="12" className="mb-4">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Loan Status
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Scheme
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Patient Details
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '4' })}
                            onClick={() => { this.toggle('4'); }}
                        >
                            Applicant Details
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '5' })}
                            onClick={() => { this.toggle('5'); }}
                        >
                            Employment Details
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '6' })}
                            onClick={() => { this.toggle('6'); }}
                        >
                            Referral Details
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Loan status and remark
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Status</th>
                                            <th>Remark</th>
                                            <th>Updated By</th>
                                            <th>Updated Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.props.loan.id}</td>
                                            <td>
                                                <Badge color="success">Active</Badge>
                                            </td>
                                            <td>test ramark</td>
                                            <td>Akash Meshram</td>
                                            <td>2018/01/21</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId="2">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Scheme detail
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Scheme Name</th>
                                            <th>Description</th>
                                            <th>Loan Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Zero percent</td>
                                            <td>9/3 SCHEME WITH ZERO PERCENT INTEREST TO CUSTOMER</td>
                                            <td>100000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId="3">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Patient detail
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <tbody>
                                        <tr>
                                            <th>Patient Name</th>
                                            <td>{this.props.loan.patient_fname} {this.props.loan.patient_mname} {this.props.loan.patient_lname}</td>
                                            <th>Procedure Name</th>
                                            <td>{this.props.loan.procedure_type}</td>
                                        </tr>
                                        <tr>
                                            <th>Doctor Name</th>
                                            <td>{this.props.loan.doctor_name}</td>
                                            <th>Critical</th>
                                            <td>{this.props.loan.isCritical}</td>
                                        </tr>
                                        <tr>
                                            <th>Patient Id</th>
                                            <td>{this.props.loan.patient_id}</td>
                                            <th>Patient Date of Birth</th>
                                            <td>{this.props.loan.patient_dob}</td>
                                        </tr>
                                        <tr>
                                            <th>Patient Mother's Name</th>
                                            <td>{this.props.loan.patient_mother_name}</td>
                                            <th>&nbsp;</th>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId="4">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Applicant detail
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <tbody>
                                        <tr>
                                            <th>Applicant Name</th>
                                            <td>{this.props.loan.applicant_fname} {this.props.loan.applicant_mname} {this.props.loan.applicant_lname}</td>
                                            <th>Adhar Card Number</th>
                                            <td>{this.props.loan.adhar_card}</td>
                                        </tr>
                                        <tr>
                                            <th>PAN Number</th>
                                            <td>{this.props.loan.pan_number}</td>
                                            <th>Marital Status</th>
                                            <td>{this.props.loan.marital_status}</td>
                                        </tr>
                                        <tr>
                                            <th>DOB</th>
                                            <td>{this.props.loan.dob}</td>
                                            <th>Mobile</th>
                                            <td>{this.props.loan.mobileNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{this.props.loan.email_address}</td>
                                            <th>Address</th>
                                            <td>{this.props.loan.address_line1} {this.props.loan.address_line2}</td>
                                        </tr>
                                        <tr>
                                            <th>Resident City</th>
                                            <td>{this.props.loan.selectCityName}</td>
                                            <th>Pincode</th>
                                            <td>{this.props.loan.pincode}</td>
                                        </tr>
                                        <tr>
                                            <th>Residence Type</th>
                                            <td>{this.props.loan.typeOfResidence}</td>
                                            <th>Residence From</th>
                                            <td>{this.props.loan.currentResidenceDate}</td>
                                        </tr>
                                        <tr>
                                            <th>Relationship with Patient</th>
                                            <td>{this.props.loan.patient_relation_with_applicant}</td>
                                            <th>Number of Dependent	</th>
                                            <td>{this.props.loan.no_of_dependents}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Household Income</th>
                                            <td>{this.props.loan.total_household_income}</td>
                                            <th>Mother's Name</th>
                                            <td>{this.props.loan.mothers_name}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId="5">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Employment detail
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <tbody>
                                        <tr>
                                            <th>Occupation</th>
                                            <td>{this.props.loan.occupation}</td>
                                            <th>Company Name</th>
                                            <td>{this.props.loan.companyName}</td>
                                        </tr>
                                        <tr>
                                            <th>Office email id</th>
                                            <td>{this.props.loan.office_email_id}</td>
                                            <th>Company Address</th>
                                            <td>{this.props.loan.company_address_line1} {this.props.loan.company_address_line2}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{this.props.loan.company_cityName}</td>
                                            <th>Pincode</th>
                                            <td>{this.props.loan.company_pincode}</td>
                                        </tr>
                                        <tr>
                                            <th>Office Landline Number</th>
                                            <td>{this.props.loan.office_number}</td>
                                            <th>Working From</th>
                                            <td>{this.props.loan.workingFrom}</td>
                                        </tr>
                                        <tr>
                                            <th>Monthly Salary</th>
                                            <td>Rs. {this.props.loan.salaryPerMonth}</td>
                                            <th>Designation</th>
                                            <td>{this.props.loan.designation}</td>
                                        </tr>
                                        <tr>
                                            <th>Number Of Years In Company</th>
                                            <td>{this.props.loan.number_of_years_in_company}</td>
                                            <th>Salary Account With Bank Name</th>
                                            <td>{this.props.loan.salary_bank}</td>
                                        </tr>
                                        <tr>
                                            <th>Previous company name if any</th>
                                            <td>{this.props.loan.previous_company}</td>
                                            <th>Registration Date</th>
                                            <td>{this.props.loan.reg_date}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </TabPane>
                    <TabPane tabId="6">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Patient detail
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <tbody>
                                        <tr>
                                            <th>Reference 1 Name</th>
                                            <td>{this.props.loan.reference1_first_name} {this.props.loan.reference1_middle_name} {this.props.loan.reference1_last_name}</td>
                                            <th>Reference 1 Contact</th>
                                            <td>{this.props.loan.reference1_mobile}</td>
                                        </tr>
                                        <tr>
                                            <th>Reference 2 Name</th>
                                            <td>{this.props.loan.reference2_first_name} {this.props.loan.reference2_middle_name} {this.props.loan.reference2_last_name}</td>
                                            <th>Reference 2 Contact</th>
                                            <td>{this.props.loan.reference2_mobile}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </TabPane>
                </TabContent>
            </Col>
        );
    }
}


export default LoanDetailItem;