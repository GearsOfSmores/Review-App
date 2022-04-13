import FeedbackItem from "./FeedbackItem"
import Spinner from "./shared/Spinner"
import FeedbackContext from '../context/FeedbackContext'
import {useContext} from 'react'


function FeedbackList() {

// Extracting 'feedback' from FeedbackContext using the useContext hook   
// Using this instead of importing Proptypes and using props 
const {feedback, isLoading} =useContext(FeedbackContext)

if(!isLoading && (!feedback || feedback.length === 0)){
    return <p>No Feedback Yet</p>

}
    return isLoading ? <Spinner/> : 
     (
     <div className='feedback-list'>
       
        {feedback.map((item) => (
            <FeedbackItem
             key={item.id}
             item={item}
             />
        ))}
       
    </div>
     )
}


export default FeedbackList