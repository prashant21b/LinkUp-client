import React from 'react'
// import ReactQuill from 'react-quill'
import { FaCloudUploadAlt } from "react-icons/fa";
import Avatar from 'react-avatar';
import dynamic from 'next/dynamic'

const ReactQuill=dynamic(()=>import("react-quill"),{ssr:false});
import 'react-quill/dist/quill.snow.css';
import {Blocks} from 'react-loader-spinner'
const CreatePostForm = ({ content, setContent, postSubmit,handleImage,loading,setLoading,image,setImage }) => {
    return (
        <div className='card'>
            <div className='card-body pd-3'>
                <form className='form-group'>
                    <ReactQuill
                     value={content}
                      onChange={(e) => setContent(e)} 
                      className='form-control' 
                      placeholder='Whats on your mind?'
                    />

                </form>
            </div>
            <div className='card-footer d-flex justify-content-between'>
                <button onClick={postSubmit} className='btn btn-primary mt-1 btn-sm'>Post</button>
                <label>
                {/* <FaCloudUploadAlt className='mt-2' /> */}
                
                {
                    image && image.url ?(<Avatar size="100"  src={image.url}/>):(loading)?(<Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                        /> ):(<FaCloudUploadAlt className='mt-2' />)
                }
                    <input onChange={handleImage} type="file" accept='images/*' hidden/>
                </label>
            </div>
        </div>
    )
}

{/* <Blocks
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  visible={true}
  /> */}
export default CreatePostForm
