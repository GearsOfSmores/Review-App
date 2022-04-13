import {createContext, useState, useEffect} from 'react'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {

// isLoading is set to true by default, unitl we make request, then it is set to false
const [isLoading, setIsLoading] = useState(true)
const[feedback, setFeedback] = useState([])

// Edit Feedback state that takes a item and sets edit bool to false
const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
})


useEffect(() => {
    fetchFeedback()
}, [])


// Fetch feedback
const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
}

const deleteFeedback = async (id) => {
    // feedback.filter returns array minus the item we are deleting
    if(window.confirm('Are you sure you want to delete?')) {
        await fetch(`/feedback/${id}`,  {method: `DELETE`})

        setFeedback(feedback.filter((item) => item.id !== id))
    }
    
}


const addFeedback = async (newFeedback) => {

     // Make Post request to backend, contend type we are sending is json
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

     // Becuase state is immutable we have to make copy
    // Setfeedback to data from backend, add to array
    setFeedback([data, ...feedback])
  }

const updateFeedback = async (id, updateItem) => {

    const response = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateItem)
    })

    const data = await response.json()

    // map through the feedback array and check if the item passed is the same as the item in array
    // else return current item
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...data } : item)) 

    // setFeedback back to false
    setFeedbackEdit({
        item: {},
        edit: false,
      })
    }

// Sets the item to be updated
const editFeedback = (item) => {
    setFeedbackEdit({
        item,
        edit: true,
    })
}


    return <FeedbackContext.Provider value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext