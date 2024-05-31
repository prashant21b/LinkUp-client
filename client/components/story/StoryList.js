// components/StoryList.js
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { FaArrowLeft, FaArrowRight, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import {Blocks} from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { userContext } from '../../context';
import moment from 'moment';
const StoryList = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const [showAddStory, setShowAddStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
   const [image,setImage]=useState({})
   const [loading,setLoading]=useState(false)
   const [stories,setStories]=useState([])
   const [state,setState]=useContext(userContext)

  // console.log(state)
  const userId = state.user._id;
  const followersSet = new Set(state.user.followers);
  const followingSet = new Set(state.user.following);
  
  // Separate the user's own stories
  const userStories = stories.filter(story => story.createdBy._id === userId);
  
  // Filter other stories based on followers and following
  const otherStories = stories.filter(story => 
      story.createdBy._id !== userId && 
      (followersSet.has(story.createdBy._id) || followingSet.has(story.createdBy._id))
  );
  
  // Concatenate userStories at the beginning
  const filteredStories = [...userStories, ...otherStories];
  
  //console.log(filteredStories);
  

  // console.log("filterstories",filteredStory)
const handleImage = async (e) => {
        const file = e.target.files[0]
        let formData = new FormData();
        formData.append("images", file)
        console.log([...formData])
        setLoading(true)
        try {

            const response = await axios.post(`/posts/upload-image`, formData)
            console.log(response.data)
            setImage({
                url: response.data.url,
                public_id: response.data.public_id,
            })
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
   
  const handleCloseStory = () => setShowStory(false);
  const handleShowStory = (story) => {
    setSelectedStory(story);
    setShowStory(true);
  };

  const handleCloseAddStory = () => setShowAddStory(false);
  const handleShowAddStory = () => setShowAddStory(true);

  const handleNext = () => {
    if (currentIndex < stories.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddStory =async () => {
    try{
         const response=await axios.post(`/posts/add-story`,{
            image,
         })
         if (response.data.error) {
            toast.error(response.data.error)
        }
        else{
            setImage("")
            toast.success("Story Added")
            getAllStories()
        }

    }
    catch(error){
        console.log(error)
    }
  };
  const getAllStories=async()=>{
    try{
        const response=await axios.get(`/posts/all-stories`)
         setStories(response.data)
    }
    catch(error){
        console.log(error)
    }
}
useEffect(()=>{
    if(state && state.user) getAllStories()
},[])
console.log("71",stories)
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Button variant="dark" onClick={handlePrev} disabled={currentIndex === 0}>
        <FaArrowLeft />
      </Button>
      <div className="d-flex mx-2">
        <div className="mx-1" onClick={handleShowAddStory}>
          <Avatar name="+" size="60" round={true} />
        </div>
        {filteredStories.slice(currentIndex, currentIndex + 5).map((story) => (
          <div key={story.id} className="mx-1" onClick={() => handleShowStory(story)}>
            <Avatar src={story.image.url} size="60" round={true} />
          </div>
        ))}
      </div>
      <Button variant="dark" onClick={handleNext} disabled={currentIndex >= stories.length - 5}>
        <FaArrowRight />
      </Button>

      {/* View Story Modal */}
      <Modal show={showStory} onHide={handleCloseStory}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStory?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div key={selectedStory?.createdBy._id} className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                       {
                        selectedStory?.createdBy.image?(<Avatar 
                        name={selectedStory.createdBy.name} 
                        size="40" 
                        round={true} 
                        className="mr-3" 
                        src={selectedStory.createdBy.image.url} // if available
                    />):(<Avatar round="20px" name={selectedStory?.createdBy.name[0]} className="mb-2" size="40" />)
                       } 
                        <div className="mx-2">
                            {/* <h6 className="mb-0 text-primary">{selectedStory?.createdBy.username}</h6> */}
                            <p className="text-muted mb-0">{selectedStory?.createdBy.name}</p>
                            <span className="pt-2" style={{ marginLeft: '1rem' }}>{moment(selectedStory?.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    {/* <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleFollow(com.postedBY._id)}
                    >
                        Follow
                    </Button> */}
                </div>
          {selectedStory?.image.url && (
            <img src={selectedStory.image.url} alt="story" style={{ width: '100%', marginBottom: '15px' }} />
          )}
          {/* {selectedStory?.content} */}
        </Modal.Body>
      </Modal>

      {/* Add Story Modal */}
      <Modal show={showAddStory} onHide={handleCloseAddStory}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleImage}
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
              {/* <FaUpload size={50} /> */}
              {
                    image && image.url ?(<Avatar size="100"  src={image.url}/>):(loading)?(<Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                        /> ):(<FaUpload size={50}/>)
                }
                    <input onChange={handleImage} type="file" accept='images/*' hidden/>
            </label>
            <Button variant="primary" className="mt-3" onClick={handleAddStory}>
              Add Story
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StoryList;
