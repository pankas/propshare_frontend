import {combineReducers} from 'redux';
import auth from './auth';
import forgotPass from './forgotPass';
import update from './update';
import getUsers from './getUsers';
import sendMail from './sendMail';

export default combineReducers({
    auth: auth,
    forgotPass: forgotPass,
    update:update,
    getUsers:getUsers,
    sendMail:sendMail
});