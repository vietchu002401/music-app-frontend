import React, { useEffect, useState } from 'react';
import "./LoginModal.scss"
import Modal from "react-modal"
import MyInput from '../my-input/MyInput';
import qs from "query-string"
import axios from 'axios';
import mp3Api from '../../api/mp3Api';
import { useSelector } from 'react-redux';
// import { addContent } from '../../api/mp3Api';
import mp3API from "../../api/mp3Api"

const UpdateMp3Modal = (props) => {
    let [modalIsOpen, setIsOpen] = useState(false)
    let [changeClass, setChangeClass] = useState(false)

    let [isAdd, setIsAdd] = useState(false)

    let [list, setList] = useState([])

    useEffect(() => {
        setList(props.listMp3)
    }, [props])

    let openModal = () => {
        setIsOpen(true);
        setChangeClass(true)
    }

    let closeModal = () => {
        setChangeClass(false)
        setTimeout(() => {
            setIsOpen(false);
        }, 500)
    }

    let updateList = (list) => {
        setList(list)
    }
    return (
        <div>
            <p onClick={openModal} style={{ backgroundColor: "lightgreen" }}>Edit</p>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className={changeClass ? "Modal-mp3 fadeIn" : "Modal-mp3 fadeOut"}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <h1>Update Mp3</h1>
                <table className="mp3-modal__table">
                    <tbody>
                        <tr>
                            <th>name</th>
                            <th>src</th>
                            <th style={{ width: "200px" }}>Edit</th>
                        </tr>
                        {list.map((item, index) => {
                            return (
                                <Mp3Field updateList={updateList} id={props.id} location={index} name={item.name} src={item.src} key={index} />
                            )
                        })}
                    </tbody>
                </table>
                {isAdd ?
                    <>
                        <AddMp3 id={props.id} updateList={updateList}/>
                        <button onClick={() => setIsAdd(false)} className='my-button'>Cancel</button>
                    </> : <button onClick={() => setIsAdd(true)} className='my-button'>Add Mp3</button>}
            </Modal>
        </div>
    );
};

let Mp3Field = (props) => {
    let [change, setChange] = useState(false)
    let adminState = useSelector(state => state.adminReducer)

    let [name, setName] = useState("")
    let [src, setSrc] = useState("")

    useEffect(() => {
        setName(props.name)
        setSrc(props.src)
    }, [props])

    let changeName = (e) => {
        setName(e.target.value)
    }
    let changeSrc = (e) => {
        setSrc(e.target.value)
    }

    let handleUpdate = () => {
        let data = {
            name: name,
            src: src
        }
        let queryString = qs.stringify({
            id: props.id,
            location: props.location,
            auth: adminState.code
        })
        axios.post(process.env.REACT_APP_SERVER_URL + mp3Api.updateMp3 + queryString, data)
            .then(res => {
                props.updateList(res.data.data[0].list)
            }).catch(err => {
                console.log(err)
            })
        setChange(false)
    }
    return (
        <tr>
            <td>{change ? <MyInput value={name} onChange={changeName} placeHolder="name" /> : <p>{props.name}</p>}</td>
            <td>{change ? <MyInput value={src} onChange={changeSrc} placeHolder="src" /> : <p>{props.src}</p>}</td>
            <td>
                <svg onClick={() => setChange(!change)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" cursor="pointer" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
                {change && <button onClick={handleUpdate} className="my-button">Update</button>}
            </td>
        </tr>
    )
}

let AddMp3 = (props) => {
    let [name, setName] = useState("")
    let [url, setUrl] = useState("")

    let adminState = useSelector(state => state.adminReducer)

    let handleAddMp3 = async () => {
        let body = {
            name: name,
            src: url
        }
        let queryString = qs.stringify({
            id: props.id,
            auth: adminState.code
        })
        try {
            let res = await mp3API.addContent(body, queryString)
            let data = await res.data
            props.updateList(data.data[0].list)
            console.log(data)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div>
            <MyInput value={name} onChange={(e) => setName(e.target.value)} placeHolder="Name" />
            <MyInput value={url} onChange={(e) => setUrl(e.target.value)} placeHolder="Url" />
            <button onClick={handleAddMp3} className='my-button'>Add</button>
        </div>
    )
}

export default UpdateMp3Modal;