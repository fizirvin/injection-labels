import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NewLabel from "./pages/NewLabel";
import Labels from "./pages/Labels";
import Label from "./pages/Label";
import EditLabel from "./pages/EditLabel";
import modifyLabel from "./pages/modifyLabel.js";
import modifyConfig from "./pages/modifyConfig.js";
import initialQuery from "./queries/initialQuery";
import workersQuery from "./queries/workersQuery";
import { url, opts, hr_server, hr_opts } from "./config/index";

import "./app.css";

class App extends Component {
  state = {
    server: "https://injection-labels-server.irvinfiz.now.sh/graph",
    plastics: [],
    amealco: [],
    varias: [],
    labelMessage: "",
    plasticMessage: "",
    setAmealcoInspector: [],
    setAmealcoOperator: [],
    setVariasInspector: [],
    setVariasOperator: [],
    setVariasQuantity: [],
    setAmealcoQuantity: [],
    resetAmealcoInspector: [],
    resetAmealcoOperator: [],
    resetVariasInspector: [],
    resetVariasOperator: [],
    resetVariasQuantity: [],
    resetAmealcoQuantity: [],
    team: "varias",
    amealcoId: "",
    variasId: "",
  };

  async componentDidMount() {
    initialQuery.variables = { amealco: "amealco", varias: "varias" };
    opts.body = JSON.stringify(initialQuery);
    const res = await fetch(url, opts);
    const data = await res.json();

    workersQuery.variables = { amealco: "amealco", varias: "varias" };
    hr_opts.body = JSON.stringify(workersQuery);
    const hr_res = await fetch(hr_server, hr_opts);
    const hr_data = await hr_res.json();

    const setAmealcoInspector = data.data.amealco.inspectors;
    const setAmealcoOperator = data.data.amealco.operators;

    const setVariasInspector = data.data.varias.inspectors;
    const setVariasOperator = data.data.varias.operators;

    const setVariasQuantity = data.data.varias.quantity;
    const setAmealcoQuantity = data.data.varias.quantity;

    const amealcoId = data.data.amealco._id;
    const variasId = data.data.varias._id;
    const resetAmealcoInspector = data.data.amealco.inspectors;
    const resetAmealcoOperator = data.data.amealco.operators;

    const resetVariasInspector = data.data.varias.inspectors;
    const resetVariasOperator = data.data.varias.operators;

    const resetVariasQuantity = data.data.varias.quantity;
    const resetAmealcoQuantity = data.data.varias.quantity;
    return this.setState({
      amealcoId,
      variasId,
      setVariasInspector,
      setVariasOperator,
      setAmealcoOperator,
      setAmealcoInspector,
      setVariasQuantity,
      setAmealcoQuantity,
      resetVariasQuantity,
      resetAmealcoQuantity,
      resetVariasInspector,
      resetVariasOperator,
      resetAmealcoOperator,
      resetAmealcoInspector,
      plastics: data.data.plastics,
      amealco: hr_data.data.amealco,
      varias: hr_data.data.varias,
    });
  }

  newPlastic = async (item) => {
    const query = `mutation{newPlastic(input:{
      header: "${item.header}"
      intRef: "${item.intRef}"
      color: "${item.color}"
      text: "${item.text}"
      pieces: "${item.pieces}"
      machine: "${item.machine}"
    }) {
      _id
      header
      intRef
      color
      text
      pieces
      machine
    }}`;

    opts.body = JSON.stringify({ query });
    const res = await fetch(url, opts);
    const data = await res.json();

    if (data.errors) {
      this.setState({ plasticMessage: "error" });
    } else {
      const plastics = [...this.state.plastics, data.data.newPlastic];
      this.setState({ plastics, plasticMessage: "sucess" });
    }
  };

  updatePlastic = async ({
    _id,
    header,
    intRef,
    color,
    text,
    pieces,
    machine,
  }) => {
    const input = { header, intRef, color, text, pieces, machine };
    console.log(input);
    modifyLabel.variables = { _id, input };

    opts.body = JSON.stringify(modifyLabel);
    const res = await fetch(url, opts);
    const data = await res.json();

    if (data.errors) {
      console.log(data.errors);
      this.setState({ plasticMessage: "error" });
    } else {
      const plastic = data.data.updatePlastic;
      let plastics = [...this.state.plastics];
      plastics[plastics.findIndex((el) => el._id === plastic._id)] = plastic;
      return this.setState({ plastics, plasticMessage: "sucess" });
    }
  };

