import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Details from "./Details";
import ItemList from './ItemList';
import Drawer from "react-drag-drawer";
import { css } from "emotion";
import {Link} from 'react-router-dom';

const modal = css`
  position: absolute;
  top: 30px;
  background-color: white;
  width: 100%;
  max-width: 700px;
  min-height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Sidebar = css`
  ${modal} top: 0;
  max-width: 300px;
  border-radius: 0;
  left: 0;
  position: absolute;
  z-index: 1000;
`;


const routes = [
  {
    path: "/details",
    component: Details
  },
  {
    path: "/item-list",
    component: ItemList
  }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      sideDrawerOpen: false,
      name:''
    };
  }

  componentDidMount(){
    // console.log("items",this.props.items)
    this.setState({
      name: `${localStorage.getItem('firstname')}`
    })
  }

  logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  toggle = (type, value) => event => {
    this.setState(state => {
      return {
        [type]: value
      };
    });
  };

  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    });
  };

  isActive = (path, match, location) => !!(match || path === location.pathname);

  render() {
    const routeComponents = routes.map(({ path, component, i }) => (
      <Route path={path} component={component} key={i} />
    ));
    
    const { sidebarLeft } = this.state;
    const collapsed = this.state.collapsed;
    const classOne = collapsed
      ? "collapse navbar-collapse"
      : "collapse navbar-collapse show";
    const classTwo = collapsed
      ? "text-secondary navbar-toggler navbar-toggler-right collapsed fa fa-bars mr-5"
      : "text-secondary navbar-toggler navbar-toggler-right fa fa-close mr-5";

   
    return (
      <div>
        <BrowserRouter>
        <Drawer
                open={sidebarLeft}
                onRequestClose={this.toggle("sidebarLeft", false)}
                modalElementClass={Sidebar}
                direction="left"
              >
                        <div className="card rounded-0 p-0 m-0" style={{background: "linear-gradient(to bottom, #09203f, #1d4a6d)"}}>
        <div className="card-header text-white">
        
                    <div>
                     <p className="lead">Hi, {this.state.name}</p>
                      </div>
        </div>
      </div>
      <ul className="list-group">
        <li className="list-group-item rounded-0 border-0"> <Link to="/item-list"> <i className="fa fa-home mr-2"></i>Home</Link> </li> 
        <li className="list-group-item rounded-0 border-0"> <Link to="details"><i className="fa fa-user mr-2"></i>Profile </Link> </li>
      </ul>
              </Drawer>
          <div>
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button 
        onClick={this.toggle("sidebarLeft", true)}
        className="navbar-toggler"
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <button type="button" class="btn btn-custom text-white" onClick={this.logout} >
                        Logout{" "}
                        <span class="badge badge-secondary">
                          <i className="fa fa-power-off" />
                        </span>
                      </button>
      </nav>
              <div
                className="content-container page-body-wrapper"
                style={{ paddingLeft: "0px !important" }}
              >
                <div className="main-panel">
                  <div className="main-div">{routeComponents}</div>
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default Dashboard;

