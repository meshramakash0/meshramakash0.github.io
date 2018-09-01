import React, { Component } from 'react';
import { Button} from 'reactstrap';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

class LoanItems extends Component {
    render() {

        return (
            <tr>
                <td>HF{this.props.loan.id}</td>
                <td>{this.props.loan.applicant_fname} {this.props.loan.applicant_mname} {this.props.loan.applicant_lname}</td>
                <td>{this.props.loan.loanAmount}</td>
                <td>{this.props.loan.mobileNumber}</td>
                <td>{this.props.loan.hospital_city}</td>
                <td>{this.props.loan.hospital_name}</td>
                <td>{this.props.loan.username}</td>
                <td>{this.props.loan.reg_date}</td>
                <td>
                    {/* <Badge color="success">View</Badge> */}
                    <Button size="sm" color="ghost-success"><a href={"#/loans/" + this.props.loan.id}>View</a></Button>
                </td>
            </tr>
        );
    }
}


export default LoanItems;
