import React, { useEffect } from 'react'
import { useState } from 'react'
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/contextProvider';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
      getUsers();   
  }, []);

  const onDelete = (u) => {
    if(!window.confirm("Are you sure you want to delete ?")){
      return
    }else{
      axiosClient.delete(`/users/${u.id}`)
        .then(()=>{
          setNotification('User was succesfully deleted')
          getUsers();
        })
    }
  }

  const getUsers = ( )=>{
    setLoading(true)
    axiosClient.get('users')
      .then(({data})=>{
        setLoading(false)
        console.log(data);
        setUsers(data.data);
      })
      .catch(()=>{
        setLoading(false)
      })
  }


  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">Add New</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create date</th>
            <th>Actions</th>
          </thead>
          {loading && <tbody>
            <tr>
              <td colSpan="5" className="text-center">Loading...</td>
            </tr>
          </tbody>
          }
          {!loading && <tbody>
            {users.map(u => (
              <tr>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link  className="btn-edit" to={'/users/'+ u.id} >Edit</Link>
                  <button  className="btn-delete" onClick={ev => onDelete(u)} style={{marginLeft:"1rem"}}>Delete</button>
                </td>
                
              </tr>
            ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  )
}

export default Users