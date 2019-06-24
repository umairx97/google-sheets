import React, { Component } from "react";
import { Container, Nav } from "./styled-components";

// fusioncharts
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import Maps from "fusioncharts/fusioncharts.maps";
import USARegion from "fusionmaps/maps/es/fusioncharts.usaregion";
import ReactFC from "react-fusioncharts";
import "./charts-theme";
import axios from 'axios'
// import config from "./config";
// import Dropdown from "react-dropdown";
// import formatNum from "./format-number";

import UserImg from "../assets/images/user-img-placeholder.jpeg";



ReactFC.fcRoot(FusionCharts, Charts, Maps, USARegion);




class App extends Component {


  state = {
    sheetData: [],
    print: false,

  }



  // componentDidMount() {
  //   axios.get('http://localhost:4000/data').then(res => {
  //     console.log(res.data);
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  componentWillMount() {
    this.setState({
      loader: true
    })

    axios.get('http://localhost:4000/data').then(res => {
      const merged = [...this.state.sheetData, ...res.data];
      this.setState({ sheetData: merged, loader: false });
    }).catch(err => {
      console.log(err)
    })

  }


  render() {
    const { sheetData } = this.state
    return (
      <Container>
        {/* static navbar - top */}
        <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          <Container className="navbar-brand h1 mb-0 text-large font-medium">
            Online Retail Dashboard
          </Container>
          <Container className="navbar-nav ml-auto">
            <Container className="user-detail-section">
              <span className="pr-2">Hi, Sean</span>
              <span className="img-container">
                <img src={UserImg} className="rounded-circle" alt="user" />
              </span>
            </Container>
          </Container>
        </Nav>

        {/* static navbar - bottom */}
        <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
          <Container className="text-medium">Summary</Container>
          <Container className="navbar-nav ml-auto">
            {/* <Dropdown
              className="pr-2 custom-dropdown"
              options={this.state.dropdownOptions}
              onChange={this.updateDashboard}
              value={this.state.selectedValue}
              placeholder="Select an option"
            /> */}
          </Container>
        </Nav>

        {/* content area start */}
        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          {/* row 1 - revenue */}
          <Container className="row">
            <Container className="col-lg-6 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Title
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">

                  {sheetData.map(item => (
                    <ul key = {item}>
                      <li>{item.title}</li>
                    </ul>
                  ))}


                </Container>
              </Container>
            </Container>

            <Container className="col-lg-6 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Schedule
                  </Container>
                  <Container className="card-heading-brand">
                    <i className="fab fa-amazon text-large" />
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">

                  {sheetData.map(item => (
                    <ul>
                      <li>{item['ros-schedule']}</li>
                    </ul>
                  ))}

                </Container>
              </Container>
            </Container>

            <Container className="col-lg-6 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Info Column 1
                  </Container>
                  <Container className="card-heading-brand">
                    <i className="fab fa-etsy text-medium" />
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  {/* {this.state.etRevenue} */}


                  {sheetData.map(item => (
                    <ul>
                      <li>{item.infocolumn1}</li>
                    </ul>
                  ))}

                </Container>
              </Container>
            </Container>

            <Container className="col-md-6 col-lg-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading mb-3">
                  <Container className="is-dark-text-light letter-spacing text-small">
                  Info Column 2
                  </Container>
                </Container>
                <Container className="card-value pt-4 text-x-large">
                  {/* {this.state.productViews} */}
                  {sheetData.map(item => (
                    <ul>
                      <li>{item.infocolumn2}</li>
                    </ul>
                  ))}

                </Container>
              </Container>
            </Container>



            <Container className="col-lg-12 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-small">
                    Information
                  </Container>
                  <Container className="card-heading-brand">
                    <i className="fab fa-ebay text-x-large logo-adjust" />
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-large">
                  {/* <span className="text-large pr-1">$</span> */}

                  {sheetData.map(item => (
                    <ul>
                      <li>{item['ros-description']}</li>
                    </ul>
                  ))}
                </Container>
              </Container>
            </Container>

            
          </Container>

          {/* row 2 - conversion */}

          {/* row 3 - orders trend */}
        </Container>
      </Container>
    );
  }
}

export default App;
