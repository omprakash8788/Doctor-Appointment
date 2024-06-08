import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const NotificationPage = () => {
    const {user} = useSelector(state=>state.user)
    // console.log(user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMarkAllRead= async()=>{
        try {
            // first get user
            dispatch(showLoading())
            // send request
            const res= await axios.post('/api/v1/user/get-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            //check response
            if(res.data.success){
                message.success(res.data.message)
            }
            else{
                message.error(res.data.message)
            }
            
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
            
        }

    }
    const handleDeleteAllReadNotification=()=>{

    }
  return (
    <Layout>
    <h4 className='p-3 text-center'>Notification Page</h4>
    <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
            <div className="d-flex justify-content-end">
                <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
            </div>
            {
                user?.notification.map(notificationMsg =>(
                    <div className="card" style={{cursor:"pointer"}}>
                        <div className="card-text" onClick={()=> navigate (notificationMsg.onClickPath)}>
                            {
                                notificationMsg.message
                            }
                        </div>
                    </div>
                ))
            }
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
                <h4 className='p-2' onClick={handleDeleteAllReadNotification}>Delete All Read</h4>
            </div>
        </Tabs.TabPane>
    </Tabs>
    </Layout>
  )
}

export default NotificationPage