  updateConfig = async () => {
    if (this.state.team === "varias") {
      const _id = this.state.variasId;

      const input = {
        inspectors: this.state.setVariasInspector,
        operators: this.state.setVariasOperator,
        quantity: this.state.setVariasQuantity,
      };
      modifyConfig.variables = { _id, input };
      opts.body = JSON.stringify(modifyConfig);
      const res = await fetch(url, opts);
      const data = await res.json();

      if (data.errors) {
        console.log(data.errors);
        this.setState({ configMessage: "error" });
      } else {
        const setVariasInspector = data.data.updateConfig.inspectors;
        const setVariasOperator = data.data.updateConfig.operators;
        const setVariasQuantity = data.data.updateConfig.quantity;
        const resetVariasInspector = data.data.updateConfig.inspectors;
        const resetVariasOperator = data.data.updateConfig.operators;
        const resetVariasQuantity = data.data.updateConfig.quantity;
        return this.setState({
          setVariasInspector,
          setVariasOperator,
          setVariasQuantity,
          resetVariasQuantity,
          resetVariasInspector,
          resetVariasOperator,
          configMessage: "sucess",
        });
      }
    } else if (this.state.team === "amealco") {
      const _id = this.state.amealcoId;
      const input = {
        inspectors: this.state.setAmealcoInspector,
        operators: this.state.setAmealcoOperator,
      };
      modifyConfig.variables = { _id, input };
      opts.body = JSON.stringify(modifyConfig);
      const res = await fetch(url, opts);
      const data = await res.json();

      if (data.errors) {
        console.log(data.errors);
        this.setState({ configMessage: "error" });
      } else {
        const setAmealcoInspector = data.data.updateConfig.inspectors;
        const setAmealcoOperator = data.data.updateConfig.operators;
        const setAmealcoQuantity = data.data.updateConfig.quantity;
        const resetAmealcoInspector = data.data.updateConfig.inspectors;
        const resetAmealcoOperator = data.data.updateConfig.operators;
        const resetAmealcoQuantity = data.data.updateConfig.quantity;
        return this.setState({
          setAmealcoInspector,
          setAmealcoOperator,
          setAmealcoQuantity,
          resetAmealcoQuantity,
          resetAmealcoInspector,
          resetAmealcoOperator,
          configMessage: "sucess",
        });
      }
    }
  };

  resetConfig = () => {
    if (this.state.team === "varias") {
      const setVariasInspector = this.state.resetVariasInspector;
      const setVariasOperator = this.state.resetVariasOperator;
      const setVariasQuantity = this.state.resetVariasQuantity;
      return this.setState({
        setVariasInspector,
        setVariasOperator,
        setVariasQuantity,
      });
    } else if (this.state.team === "amealco") {
      const setAmealcoInspector = this.state.resetAmealcoInspector;
      const setAmealcoOperator = this.state.resetAmealcoOperator;
      const setAmealcoQuantity = this.state.resetAmealcoQuantity;
      return this.setState({
        setAmealcoInspector,
        setAmealcoOperator,
        setAmealcoQuantity,
      });
    }
  };

  onClose = () => {
    return this.setState({ plasticMessage: "" });
  };

  newAmealcoInspector = ({ _id, inspector }) => {
    const ins = this.state.setAmealcoInspector.filter(
      (item) => item._id !== _id
    );
    const setAmealcoInspector = [...ins, { _id, inspector }];
    return this.setState({ setAmealcoInspector });
  };

  resetAmealcoInspector = (_id) => {
    const ins = this.state.setAmealcoInspector.filter(
      (item) => item._id !== _id
    );
    const setAmealcoInspector = [...ins];
    return this.setState({ setAmealcoInspector });
  };

  newAmealcoOperator = ({ _id, operator }) => {
    const op = this.state.setAmealcoOperator.filter((item) => item._id !== _id);
    const setAmealcoOperator = [...op, { _id, operator }];

    return this.setState({ setAmealcoOperator });
  };

  resetAmealcoOperator = (_id) => {
    const op = this.state.setAmealcoOperator.filter((item) => item._id !== _id);
    const setAmealcoOperator = [...op];
    return this.setState({ setAmealcoOperator });
  };

  newAmealcoQuantity = ({ _id, quantity }) => {
    const qu = this.state.setAmealcoQuantity.filter((item) => item._id !== _id);
    const setAmealcoQuantity = [...qu, { _id, quantity }];

    return this.setState({ setAmealcoQuantity });
  };

  resetAmealcoQuantity = (_id) => {
    const qu = this.state.setAmealcoQuantity.filter((item) => item._id !== _id);
    const setAmealcoQuantity = [...qu];
    return this.setState({ setAmealcoQuantity });
  };

  cleanAmealco = (_id) => {
    const ins = this.state.setAmealcoInspector.filter(
      (item) => item._id !== _id
    );
    const op = this.state.setAmealcoOperator.filter((item) => item._id !== _id);
    const qu = this.state.setAmealcoQuantity.filter((item) => item._id !== _id);
    const setAmealcoInspector = [...ins];
    const setAmealcoOperator = [...op];
    const setAmealcoQuantity = [...qu];
    return this.setState({
      setAmealcoOperator,
      setAmealcoInspector,
      setAmealcoQuantity,
    });
  };

  cleanAllAmealco = () => {
    const setAmealcoInspector = [];
    const setAmealcoOperator = [];
    const setAmealcoQuantity = [];
    return this.setState({
      setAmealcoOperator,
      setAmealcoInspector,
      setAmealcoQuantity,
    });
  };

