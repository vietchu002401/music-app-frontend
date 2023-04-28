import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./commentFrame.scss"
import { getTimeNow, timeAgo } from "../../variables/getTimeNow"
import axios from 'axios';
import commentApi from '../../api/commentApi';
import userApi from '../../api/userApi';
import Loading from '../loading/Loading';
import { useFetch } from '../../custom-function/useFetch';

const CommentFrame = () => {

    let languageState = useSelector(state => state.languageReducer)

    let params = useParams()
    let [again, setAgain] = useState(false)
    let [list, setList] = useState([])

    let url = process.env.REACT_APP_SERVER_URL + commentApi.getComment + params.id
    let [apiData, serverError, loading] = useFetch(url, "GET", null, again)

    useEffect(() => {
        apiData && setList([...apiData.data])
        serverError && console.log(serverError)
    }, [apiData, serverError])

    let fetchAgain = useCallback(() => {
        setAgain(!again)
    }, [])

    return (
        <div className='comment-frame'>
            <h2>{languageState.comment}</h2>
            <YourComment languageState={languageState} fetchAgain={fetchAgain} songId={params.id} reply={false} />
            <div className='comment-main'>
                {list.map((item, index) => {
                    return <Comment languageState={languageState} key={index} commentData={item} fetchAgain={fetchAgain} />
                })}
                {loading ? <Loading /> : null}
            </div>
        </div>
    );
};

