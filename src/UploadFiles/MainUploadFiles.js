import React ,{ useState}from 'react';
import * as tus from "tus-js-client";

// import FileUploadProgress  from 'react-fileupload-progress';


export default function  MainUploadFiles() {

    const [formFile,setFormFile] = useState(null);

    const UploadFiles = ()=>{

        //var file = e.target.files[0]
        if(formFile == null){
            return;
        }



        let data = new FormData();
        data.append('formFile',formFile);

        let reader = new FileReader();
        reader.readAsText(formFile);

        var newBlob = new Blob([formFile]);

        // Create a new tus upload
        var upload = new tus.Upload(newBlob, {
            endpoint: "https://localhost:44304/api/UploadFilesController/UploadFiles",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            metadata: {
                filename: formFile.name,
                filetype: formFile.type
            },
            onError: function(error) {
                console.log("Failed because: " + error)
            },
            onProgress: function(bytesUploaded, bytesTotal) {
                var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                console.log( 'onProgress', bytesUploaded, bytesTotal, percentage + "%")
            },
            onSuccess: function() {
                console.log("Download %s from %s", upload.file.name, upload.url)
            }
        })
        // Check if there are any previous uploads to continue.
        upload.findPreviousUploads().then(function (previousUploads) {
            // Found previous uploads so we select the first one.
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0])
            }

            console.log(upload);
            // Start the upload
          //  upload.start()
        })

    };





    return(<div>

        <input
            name={'formFile'}
            type={'file'}
            onChange={(e)=>{setFormFile(e.target.files[0])}}

        />
        <button
            type={'button'}
            onClick={UploadFiles}
        >
            Upload

        </button>
<hr/>

           {/* <FileUploadProgress key='ex1'*/}
           {/*                 url='https://localhost:44304/api/UploadFilesController/UploadFiles'*/}
           {/*                 onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}*/}
           {/*                 onLoad={ (e, request) => {console.log('load', e, request);}}*/}
           {/*                 onError={ (e, request) => {console.log('error', e, request);}}*/}
           {/*                 onAbort={ (e, request) => {console.log('abort', e, request);}}*/}
           {/*/>*/}
    </div>);

};
