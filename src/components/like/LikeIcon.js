import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../api/userApi';
import { addLikeListAction, removeLikeListAction } from '../../store/actions';

const LikeIcon = (props) => {
    let userState = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let dispatchAddLike = (item) => dispatch(addLikeListAction(item))
    let dispatchRemoveLike = (item) => dispatch(removeLikeListAction(item))

    let handleAddLike = (id) => {
        if (userState.userData.liked.includes(id)) {
            dispatchRemoveLike(id)
            let data = {
                id: userState.userData.id,
                googleId: userState.userData.googleId,
                liked: [...userState.userData.liked]
            }
            axios.post(process.env.REACT_APP_SERVER_URL + userApi.updateLikeList, data)
        } else {
            dispatchAddLike(id)
            let data = {
                id: userState.userData.id,
                googleId: userState.userData.googleId,
                liked: [...userState.userData.liked]
            }
            axios.post(process.env.REACT_APP_SERVER_URL + userApi.updateLikeList, data)
        }
    }
    return (
        <svg onClick={() => handleAddLike(props.id)} style={{ color: userState.userData.liked.includes(props.id) ? "red" : "lightgrey" }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-suit-heart-fill heart-icon" viewBox="0 0 16 16">
            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
        </svg>
    );
};

export default LikeIcon;