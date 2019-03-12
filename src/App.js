import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";

class App extends Component {
  state = {
    queryWL: "",
    queryWed: "",
    name: "",
    filteredWatchlist: [],
    filteredWatched: []
  };
  componentDidMount = () => {
    this.setState({
      filteredWatched: this.props.watched,
      filteredWatchlist: [...this.props.watchlist]
    });
  };
  componentDidUpdate = prevProps => {
    if (prevProps.watchlist !== this.props.watchlist) {
      this.setState({
        filteredWatched: this.props.watched,
        filteredWatchlist: [...this.props.watchlist]
      });
    }
  };
  handleChange = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeSWL = event => {
    this.setState({ queryWL: event.target.value });
    this.filterWatchlist(event.target.value);
  };
  handleChangeSWed = event => {
    this.setState({ queryWed: event.target.value });
    this.filterWatched(event.target.value);
  };
  handleChangeAdd = () => {
    this.props.onMovieAdd(this.state.name);
    this.setState({ name: "" });
  };
  filterWatchlist = query => {
    query = query.toLowerCase();
    let filteredWatchlist = this.props.watchlist.filter(movie => {
      return movie.toLowerCase().includes(query);
    });
    this.setState({ filteredWatchlist });
  };
  filterWatched = query => {
    query = query.toLowerCase();
    let filteredWatched = this.props.watched.filter(movie => {
      return movie.toLowerCase().includes(query);
    });
    this.setState({ filteredWatched });
  };
  render() {
    let tableWatchlist = [];
    let tableWatched = [];
    if (this.state.filteredWatchlist.length) {
      tableWatchlist = this.state.filteredWatchlist.map(movie => (
        <tr key={movie}>
          <td width="550px">{movie}</td>
          <td>
            <button
              onClick={() => this.props.onMovieWatch(movie)}
              className="btn btn-secondary watchMovie"
            >
              Watch
            </button>
          </td>
          <td>
            <button
              onClick={() => this.props.onMovieDelete(movie)}
              className="btn btn-danger deleteMovie"
            >
              delete
            </button>
          </td>
        </tr>
      ));
    } else {
      tableWatchlist = (
        <tr>
          <td>no movies in your watchlist...</td>
        </tr>
      );
    }
    if (this.state.filteredWatched.length) {
      tableWatched = this.state.filteredWatched.map(movie => (
        <tr key={movie}>
          <td width="550px">{movie}</td>
          <td>
            <button
              onClick={() => this.props.onMovieUnwatch(movie)}
              className="btn btn-secondary watchMovie"
            >
              Unwatch
            </button>
          </td>
          <td>
            <button
              onClick={() => this.props.onMovieDelete(movie)}
              className="btn btn-danger deleteMovie"
            >
              delete
            </button>
          </td>
        </tr>
      ));
    } else {
      tableWatched = (
        <tr>
          <td>you have not seen any movies...</td>
        </tr>
      );
    }
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          <div className="row" style={{ textAlign: "ceneter" }}>
            <div className="form-group col-12 mx-auto">
              <div className="input-group my-3">
                <input
                  className="form-control"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <button
                    onClick={() => this.handleChangeAdd()}
                    className="btn btn-primary input-group-text"
                  >
                    Add a movie
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <h1>
                Movies Watchlist{" "}
                <span
                  style={{
                    backgroundColor: "grey",
                    borderRadius: "5px",
                    width: "25px",
                    color: "white"
                  }}
                >
                  {tableWatchlist.length ? tableWatchlist.length : 0}
                </span>
              </h1>

              <table>
                <thead>
                  <tr>
                    <td>
                      <div className="form-group col-12 mx-auto">
                        <div className="input-group my-3">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.queryWL}
                            onChange={this.handleChangeSWL}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">Search</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>{tableWatchlist}</tbody>
              </table>
            </div>
            <div className="col-6">
              <h1>
                Movies Watched{" "}
                <span
                  style={{
                    backgroundColor: "grey",
                    borderRadius: "5px",
                    width: "25px",
                    color: "white"
                  }}
                >
                  {tableWatched.length ? tableWatched.length : 0}
                </span>
              </h1>

              <table>
                <thead>
                  <tr>
                    <td>
                      <div className="form-group col-12 mx-auto">
                        <div className="input-group my-3">
                          <input
                            className="form-control"
                            type="text"
                            value={this.state.queryWed}
                            onChange={this.handleChangeSWed}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">Search</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>{tableWatched}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    watchlist: state.watchlist,
    watched: state.watched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMovieAdd: name => dispatch(actionCreators.add_movie(name)),
    onMovieDelete: movie => dispatch(actionCreators.delete_movie(movie)),
    onMovieWatch: movie => dispatch(actionCreators.watch_movie(movie)),
    onMovieUnwatch: movie => dispatch(actionCreators.unwatch_movie(movie))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
