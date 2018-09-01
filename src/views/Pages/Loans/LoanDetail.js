import React, { Component } from 'react';
import { Row } from 'reactstrap';
import LoanDetailItem from './LoanDetailItem';
const axios = require('axios');

class LoanDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      error: null,
      isLoaded: false,
      loanDetail: [],
      loanStatus: [],
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

  componentWillMount() {

    var id = this.props.match.params.id;
    
    axios.get('http://localhost/healthfin1.1/api/get/getLoanDetails.php?id=' + id)
      .then((response) => {
        // handle success
        console.log(response.data.data);
        this.setState({
          loanDetail: response.data.data,
        });
        
        this.getLoanHistory(id);

      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  getLoanHistory = (id) => {

    console.log(id);
 
    axios.get('http://localhost/healthfin1.1/api/2/get/getLoanStatusHistory.php?id=' + id)
      .then((response) => {
        // handle success
        // console.log(response.data.data[0]);
        this.setState({
          loanStatus: response.data.data,
        });
        console.log(this.state.loanStatus);

      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  render() {

    return (
      <div className="animated fadeIn">
        {this.state.loanDetail ? <LoanDetailItemsByPass loan={this.state.loanDetail} /> : null}
      </div>
    );
  }
}

class LoanDetailItemsByPass extends Component {

  render() {

    console.log(this.props.loan);

    var loanItem;
    if (this.props.loan) {
      loanItem = this.props.loan.map((loanItem) => {
        // console.log(loanItem);
        return (
          <LoanDetailItem key={loanItem.id} loan={loanItem} />
        );
      });
    }

    return (
      <Row>
        {loanItem}
      </Row>
    );
  }
}


export default LoanDetail;