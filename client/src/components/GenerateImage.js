import React, { useState } from "react";
import axios from "axios";
import anywhereDoor from "../image/anywhereDoor.png";

//config out of the folder
// const config = require("../../../config");
// const REACT_APP_AUTHORIZATION = config.get("REACT_APP_AUTHORIZATION");

//loadier
import ClipLoader from "react-spinners/ClipLoader";


export default function GenerateImage() {
  const sampleImg = anywhereDoor;

  const [image, setImage] = useState(sampleImg);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

      const inputs = {
        placeholder: "Please type your image description...",
        errorMessage: "Input field cannot be empty",
        required: true,
      };

      const changeHandler = (e) => {
        setTextInput(e.target.value);
      };

      // console.log(process.env);

      //Create Axios
      // const api = axios.create({
      //   baseURL: "/api",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      // });

      const generateHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const response = await axios.post("/api/openai/image", { textInput });
          // console.log(Response);
          // console.log(Response.data);
          setImage(response.data);
        } catch (err) {
          console.log(err);
          if (err.response.data.error) {
            setError(err.response.data.error);
          } else if (err.message) {
            setError(err.message);
          }
        }
        setTimeout(() => {
          setError("");
        }, 5000);
        setLoading(false);
      };
   
       const handleFocus = (e) => {
      setFocused(true);
    };


    return (
      <div className="aiContainer container-fluid">
        <form onSubmit={generateHandler}>
          <textarea
            placeholder={inputs.placeholder}
            className="form-control"
            onChange={changeHandler}
            value={textInput}
            cols="50"
            rows="5"
            required={inputs.required}
            onBlur={handleFocus}
            focused={focused.toString()}
          ></textarea>
          {/* <span>{inputs.errorMessage}</span> */}
          <button className="btn btn-dark">Generate Image</button>
          <div>
            {loading ? (
              <ClipLoader
                className="loader"
                color={"#6c6d6d"}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <img src={image} alt="openAIImage" />
            )}
          </div>
        </form>
      </div>
    );
            };
