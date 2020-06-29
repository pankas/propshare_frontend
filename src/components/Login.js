import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../store/actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = e => {
    sessionStorage.clear();
    e.preventDefault();
    const val = {
      data: {
        email: this.state.email,
        password: this.state.password
      }
    };
    this.props.login(val, () => {
      let data = Object.keys(this.props.user);
      console.log("user details",this.props.user)
      localStorage.setItem("email", this.props.user.email);
      // localStorage.setItem("type", this.props.user.type);
      localStorage.setItem("token", this.props.user.token);
      localStorage.setItem("gender", this.props.user.gender);
      var dob = this.props.user.dob.split('T')[0];
      console.log("dob",dob)
      localStorage.setItem("dob", dob);
      localStorage.setItem("firstname", this.props.user.firstname);
      localStorage.setItem("lastname", this.props.user.lastname);

      if (data[0] === "error") {
        let msg = this.props.user.error;
        toast.error(msg);
      } else {
        sessionStorage.setItem("isAuthenticated", true);
        this.props.history.push("/item-list");
      }
    });
  };

  render() {
    return (
      <div>
        <div className="container p-5" style={{backgroundColor:"#51bd9b",height:"100vh"}}>
          <ToastContainer />
            <div className="d-flex-column justify-content-center">
              <p>
                <h2 className="font-weight-bold text-center text-white">PWA</h2>
                <h5 className="text-center text-white">Welcome to our PWA</h5>
                </p>  
                <div className="flex-shrink-0">
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter Id"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center mb-5">
                  <button type="submit" class="btn btn-light btn-block" style={{color:"#51bd9b"}}>
                    Submit
                  </button>
                </div>
                <div className="d-flex justify-content-between">
                  <Link to="signup" className="text-white">
                    <div>New? Create an account</div>
                  </Link>
                </div>
              </form>
                </div>
            </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps, { login })(Login);
