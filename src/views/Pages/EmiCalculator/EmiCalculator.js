import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js';
import { Card, CardBody, CardFooter, CardColumns, CardHeader, FormGroup, Col, Label, Input, FormText, Button, Table } from 'reactstrap';

const options = {
  maintainAspectRatio: false,
  responsive: true,
  pieceLabel: {
    render: 'percentage',
    fontColor: '#FFFFFF',
    showActualPercentages: true,
  },
  legend: {
    position: 'left',
    labels: {
      boxWidth: 10
    }
  }
}

class EmiCalculator extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      scheme: [],
      subScheme: [],
      result: [
        {
          schemeName: "",
          subSchemeName: "",
          intRate: "",
          loanAmt: "",
          processingFee: "",
          GST: "",
          advEmiNum: "",
          advEmiNumPercent: "",
          blcEmiNum: "",
          totalEmiNum: "",
          EMI: "",
          advanceEMI: "",
          TDP: "",
          netDisbToApplicant: "",
          DBD: "",
          amtDisbToHosp: ""
        }
      ],
      schemeValue: "",
      subSchemeValue: "",
      showOccupation: false,
      occupation: "salaried",
      pie: {
        labels: [
          'Loan Amount',
          'Processing Fee',
          'GST',
          'EMI',
          'Advance EMI Amount',
          'Total Downpayment',
          'Net disbursment credited to applicant',
        ],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4dbd74',
              '#11bf2080',
              '#931bc3',
              '#0b06de',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4dbd74',
              '#11bf2080',
              '#931bc3',
              '#0b06de',
            ],
          }
        ],
      },
      display: false,
    }
  }

  componentWillMount() {
    this.setState({
      scheme: [
        {
          id: 1,
          name: "Non-Income-Tata"
        },
        {
          id: 2,
          name: "Income-Loan-Tap"
        },
        {
          id: 3,
          name: "Income-Arogya"
        },
        {
          id: 4,
          name: "Income-Zest"
        }
      ],
    });
  }

  changeScheme = e => {

    if (e.target.value === '1') {
      this.setState({
        subScheme: [
          {
            id: 1,
            name: "0% Interest",
          },
        ],
        [e.target.name]: e.target.value
      });
    } else if (e.target.value === '2') {
      this.setState({
        subScheme: [
          {
            id: 1,
            name: "0% Interest",
          },
          {
            id: 2,
            name: "24 Months",
          },
          {
            id: 3,
            name: "OD (3 months)",
          }
        ],
        [e.target.name]: e.target.value
      });
    } else if (e.target.value === '3') {
      this.setState({
        subScheme: [
          {
            id: 1,
            name: "0% Interest",
          },
          {
            id: 2,
            name: "23 Months",
          },
          {
            id: 3,
            name: "34 months",
          }
        ],
        [e.target.name]: e.target.value
      });
    } else if (e.target.value === '4') {
      this.setState({
        subScheme: [
          {
            id: 1,
            name: "0% Interest",
          },
          {
            id: 2,
            name: "24 Months",
          },
          {
            id: 3,
            name: "36 months",
          }
        ],
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        subScheme: []
      });
    }

  };

  changeSubScheme = e => {
    if (this.state.schemeValue === "2" && e.target.value === "2") {
      this.setState({
        [e.target.name]: e.target.value,
        showOccupation: true,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        showOccupation: false,
      });
    }

  };

  formValue = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })

  };

  changeOccupation = (occupation) => {
    this.setState({ occupation })
  };

  onSubmit = (e) => {
    console.log(this.state);
    var schemeName, subSchemeName, intRate, loanAmt, processingFee, GST, advEmiNum, blcEmiNum, totalEmiNum, EMI, advanceEMI, TDP, netDisbToApplicant, DBD, amtDisbToHosp;

    if (this.state.schemeValue === "1" && this.state.subSchemeValue === "1") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Non-Income-Tata";
        subSchemeName = "0% percent";
        intRate = 0;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.01);
        GST = Math.round(loanAmt * 0.065 * 0.18);
        advEmiNum = 3;
        blcEmiNum = 6;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = Math.round(loanAmt / totalEmiNum);
        advanceEMI = Math.round(EMI * advEmiNum);
        TDP = Math.round(processingFee + advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = Math.round(loanAmt * 0.0413);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }


    } else if (this.state.schemeValue === "2" && this.state.subSchemeValue === "1") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Loan-Tap";
        subSchemeName = "0% Intrest";
        intRate = 0;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.0118);
        GST = Math.round((processingFee * 0.18) + (loanAmt * 0.065 * 0.18));
        advEmiNum = 3;
        blcEmiNum = 6;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = Math.round(loanAmt / totalEmiNum);
        advanceEMI = Math.round(EMI * advEmiNum);
        TDP = Math.round(processingFee + advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = Math.round(loanAmt * 0.0375);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    } else if (this.state.schemeValue === "2" && this.state.subSchemeValue === "2" && this.state.occupation === "salaried") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Loan-Tap";
        subSchemeName = "24 Months";
        intRate = 5.5;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.0236);
        GST = Math.round((processingFee * 0.18) + (loanAmt * 0.065 * 0.18));
        advEmiNum = 6;
        blcEmiNum = 18;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = Math.round((loanAmt / 100000) * 4615);
        advanceEMI = Math.round(EMI * advEmiNum);
        TDP = Math.round(processingFee + advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = 0;
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    } else if (this.state.schemeValue === "2" && this.state.subSchemeValue === "2" && this.state.occupation === "selfEmp") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Loan-Tap";
        subSchemeName = "24 Months";
        intRate = 5.5;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.0236);
        GST = Math.round((processingFee * 0.18) + (loanAmt * 0.065 * 0.18));
        advEmiNum = 6;
        blcEmiNum = 18;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = Math.round((loanAmt / 100000) * 4650);
        advanceEMI = Math.round(EMI * advEmiNum);
        TDP = Math.round(processingFee + advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = 0;
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    } else if (this.state.schemeValue === "2" && this.state.subSchemeValue === "3") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Loan-Tap";
        subSchemeName = "OD (3 Months)";
        intRate = 0;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.0236);
        GST = Math.round((processingFee * 0.18) + (loanAmt * 0.065 * 0.18));
        advEmiNum = 0;
        blcEmiNum = 0;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = 0;
        advanceEMI = 0;
        TDP = 0;
        netDisbToApplicant = Math.round(loanAmt);
        DBD = Math.round(loanAmt * 0.0375);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    } else if (this.state.schemeValue === "3" && this.state.subSchemeValue === "1") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Arogya";
        subSchemeName = "0% Interest";
        intRate = 0;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round((loanAmt * 0.0236) + 500);
        GST = Math.round(loanAmt * 0.065 * 0.18);
        advEmiNum = 3;
        blcEmiNum = 6;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = Math.round(loanAmt / totalEmiNum);
        advanceEMI = Math.round(EMI * advEmiNum);
        TDP = Math.round(EMI * advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = Math.round(loanAmt * 0.048);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        })
      }
    } else if (this.state.schemeValue === "3" && this.state.subSchemeValue === "2") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Arogya";
        subSchemeName = "23 Months";
        intRate = 0.05;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round((loanAmt * 0.0236) + 500);
        GST = Math.round(loanAmt * 0.065 * 0.18);
        advEmiNum = 7;
        blcEmiNum = 16;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = Math.round((((loanAmt * 0.05) * 23 / 12) + loanAmt) / 23);
        advanceEMI = Math.round(EMI * advEmiNum);
        TDP = Math.round(EMI * advEmiNum);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = Math.round(loanAmt * 0.0285);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        })
      }
    } else if (this.state.schemeValue === "3" && this.state.subSchemeValue === "3") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Arogya";
        subSchemeName = "34 Months";
        intRate = 6;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round((loanAmt * 0.0236) + 500);
        GST = Math.round(loanAmt * 0.065 * 0.18);
        advEmiNum = 9;
        blcEmiNum = 25;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = Math.round((((loanAmt * 0.06) * 34 / 12) + loanAmt) / 34);
        advanceEMI = Math.round(EMI * advEmiNum);
        TDP = Math.round(EMI * advEmiNum);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = Math.round(loanAmt * 0.0325);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    } else if (this.state.schemeValue === "4" && this.state.subSchemeValue === "1") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Zest";
        subSchemeName = "0% Interest";
        intRate = 0;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.02);
        GST = Math.round(processingFee * 0.18);
        advEmiNum = 3;
        blcEmiNum = 6;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = "";
        advanceEMI = Math.round(loanAmt * 0.33);
        TDP = Math.round(processingFee + advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = Math.round(loanAmt * 0.0375);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    } else if (this.state.schemeValue === "4" && this.state.subSchemeValue === "2") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Zest";
        subSchemeName = "24 Months";
        intRate = 0.05;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.02);
        GST = Math.round(processingFee * 0.18);
        advEmiNum = 6;
        blcEmiNum = 18;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = "";
        advanceEMI = Math.round(loanAmt * 0.25);
        TDP = Math.round(processingFee + advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = Math.round(loanAmt * 0.0175);
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    } else if (this.state.schemeValue === "4" && this.state.subSchemeValue === "3") {
      if (!this.state.loanAmt) {
        alert("Please enter loan amount");
      } else {
        schemeName = "Income-Zest";
        subSchemeName = "36 Months";
        intRate = 0.065;
        loanAmt = parseInt(this.state.loanAmt);
        processingFee = Math.round(loanAmt * 0.02);
        GST = Math.round(processingFee * 0.18);
        advEmiNum = 9;
        blcEmiNum = 27;
        totalEmiNum = advEmiNum + blcEmiNum;
        EMI = "";
        advanceEMI = Math.round(loanAmt * 0.25);
        TDP = Math.round(processingFee + advanceEMI);
        netDisbToApplicant = Math.round(loanAmt - TDP);
        DBD = 0;
        amtDisbToHosp = Math.round(netDisbToApplicant - DBD);

        this.setState({
          result: [
            {
              schemeName: schemeName,
              subSchemeName: subSchemeName,
              intRate: intRate,
              loanAmt: loanAmt,
              processingFee: processingFee,
              GST: GST,
              advEmiNum: advEmiNum,
              blcEmiNum: blcEmiNum,
              totalEmiNum: totalEmiNum,
              EMI: EMI,
              advanceEMI: advanceEMI,
              TDP: TDP,
              netDisbToApplicant: netDisbToApplicant,
              DBD: DBD,
              amtDisbToHosp: amtDisbToHosp
            }],
          pie: {
            datasets: [
              {
                data: [loanAmt, processingFee, GST, EMI, advanceEMI, TDP, amtDisbToHosp],
              }
            ]
          },
          display: true,
        });
      }
    }
  }

  render() {

    return (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Emi Calculator
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="selectSm">Select Scheme</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="schemeValue" id="SelectLm" bsSize="sm" onChange={e => this.changeScheme(e)}>
                    <option value="0">Please select Scheme</option>
                    {this.state.scheme.map((schemeOpt) => {
                      return <option key={schemeOpt.id} value={schemeOpt.id}>{schemeOpt.name}</option>
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="selectSm">Select sub-scheme</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="subSchemeValue" id="SelectLm" bsSize="sm" onChange={e => this.changeSubScheme(e)}>
                    <option value="0">Please select sub-scheme</option>
                    {this.state.subScheme.map((subSchemeOpt) => {
                      return <option key={subSchemeOpt.id} value={subSchemeOpt.id}>{subSchemeOpt.name}</option>
                    })}
                  </Input>
                </Col>
              </FormGroup>
              {this.state.showOccupation ? <Occupation changeOccupation={this.changeOccupation} /> : null}
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Enter Loan Amount</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="number" id="text-input" name="loanAmt" placeholder="Enter loan amount" onChange={e => this.formValue(e)} />
                  <FormText color="muted">Amount should be in rupees(₹)</FormText>
                </Col>
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary" onClick={() => this.onSubmit()}><i className="fa fa-dot-circle-o"></i> Submit</Button>
              {/* <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button> */}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              Pie Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  {/* <small className="text-muted">docs</small> */}
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <Pie data={this.state.pie} height={215} options={options} />
            </CardBody>

          </Card>
        </CardColumns>

        {this.state.display ?
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Result
                            </CardHeader>
            <CardBody>
              <Table responsive striped>
                <tbody>
                  <tr>
                    <th>Scheme Name</th>
                    <td>{this.state.result[0].schemeName}</td>
                    <th>Sub-Scheme Name</th>
                    <td>{this.state.result[0].subSchemeName}</td>
                  </tr>
                  <tr>
                    <th>Loan Amount</th>
                    <td>{this.state.result[0].loanAmt}</td>
                    <th>Interest Rate</th>
                    <td>{this.state.result[0].intRate}</td>
                  </tr>
                  <tr>
                    <th>Processing Fee</th>
                    <td>{this.state.result[0].processingFee}</td>
                    <th>GST</th>
                    <td>{this.state.result[0].GST}</td>
                  </tr>
                  <tr>
                    <th>EMI</th>
                    <td>{this.state.result[0].EMI}</td>
                    <th>Advance EMI Number</th>
                    <td>{this.state.result[0].advEmiNum}</td>
                  </tr>
                  <tr>
                    <th>Balance EMI Number</th>
                    <td>{this.state.result[0].blcEmiNum}</td>
                    <th>Advance EMI Amount</th>
                    <td>{this.state.result[0].advanceEMI}</td>
                  </tr>
                  <tr>
                    <th>Total Downpayment</th>
                    <td>{this.state.result[0].TDP}</td>
                    <th>Net disbursment credited to applicant</th>
                    <td>{this.state.result[0].netDisbToApplicant}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
          : ""}
      </div >
    );
  }
}

class Occupation extends Component {
  render() {
    return (
      <FormGroup row>
        <Col md="3">
          <Label>Occupation</Label>
        </Col>
        <Col md="9">
          <FormGroup check inline>
            <Input className="form-check-input" type="radio" id="inline-radio1" name="occupation" value="salaried" onClick={(e) => this.props.changeOccupation(e.target.value)} defaultChecked />
            <Label className="form-check-label" check htmlFor="inline-radio1">Salaried</Label>
          </FormGroup>
          <FormGroup check inline>
            <Input className="form-check-input" type="radio" id="inline-radio2" name="occupation" value="selfEmp" onClick={(e) => this.props.changeOccupation(e.target.value)} />
            <Label className="form-check-label" check htmlFor="inline-radio2">Self-employeed</Label>
          </FormGroup>
        </Col>
      </FormGroup>
    );
  }
}

export default EmiCalculator;
