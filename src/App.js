import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    users: null,
    total: null,
    per_page: null,
    current_page: 1,
    search: null,
  };

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  makeHttpRequestWithPage = async (pageNumber) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page,
    });
  };

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  render() {
    let items,renderPageNumbers;

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.total / this.state.per_page);
        i++
      ) {
        pageNumbers.push(i);
      }

      renderPageNumbers = pageNumbers.map((number) => {
        let classes = this.state.current_page === number ? "active" : "";

        return (
          <span
            key={number}
            className={classes}
            onClick={() => this.makeHttpRequestWithPage(number)}
          >
            {number}
          </span>
        );
      });
    }

    if (this.state.users != null) {
      items = this.state.users.filter((data) => {
          if (this.state.search == null) return data;
          else if (data.email.toLowerCase().includes(this.state.search.toLowerCase()) || data.first_name.toLowerCase().includes(this.state.search.toLowerCase()))
		  {
            return data;
          }
        })
        .map((user) => (
          <div className="item col-xs-4 col-lg-4" key={user.id}>
            <div className="thumbnail card">
              <div className="img-event">
                <img
                  className="group list-group-image img-fluid"
                  src={user.avatar}
                  alt="avatar"
                />
              </div>
              <div className="caption card-body">
                <h4 className="group card-title inner list-group-item-heading">
                  {user.first_name} {user.last_name}
                </h4>
                <p className="group inner list-group-item-text">{user.email}</p>
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <button className="btn btn-info">View</button>
                  </div>
                </div>
              </div>
              <div className="top-right mt-2">
                <button className="btn btn-link text-danger p-0">
                  <i className="fa fa-heart text-danger vm"></i>
                </button>
              </div>
            </div>
          </div>
        ));
    } else if (this.state.users === null) {
      items = <h3 className="loading">Loading ...</h3>;
    }

    return (
      <div className="app">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <span className="navbar-brand">Logo</span>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 my-3">
              <h3 style={{ padding: "10px" }}>Contact Details:</h3>
              <div className="container">
                <div>
                  <span className="btn-group">
                    <button className="btn btn-info" id="list">
                      <i className="fa fa-list" aria-hidden="true"></i> List
                      View
                    </button>
                    <button className="btn btn-danger" id="grid">
                      <i className="fa fa-th" aria-hidden="true"></i> Grid View
                    </button>
                  </span>
                  <div className="pull-right">
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => this.searchSpace(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="products" className="row view-group">
            {items}
          </div>
        </div>
        <div className="container">
          <div className="pagination">
            <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
            {renderPageNumbers}
            <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <footer className="container-fluid text-center">
          <p style={{ margin: "0 auto" }}>&copy; Copyright 2020 </p>
        </footer>
      </div>
    );
  }
}

export default App;
