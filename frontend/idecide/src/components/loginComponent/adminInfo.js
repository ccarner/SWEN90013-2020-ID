import React from "react";

import { getAllAdmins } from "../../API/loginAPI";
import LoadingSpinner from "../reusableComponents/loadingSpinner";

export default class AdminInfo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: null,
      password: null,
      admins: null,
      error: null,
      isLoaded: false,
    };
  }

  fetchAdmins = async () => {
    const data = await getAllAdmins();
    this.setState({ admins: data["data"], isLoaded: true });
  }

  componentDidMount() {
    this.fetchAdmins();
  }

  render() {
    const { error, isLoaded, admins } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <LoadingSpinner />;
    } else {
      return (
        <div>
          {admins.map((admin) => (
            <div>
              {admin.username}
              <span>:</span>
              {admin.password}
            </div>
          ))}
        </div>
      );
    }
  }
}