  newVariasInspector = ({ _id, inspector }) => {
    const ins = this.state.setVariasInspector.filter(
      (item) => item._id !== _id
    );
    const setVariasInspector = [...ins, { _id, inspector }];
    return this.setState({ setVariasInspector });
  };

  resetVariasInspector = (_id) => {
    const ins = this.state.setVariasInspector.filter(
      (item) => item._id !== _id
    );
    const setVariasInspector = [...ins];
    return this.setState({ setVariasInspector });
  };

  newVariasOperator = ({ _id, operator }) => {
    const op = this.state.setVariasOperator.filter((item) => item._id !== _id);
    const setVariasOperator = [...op, { _id, operator }];

    return this.setState({ setVariasOperator });
  };

  resetVariasOperator = (_id) => {
    const op = this.state.setVariasOperator.filter((item) => item._id !== _id);
    const setVariasOperator = [...op];
    return this.setState({ setVariasOperator });
  };

  newVariasQuantity = ({ _id, quantity }) => {
    const qu = this.state.setVariasQuantity.filter((item) => item._id !== _id);
    const setVariasQuantity = [...qu, { _id, quantity }];
    console.log(setVariasQuantity);
    return this.setState({ setVariasQuantity });
  };

  resetVariasQuantity = (_id) => {
    const qu = this.state.setVariasQuantity.filter((item) => item._id !== _id);
    const setVariasQuantity = [...qu];
    return this.setState({ setVariasQuantity });
  };

  cleanVarias = (_id) => {
    const ins = this.state.setVariasInspector.filter(
      (item) => item._id !== _id
    );
    const setVariasInspector = [...ins];
    const op = this.state.setVariasOperator.filter((item) => item._id !== _id);
    const setVariasOperator = [...op];
    const qu = this.state.setVariasQuantity.filter((item) => item._id !== _id);
    const setVariasQuantity = [...qu];
    return this.setState({
      setVariasInspector,
      setVariasOperator,
      setVariasQuantity,
    });
  };

  cleanAllVarias = () => {
    const setVariasInspector = [];
    const setVariasOperator = [];
    const setVariasQuantity = [];
    return this.setState({
      setVariasInspector,
      setVariasOperator,
      setVariasQuantity,
    });
  };

  changeTeam = (team) => {
    return this.setState({ team });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="content">
            <Switch>
              <Route
                path="/"
                exact
                component={(props) => (
                  <Labels
                    {...props}
                    amealco={this.state.amealco}
                    varias={this.state.varias}
                    plastics={this.state.plastics}
                    newAmealcoInspector={this.newAmealcoInspector}
                    newAmealcoOperator={this.newAmealcoOperator}
                    newAmealcoQuantity={this.newAmealcoQuantity}
                    newVariasInspector={this.newVariasInspector}
                    newVariasOperator={this.newVariasOperator}
                    newVariasQuantity={this.newVariasQuantity}
                    setAmealcoInspector={this.state.setAmealcoInspector}
                    setAmealcoOperator={this.state.setAmealcoOperator}
                    setAmealcoQuantity={this.state.setAmealcoQuantity}
                    setVariasInspector={this.state.setVariasInspector}
                    setVariasOperator={this.state.setVariasOperator}
                    setVariasQuantity={this.state.setVariasQuantity}
                    resetAmealcoInspector={this.resetAmealcoInspector}
                    resetAmealcoOperator={this.resetAmealcoOperator}
                    resetAmealcoQuantity={this.resetAmealcoQuantity}
                    resetVariasInspector={this.resetVariasInspector}
                    resetVariasOperator={this.resetVariasOperator}
                    resetVariasQuantity={this.resetVariasQuantity}
                    changeTeam={this.changeTeam}
                    team={this.state.team}
                    updateConfig={this.updateConfig}
                    resetConfig={this.resetConfig}
                    cleanAmealco={this.cleanAmealco}
                    cleanVarias={this.cleanVarias}
                    cleanAllAmealco={this.cleanAllAmealco}
                    cleanAllVarias={this.cleanAllVarias}
                  />
                )}
              />
              <Route
                path="/new"
                exact
                component={(props) => (
                  <NewLabel
                    {...props}
                    newPlastic={this.newPlastic}
                    onClose={this.onClose}
                    message={this.state.plasticMessage}
                  />
                )}
              />
              <Route
                path="/label/:id/:lot/:pieces/:inspector/:operator/:quantity/:start"
                exact
                component={(props) => (
                  <Label {...props} plastics={this.state.plastics} />
                )}
              />
              <Route
                path="/label/edit/:id"
                exact
                component={(props) => (
                  <EditLabel
                    {...props}
                    plastics={this.state.plastics}
                    updatePlastic={this.updatePlastic}
                    onClose={this.onClose}
                    message={this.state.plasticMessage}
                  />
                )}
              />
            </Switch>
          </div>
          <div className="footer"></div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
