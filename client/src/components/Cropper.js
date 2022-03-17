
import React, { useRef } from "react";
import ReactCropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const Cropper = (props)=> {

    const cropperRef =useRef()
    const onCrop = () => {
      const imageElement = cropperRef?.current;
      const cropper = imageElement?.cropper;
      console.log(cropper.getCroppedCanvas().toDataURL());
    };

    return (
      <div>
        <ReactCropper
          src={props.src}
          style={{ height: 400, width: "100%" }}
          // Cropper.js options
          initialAspectRatio={16 / 9}
          guides={false}
          crop={onCrop}
          ref={cropperRef}
        />
      </div>
    );
}

export default Cropper;