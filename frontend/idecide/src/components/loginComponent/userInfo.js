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

    handleLogOut = () => {
        console.log(772, "loggin out");

        localStorage.clear();
        window.location.replace("/")
    }

    handleHistory = async () => {
        const history = await getResultByUser(this.state.userId);
        console.log(225, this.state.userId, history);
        this.setState({
            history: history
        });
    }

    render() {
        const { history } = this.state;
        {
            return (
                <div>
                    <PrimaryButton onClick={this.handleLogOut}>
                        Log Out</PrimaryButton>
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
