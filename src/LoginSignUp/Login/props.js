import {
  loginUser,
} from '../../Redux/action'

export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email,password, navigate) => dispatch(loginUser(email,password,navigate)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
});