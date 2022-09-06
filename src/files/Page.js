import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

function Page() {

    const [field, setField] = useState()
    const [datas, setDatas] = useState({
        fname: '',
        city: '',
        password: ''
    })
    const params = useParams();


    useEffect(() => {
        axios.get(`http://localhost:3000/data/${params.id}`)
            .then((res) => setDatas(res.data))
        setField(datas)
        // .then((result) => { console.log(result.data) })
    }, [])

    useEffect(() => {

        setField(datas)
        // .then((result) => { console.log(result.data) })
    }, [datas])

    const inputfield = (e) => {
        setDatas({ ...datas, [e.target.name]: e.target.value })

    }

    const updateData = () => {
        fetch(`http://localhost:3000/data/${params.id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(field)
            }
        )
        setDatas({
            fname: '',
            city: '',
            password: ''
        })
    }


    return (
        <div>
            <h1 className='hpage'>Welcome to Edit Page</h1>
            <input className='inp' name="fname" value={datas.fname} onChange={(e) => { inputfield(e) }} placeholder="Enter Your Name" required></input>
            <br /><input className='inp' name="city" value={datas.city} onChange={(e) => { inputfield(e) }} placeholder="Enter Your City" required></input>
            <br /><input className='inp' type="password" name="password" value={datas.password} onChange={(e) => { inputfield(e) }} placeholder="Enter Your Password" required></input><br />
            <Link to='/'><button className='button1' onClick={(e) => { updateData(e) }}>Done</button></Link>
            <Link to='/'><button className='button2'>Home</button></Link>
        </div>
    )
}

export default Page;