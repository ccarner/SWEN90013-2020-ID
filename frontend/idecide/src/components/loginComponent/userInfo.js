import React from "react";

import { getAllAdmins } from "../../API/loginAPI";
import LoadingSpinner from "../reusableComponents/loadingSpinner";
import PrimaryButton from "../reusableComponents/PrimaryButton";
import { getResultByUser } from "../../API/resultAPI";
import AdminConsole from "../AdminComponents/adminConsole";

export default class UserInfo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            history: null
        };
    }

    componentDidMount = () => {
        if (localStorage.getItem("userType") === "anonymous" || (localStorage.getItem("userType") === null)) {
            window.location.replace('/loginComponent/loginPage');
        }
    }




    handleHistory = async () => {
        const history = await getResultByUser(this.state.userId);
        this.setState({
            history: history
        });
    }

    render() {
        const { history } = this.state;
        {
            return (
                <div>
                    <PrimaryButton onClick={this.handleHistory}>
                        Completion History</PrimaryButton>
                    {history === null ? null :
                        JSON.stringify(history)}

                    {(localStorage.getItem("userType") === "admin") ?
                        <AdminConsole /> : null}
                </div>
            );
        }
    }
}
