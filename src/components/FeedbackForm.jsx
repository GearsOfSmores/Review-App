import {useState, useContext, useEffect} from 'react'
import Card from "./shared/Card"
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {
    // whatever is typed into text group will be put into text state
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const {addFeedback, feedbackEdit, updateFeedback} =useContext(FeedbackContext)

    // adds text, rating, and enables button whenever the user clicks the edit button
    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    // disables button and displays message if characterlimit is under 10
    const handleTextChange = (e) => {
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length <=10) {
            setBtnDisabled(true)
            setMessage('Text must be atleast 10 characters')
        }
        else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
}
const handleSubmit = (e) => {
    // prevents the default from submitting to the actual file
    e.preventDefault()

    // Another protection from sumbitting with less than 10 characters, 
    // someone can still bypass the previous check in handleTextChange

    if(text.trim().length > 10) {
        // create newFeedback object
        const newFeedback = {
            text,
            rating,
        }

        if(feedbackEdit.edit === true)
        {
            updateFeedback(feedbackEdit.item.id, newFeedback)
        }
        else {
             // set prop and pass in the newfeedback up to the App.js
            addFeedback(newFeedback)
        }
       

        // Set text to empty string after submit
        setBtnDisabled(true)
        setRating(10)
        setText('')
    }
}


    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input onChange={handleTextChange} 
                    type="text" 
                    placeholder='Write a review' 
                    value={text}/>
                    <Button type='submit' isDisabled={btnDisabled}>Send</Button>
                </div>
                {/*if there is message than 'message'*/}
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm