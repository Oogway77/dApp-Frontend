import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import ReactEcharts from "echarts-for-react";
import { connect } from "react-redux";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import ApiHelper from "../../util/ApiHelper";
import ReportCard from './components/ReportCard';

class AnalyticsOverview extends Component {
  state = {
    analyticsModalOpen: false,
    analyticsModalData: null,
    periodType: 'all',
    loading: false,
    analyticsData: null,
  };

  
  option = {
    title: {
        text: "",
        subtext: "events | actions | data_usage",
        //textStyle: { color: textColor }
    },
    tooltip: {
        trigger: "axis",
        // backgroundColor: backgroundColor,
        // textStyle: {
        //     color: textColor
        // }
    },
    // backgroundColor: backgroundColor,
    grid: {
        left: "3%",
        right: "4%",
        bottom: "1%",
        containLabel: true
    },
    legend: {
        show: true,
        data: ["events", "actions", "data_usage"],
        right: 50,
        top: 27,
        // textStyle: {
        //     color: textColor
        // }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
            "Jan 2023",
            "Feb 2023",
            "Mar 2023",
            "Apr 2023",
            "May 2023",
            "June 2023",
            "July 2023"
        ]
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            name: "events",
            data: [5, 3, 6, 8, 10, 22, 17],
            type: "line",
            smooth: true,
            itemStyle: {
                color: "green"
            }
        },
        {
            name: "actions",
            data: [15, 8, 2, 6, 11, 5, 32],
            type: "line",
            smooth: true,
            itemStyle: {
                color: "yellow"
            }
        },
        {
            name: "data_usage",
            data: [20, 34, 17, 18, 21, 42, 27],
            type: "line",
            smooth: true,
            itemStyle: {
                color: "red"
            }
        }
    ]
  };

  async loadData() {
    this.setState({loading: true});
    await ApiHelper.fetchOperators().then();
    await ApiHelper.fetchGateways(this.props.user.operatorId).then();
    await ApiHelper.fetchCells().then();
    await ApiHelper.fetchdSIMs().then();
    await ApiHelper.fetchPhones().then();
    await ApiHelper.fetchCameras().then();
    await ApiHelper.fetchOrders().then();
    await ApiHelper.fetchInvoices(this.props.user.operatorId).then();


    this.setState({
      loading: false,
      analyticsData: {
        operators: this.props.operators.length || 0,
        gateways: this.props.gateways.length || 0,
        cells: this.props.cells.length || 0,
        dsims: this.props.dsims.length || 0,
        phones: this.props.phones.length || 0,
        cameras: this.props.cameras.length || 0,
        orders: this.props.orders.length || 0,
        invoices: this.props.invoices.length || 0,
      }
    });
  }

  componentDidMount() {
    this.loadData();
  }

  handleChange(val) {
    this.setState({periodType: val});

    const formData = {
        operators: this.props.operators.filter((data) => {
          const cDate = new Date(data.createdDate);

          if (val === 'all') {
            return true;
          }

          if (val === 'today') {
            const today = new Date();
            if (cDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
              return true;
            }

            return false;
          }

          if (val === 'last30') {
            const today = new Date();
            var priorDate = new Date(new Date().setDate(today.getDate() - 30));

            if (priorDate <= cDate &&  cDate <= today) {
              return true;
            }

            return false;
          }

          if (val === 'lastMonth') {
            const today = new Date();
            today.setMonth(today.getMonth())
            var lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
            var lastDayOfLastMonth = lastDay.toISOString().substr(0, 10);

            var firstDayOfLastMonth = new Date(today);
            firstDayOfLastMonth.setDate(1);
            firstDayOfLastMonth.setMonth(firstDayOfLastMonth.getMonth() - 1);

            if (firstDayOfLastMonth <= cDate &&  cDate <= lastDayOfLastMonth) {
              return true;
            }

            return false;
          }

          return false;
        }).length || 0,
        gateways: this.props.gateways.length || 0,
        cells: this.props.cells.length || 0,
        dsims: this.props.dsims.length || 0,
        phones: this.props.phones.length || 0,
        cameras: this.props.cameras.length || 0,
        orders: this.props.orders.length || 0,
        invoices: this.props.invoices.length || 0,
    };

    this.setState({analyticsData: formData});
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header overview__header">
                <h4>Analytics</h4>
              </div>
              <div className="content analytics-content">
                <div className="filter-content">
                  <div className="filter-content__title">Filters</div>
                  <div className="filter-content__buttons">
                    <ToggleButtonGroup type='radio' name="options" value={this.state.periodType} onChange={this.handleChange.bind(this)}>
                      <ToggleButton className='filter-btn' id="tbg-all" value="all">
                        Lifetime
                      </ToggleButton>
                      <ToggleButton className='filter-btn' id="tbg-today" value="today">
                        Today
                      </ToggleButton>
                      <ToggleButton className='filter-btn' id="tbg-last30" value="last30">
                        Last 30 days
                      </ToggleButton>
                      <ToggleButton className='filter-btn' id="tbg-last-month" value="lastMonth">
                        Last month
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </div>
                {this.state.loading ? (
                  <div className="sp loading" />
                ) : (
                  <>
                    <div className="report-content">
                      <ReportCard
                        count={this.state.analyticsData?.operators}
                        title={"Operators"}
                        icon={"fas fa-users"}
                        color={"#03a9f3"}
                      />

                      <ReportCard
                        count={this.state.analyticsData?.gateways}
                        title={"Access Gateways"}
                        icon={"fas fa-server"}
                        color={"#ab8ce4"}
                      />

                      <ReportCard
                        count={this.state.analyticsData?.cells}
                        title={"Small Cells"}
                        icon={"fa fa-signal"}
                        color={"#00c292"}
                      />

                      <ReportCard
                        count={this.state.analyticsData?.dsims}
                        title={"dSIMs"}
                        icon={"fa fa-microchip"}
                        color={"#fb9678"}
                      />
                    </div>
                    <div className="report-content">
                      <ReportCard
                        count={this.state.analyticsData?.phones}
                        title={"Phones"}
                        icon={"fa fa-mobile"}
                        color={"#484848"}
                      />

                      <ReportCard
                        count={this.state.analyticsData?.cameras}
                        title={"Cameras"}
                        icon={"fa fa-camera"}
                        color={"#488a99"}
                      />

                      <ReportCard
                        count={this.state.analyticsData?.orders}
                        title={"Orders"}
                        icon={"fa fa-cloud-upload-alt"}
                        color={"#d32d41"}
                      />

                      <ReportCard
                        count={this.state.analyticsData?.invoices}
                        title={"Invoices"}
                        icon={"fa fa-file-invoice-dollar"}
                        color={"#1c4e80"}
                      />
                    </div>
                    <div className="chart-content">
                      <div className="chart-card">
                        <ReactEcharts
                            option={this.option}
                            notMerge
                            style={{ height: "100%", width: "100%" }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  operators: state.operator.operators,
  gateways: state.gateway.gateways,
  cells: state.cell.cells,
  dsims: state.dsim.dsims,
  phones: state.phone.phones,
  cameras: state.camera.cameras,
  orders: state.order.orders,
  invoices: state.invoice.invoices,
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(AnalyticsOverview));
