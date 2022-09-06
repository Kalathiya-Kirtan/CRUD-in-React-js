import React from 'react'
import { useState, useEffect } from 'react'
import 'animate.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    generatePath,
    Switch,
    Link,
    Route,
    useHistory,
    useParams,
    useNavigate
} from "react-router-dom";


function Main() {

    const [Data, setData] = useState(
        {
            fname: "",
            city: "",
            password: ""
        }
    )
    const [allData, setallData] = useState([])
    const [tog, setTog] = useState(false)
    const [errordata, seterrorData] = useState()
    const [ids, setIds] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        console.log(ids);
    }, [ids])


    useEffect(() => {
        getData()
        // editData()
    }, [])
    // useEffect(() => {
    //     setIds(id)
    // }, [])

    const Validation = () => {
        let error = {};
        let tog = false

        if (!Data.fname) {
            error.fname = "Please Enter Fname"
            tog = true
        }
        if (!Data.city) {
            error.city = "Please Enter City"
            tog = true
        }
        if (!Data.password) {
            error.password = "Please Enter Password"
            tog = true
        }
        seterrorData(error)
        return printData(tog);
    }

    const inputData = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }
    const printData = (tog) => {

        if (tog === false) {

            fetch("http://localhost:3000/data",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Data)
                }
            ).then(() => { getData() })

            setData({
                fname: '',
                city: '',
                password: ''
            }
            )
        }
    }

    const getData = async () => {
        await axios.get(`http://localhost:3000/data`)
            .then((res) => { setallData(res.data) });
    }

    const editData = (id) => {
        navigate(`page/${id}`)
        // console.log("Edit Data id state", id)
        // setIds(id)
    }

    const deleteData = (id) => {
        console.log("ID", id)
        fetch(`http://localhost:3000/data/${id}`,
            {
                method: 'DELETE'
            })
            .then((result) => {
                result.json()
            }).then(() => { getData() })
    }
    return (
        <div >
            <h1 className='hmain'>Welcome to the CRUD</h1>
            <div className='divinp'>
                <input className='inp' name="fname" value={Data.fname} onChange={(e) => { inputData(e) }} placeholder="Enter Your Name" required></input>
                <br />
                <span>{errordata && errordata.fname !== "" && errordata.fname}</span>
                <br /><input className='inp' name="city" value={Data.city} onChange={(e) => { inputData(e) }} placeholder="Enter Your City" required></input>
                <br /><span >{errordata && errordata.city !== "" && errordata.city}</span>
                <br /><input className='inp' type="password" name="password" value={Data.password} onChange={(e) => { inputData(e) }} placeholder="Enter Your Password" required></input>
                <br />  <span >{errordata && errordata.password !== "" && errordata.password}</span><br />
            </div><br /><br />
            <button className='button1' onClick={() => Validation()}>ADD</button>
            <table border="0">
                <tbody>
                    <tr className='detail'><h1 className='detail'>Details</h1></tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Password</th>
                        <th>Edit Data</th>
                        <th>Delete Data</th>
                    </tr>
                    {allData.length > 0 && (
                        allData.map((Datas) => (
                            <tr key={Datas.id}>
                                <td >{Datas.id}</td>
                                <td> {Datas.fname}</td>
                                <td > {Datas.city}</td>
                                <td > {Datas.password}</td>
                                <td><button className='tablebtn' onClick={(e) => { editData(Datas.id); setIds(Datas.id) }}>Edit</button></td>
                                {/* <td><Link to='/page'><button className='tablebtn' onClick={(e) => { editData(Datas.id); setIds(Datas.id) }}>Edit</button></Link></td> */}
                                <td><button className='tablebtn' onClick={() => deleteData(Datas.id)}>Delete Data</button></td>
                            </tr>
                        )
                        ))}
                </tbody>
            </table>
        </div>
    )
}
export default Main;