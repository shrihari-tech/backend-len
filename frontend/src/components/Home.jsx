import React,{useEffect, useState} from 'react'
import axios from 'axios'

const Home = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [age, setAge] = useState('')
    const [users,setUsers] = useState([])

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const user = {name,email,age};
            const response = await axios.post("https://backend-len.vercel.app/user/register",user);
            console.log(response.data);
            window.alert('User added successfully');
            setName('');
            setEmail('');
            setAge('');
        }
        catch(err){
            console.log(err);
        }
    }

    const fetchUser = async()=>{
        try{
            const response = await axios.get('https://backend-len.vercel.app/user/get');
            setUsers(response.data);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        fetchUser();
    },[users]);

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Age</label>
                <input 
                    type="age" 
                    value={age} 
                    onChange={(e)=>setAge(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
        <h1>Users</h1>
        <ul>
            {users.map((user)=>(
                <div>
                    <li key={user._id}>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.age}</li>
                </div>
            ))}
        </ul>
        </div>
    )
}

export default Home;