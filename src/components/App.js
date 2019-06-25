import React, { Component } from "react";
import { Container, Nav } from "./styled-components";
import FusionCharts from "fusioncharts";
import "./charts-theme";
import axios from "axios";
import UserImg from "../assets/images/user-img-placeholder.jpeg";

class App extends Component {
  state = {
    sheetData: [],
    print: false,
    currentHighlight: null
  };

  componentDidMount() {

    this.setState({
      loader: true
    });

    axios
      .get("http://localhost:4000/data")
      .then(res => {
        const merged = [...this.state.sheetData, ...res.data];
        this.setState({ sheetData: merged, loader: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { sheetData } = this.state;

    const currentHour = new Date().getHours();
    const times = sheetData.map(item => item["ros-schedule"]);
    let trigger = null;

    for (let i = 0; i < times.length; i++) {
      let currStr = JSON.stringify(times[i]);
      const subtime = currStr.substring(1, 3);

      console.log("THis is current time =====>", currentHour);
      console.log("THis is substring =====>", parseInt(subtime));

      if (parseInt(subtime) === currentHour) {
        trigger = true;
      }
    }

    return (
      <Container>
        {/* static navbar - top */}
        <Nav className="navbar navbar-expand-lg fixed-top is-white is-dark-text">
          <Container className="navbar-brand h1 mb-0 text-large font-medium">
            Production name
          </Container>
          <Container className="navbar-nav ml-auto">
            <Container className="user-detail-section">
              <span className="pr-2">custom logo</span>
              <span className="img-container">
                <img src={UserImg} className="rounded-circle" alt="user" />
              </span>
            </Container>
          </Container>
        </Nav>
        <Nav className="navbar fixed-top nav-secondary is-dark is-light-text">
          <Container className="text-medium">Summary</Container>
          <Container className="navbar-nav ml-auto" />
        </Nav>

        <Container className="container-fluid pr-5 pl-5 pt-5 pb-5">
          <Container className="row">
            <Container className="col-lg-6 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-large">
                    Title
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-medium">
                  {sheetData.map(item => (
                    <ul key={item}>
                      <li>{item.title}</li>
                    </ul>
                  ))}
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-6 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-large">
                    {trigger ? <p>Current Active Time: <span style={{ color: trigger ? 'yellow' : null }}>{currentHour}:00</span></p> : <p>Schedule</p>}
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-medium">
                  {sheetData.map(item => (
                    <ul>
                      <li>{item["ros-schedule"]}</li>
                    </ul>
                  ))}
                </Container>
              </Container>
            </Container>

            <Container className="col-lg-12 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-large">
                    Info Column 1
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-medium">
                  {sheetData.map(item => (
                    <ul>
                      <li>{item.infocolumn1}</li>
                    </ul>
                  ))}
                </Container>
              </Container>
            </Container>
            <Container className="col-lg-12 col-sm-6 is-light-text mb-4">
              <Container className="card grid-card is-card-dark">
                <Container className="card-heading">
                  <Container className="is-dark-text-light letter-spacing text-large">
                    Information
                  </Container>
                </Container>

                <Container className="card-value pt-4 text-x-medium">
                  {sheetData.map(item => (
                    <ul>
                      <li>{item["ros-description"]}</li>
                    </ul>
                  ))}
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default App;
