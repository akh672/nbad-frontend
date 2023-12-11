import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./LoginSignUp/Signup";
import Login from "./LoginSignUp/Login";
import HomePage from "./HomePage";
import ConfigureBudget from "./ConfigureBudget";
import ConfigExpanses from "./ConfigExpanses";
import "./App.css";
import ConfigBudget from "./ConfigBudget";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { getAccessToken } from "./Redux/action";

function App(props) {
  const { getAccessToken, isUserLoggedIn } = props;
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isUserLoggedIn) setOpenDialog(true);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isUserLoggedIn]);

  const handleDialogClose = async () => {
    try {
      await getAccessToken();
      setOpenDialog(false);
    } catch (err) {
      alert("Something Went Wrong!!!");
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/addBudget" element={<ConfigureBudget />} />
          <Route path="/addExpense" element={<ConfigExpanses />} />
        </Routes>
      </Router>
      <Dialog open={openDialog}>
        <DialogTitle>Click below Button to get Refresh Token!!!</DialogTitle>
        <DialogActions>
          <Button varient="contained" onClick={() => handleDialogClose()}>
            GET REFRESH TOKEN
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAccessToken: () => dispatch(getAccessToken()),
});

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