let Comment = (props) => {

    let [display, setDisplay] = useState(false)
    let [deleteLoader, setDeleteLoader] = useState(false)
    let [editing, setEditing] = useState(false)
    let [commentEdit, setCommentEdit] = useState("")
    let [bullshitHeight, setBullshitHeight] = useState(0)
    let [reply, setReply] = useState(false)
    let [again, setAgain] = useState(false)
    let [list] = useFetch(process.env.REACT_APP_SERVER_URL + commentApi.getCommentReply + props.commentData.id, "GET", null, again)
    let [imageUrl] = useFetch(process.env.REACT_APP_SERVER_URL + userApi.getUserAvatar + props.commentData.userId, "GET", null, null)

    let userState = useSelector(state => state.userReducer)

    useEffect(() => {
        let divShit = document.getElementById("comment")
        setBullshitHeight(divShit.clientHeight + 100)
        setCommentEdit(props.commentData.content)
    }, [props, again])

    let fetchAgain = useCallback(() => {
        setAgain(!again)
    }, [])

    let deleteComment = async () => {
        setDeleteLoader(true)
        await axios.delete(process.env.REACT_APP_SERVER_URL + commentApi.deleteComment + props.commentData.id)
            .then(res => {
                props.fetchAgain()
                setDeleteLoader(false)
                setDisplay(false)
            }).catch(err => {
                console.log(err)
                setDisplay(false)
                setDeleteLoader(false)
            })
    }

    let likeComment = async () => {
        let data = {
            userId: userState.userData.id,
            id: props.commentData.id
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + commentApi.likeComment, data)
            .then(res => {
                props.fetchAgain()
            }).catch(err => {
                console.log(err)
            })
    }

    let editComment = async () => {
        let data = {
            id: props.commentData.id,
            content: commentEdit
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + commentApi.editComment, data)
            .then(res => {
                props.fetchAgain()
                setEditing(false)
            }).catch(err => {
                console.log(err)
                setEditing(false)
            })
    }
    return (
        <div id="comment" style={{ width: "100%", overflow: "hidden", paddingBottom: "25px" }}>
            <div style={{ marginBottom: "30px" }} className='comment'>
                <div style={imageUrl && { backgroundImage: "url(" + imageUrl.message + ")" }} className='comment__img'></div>
                <div className='comment__content'>
                    <div>
                        <p className='user-comment'>Incognito</p>
                        {editing ? <input value={commentEdit} onChange={(e) => setCommentEdit(e.target.value)} onKeyPress={(e) => e.key === "Enter" && editComment()} className='input-comment' type="text" placeholder="Edit your comment" /> : props.commentData.content}
                        {userState.status ? <><svg style={{ color: props.commentData.idLiked.includes(userState.userData.id) ? "blue" : "grey" }} onClick={likeComment} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-up-fill like-comment-icon" viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                        </svg>
                            <small>{props.commentData.likeCount}</small></> : <><svg style={{ color: "grey" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-up-fill like-comment-icon" viewBox="0 0 16 16">
                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                            </svg>
                            <small>{props.commentData.likeCount}</small></>}
                        <p className='comment-time'>{timeAgo(props.commentData.time)}</p>
                    </div>
                    <small onClick={() => setReply(!reply)} className='comment-reply-btn'>{props.languageState.reply}</small>
                </div>
                {userState.userData.id === props.commentData.userId ? <div className='comment-icon'>
                    <svg onClick={() => setDisplay(!display)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-three-dots-vertical comment-menu-icon" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                    <div style={{ display: display ? "flex" : "none" }} className='comment__edit'>
                        <div className='edit-delete' onClick={() => { setEditing(!editing); setDisplay(!display) }}>{props.languageState.edit}</div>
                        <div className='edit-delete' onClick={deleteComment}>Delete {deleteLoader ? <div className="loader-comment"></div> : null}</div>
                    </div>
                </div> : null}
            </div>
            {reply ? <YourComment fetchAgain={fetchAgain} songId={props.commentData.id} reply={true} /> : null}
            {list && list.data.map((item, index) => {
                return <CommentReply bullshitHeight={bullshitHeight} commentData={item} key={index} fetchAgain={fetchAgain} />
            })}
        </div>
    )
}

let CommentReply = (props) => {

    let [display, setDisplay] = useState(false)
    let [deleteLoader, setDeleteLoader] = useState(false)
    let [editing, setEditing] = useState(false)
    let [commentEdit, setCommentEdit] = useState("")
    let [imageUrl] = useFetch(process.env.REACT_APP_SERVER_URL + userApi.getUserAvatar + props.commentData.userId, "GET", null, null)

    let userState = useSelector(state => state.userReducer)

    useEffect(() => {
        setCommentEdit(props.commentData.content)
    }, [props])

    let deleteComment = async () => {
        setDeleteLoader(true)
        await axios.delete(process.env.REACT_APP_SERVER_URL + commentApi.deleteCommentReply + props.commentData.id)
            .then(res => {
                props.fetchAgain()
                setDeleteLoader(false)
                setDisplay(false)
            }).catch(err => {
                console.log(err)
                setDisplay(false)
                setDeleteLoader(false)
            })
    }

    let likeComment = async () => {
        let data = {
            userId: userState.userData.id,
            id: props.commentData.id
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + commentApi.likeCommentReply, data)
            .then(res => {
                props.fetchAgain()
            }).catch(err => {
                console.log(err)
            })
    }

    let editComment = async () => {
        let data = {
            id: props.commentData.id,
            content: commentEdit
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + commentApi.editCommentReply, data)
            .then(res => {
                props.fetchAgain()
                setEditing(false)
            }).catch(err => {
                console.log(err)
                setEditing(false)
            })
    }
    return (
        <div style={{ width: "calc(100% - 70px)", marginLeft: "auto" }} className='comment'>
            <div style={imageUrl && { backgroundImage: "url(" + imageUrl.message + ")" }} className='comment__img'></div>
            <div className='comment__content'>
                <div>
                    <p className='user-comment'>Incognito</p>
                    {editing ? <input value={commentEdit} onChange={(e) => setCommentEdit(e.target.value)} onKeyPress={(e) => e.key === "Enter" && editComment()} className='input-comment' type="text" placeholder="Edit your comment" /> : props.commentData.content}
                    {userState.status ? <><svg style={{ color: props.commentData.idLiked.includes(userState.userData.id) ? "blue" : "grey" }} onClick={likeComment} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-up-fill like-comment-icon" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg>
                        <small>{props.commentData.likeCount}</small></> : null}
                    <p className='comment-time'>{timeAgo(props.commentData.time)}</p>
                </div>
            </div>
            {userState.userData.id === props.commentData.userId ? <div className='comment-icon'>
                <svg onClick={() => setDisplay(!display)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-three-dots-vertical comment-menu-icon" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
                <div style={{ display: display ? "flex" : "none" }} className='comment__edit'>
                    <div className='edit-delete' onClick={() => { setEditing(!editing); setDisplay(!display) }}>Edit</div>
                    <div className='edit-delete' onClick={deleteComment}>Delete {deleteLoader ? <div className="loader-comment"></div> : null}</div>
                </div>
            </div> : null}

            <div style={{ height: props.bullshitHeight }} className='reply-comment-line'>

            </div>
        </div>
    )
}

let YourComment = (props) => {
    let userState = useSelector(state => state.userReducer)
    let [comment, setComment] = useState("")

    let pressComment = (e) => {
        setComment(e.target.value)
    }

    let sendComment = async () => {
        setComment("")
        let data = {
            userId: userState.userData.id,
            songId: props.songId,
            content: comment,
            time: getTimeNow(new Date())
        }
        let api = props.reply ? commentApi.createCommentReply : commentApi.create
        await axios.post(process.env.REACT_APP_SERVER_URL + api, data)
            .then(res => {
                props.fetchAgain()
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='your-comment'>
            {userState.status ? <>
                <div style={{ backgroundImage: "url(" + userState.userData.imageUrl + ")" }} className='comment__img'></div>
                <div className='your-comment-main'>
                    <input onChange={pressComment} onKeyPress={(e) => e.key === "Enter" && sendComment()} value={comment} className='input-comment' type="text" placeholder="Write your comment" />
                </div></> : <p>{props.languageState.youMustLogin}</p>}
        </div>
    )
}

export default CommentFrame;