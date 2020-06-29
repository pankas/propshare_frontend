import React from "react";
import { connect } from "react-redux";
import { update } from "../store/actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      type: "admin",
      disabled: true,
      editable: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let email = localStorage.getItem("email");
    let type = localStorage.getItem("type");
    let firstname = localStorage.getItem("firstname");
    let dob = localStorage.getItem("dob");
    let gender = localStorage.getItem("gender");
    let lastname = localStorage.getItem("lastname");
    this.setState(
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        dob:dob,
        gender:gender
      }
    );
  }

  handleChange(event) {
    this.setState({ type: event.target.value });
  }

  editable = e => {
    e.preventDefault();
    this.setState({
      disabled: false,
      editable: false
    });
  };

  handleSubmit = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    e.preventDefault();
    this.setState(
      {
        disabled: true,
        editable: true,
        [name]: value
      },
      () => {
        let fname = this.state.firstname;
        let lname = this.state.lastname;
        let email = this.state.email;
        let gender = this.state.gender;
        const val = {
          data: {
            fname,
            lname,
            email,
            gender
          }
        };
        this.props.update(val, () => {
          toast.success("Updated Successfully");
          let data = this.props.updatedData;
          localStorage.setItem("email", data.email);
          localStorage.setItem("type", data.type);
          localStorage.setItem("firstname", data.firstname);
          localStorage.setItem("lastname", data.lastname);
          let email = localStorage.getItem("email");
          let gender = localStorage.getItem("gender");
          let firstname = localStorage.getItem("firstname");
          let lastname = localStorage.getItem("lastname");
          this.setState({
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender
          });
        });
      }
    );
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <form name="registration" onSubmit={this.handleSubmit}>
          <div className="form-group flex-fill">
            <label for="name">Name</label>
            <div className="d-flex flex-row">
              <input
                type="text"
                className="form-control mr-1"
                id="name"
                name="firstname"
                placeholder="First Name"
                value={this.state.firstname}
                onChange={e => this.setState({ firstname: e.target.value })}
                disabled={this.state.disabled}
              />
              <input
                type="text"
                className="form-control"
                id="name"
                name="lastname"
                placeholder="Last Name"
                value={this.state.lastname}
                onChange={e => this.setState({ lastname: e.target.value })}
                disabled={this.state.disabled}
              />
            </div>
          </div>
          <div className="form-group flex-fill">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              disabled={true}
            />
          </div>
          <div className="form-group flex-fill">
            <label for="gender">Gender</label>
            <input
              type="gender"
              class="form-control"
              id="gender"
              name="gender"
              // placeholder="Ent"
              value={this.state.gender}
              onChange={e => this.setState({ gender: e.target.value })}
              disabled={this.state.disabled}
            />
          </div>
          <div className="form-group flex-fill">
            <label for="dob">Date of Birth</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              value={this.state.dob}
              onChange={e => this.setState({ dob: e.target.value })}
              disabled={true}
            />
          </div>
          {this.state.editable ? (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={this.editable}
                class="btn btn-custom btn-block text-white font-weight-bold"
                id="submitButton"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn btn-custom btn-block text-white font-weight-bold" id="submitButton">
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    updatedData: state.update
  };
};

export default connect(mapStateToProps, { update })(Details);
