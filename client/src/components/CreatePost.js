import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

const suggestions = ["Ajay", "Vector", "Dante", "Vergil"].map((name) => {
    return{
        id : name,
        text : name,
    };
});

const keyCodes = {
    comma : 188,
    enter : 13,
}

const delimiters = [keyCodes.comma, keyCodes.enter];

const CreatePost = () => {
    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [tags, setTags] = useState([]);

    //...gets the publish date for the post
    const currentDate = () => {
        const d = new Date();
        return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    };

    //...logs the post details to the console
    const addPost = (e) => {
        e.preventDefault();
        console.log({
            postTitle,
            postContent,
            username: localStorage.getItem("username"),
            timestamp: currentDate(),
        });
        navigate("/dashboard");
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    
    const handleTagClick = (index) => {
        console.log(`The tag at index ${index} was clicked`);
    }

    return (
        <>
            <div className='createPost'>
                <h2>Create a new Post</h2>
                <form className='createForm' onSubmit={addPost}>
                    <label htmlFor='title'> Title</label>
                    <input
                        type='text'
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className='createForm__title'
                    />

                    <label htmlFor='title'> Content</label>
                    <textarea
                        required
                        rows={15}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className='createForm__content'
                    />

                    <ReactTags
                        tags={tags}
                        suggestions={suggestions}
                        delimiters={delimiters}
                        handleAddition={handleAddition}
                        handleDelete={handleDelete}
                        handleTagClick={handleTagClick}
                        inputFieldPosition='bottom'
                        autocomplete
                    />

                    <button className='createForm__button'>ADD POST</button>
                </form>
            </div>
        </>
    );
};

export default CreatePost;