import React ,{ useState}from 'react';
import * as tus from "tus-js-client";




export default function  MainUploadFiles() {

    const [file,setFile] = useState(null);

    const UploadFiles = ()=>{

        // axios.post("https://localhost:44304/api/UploadFilesController/UploadFiles" , data)
        //     .then((res)=>{
        //         console.log(res);
        //     }).catch((e)=>{
        //     console.log(e);
        // });

        console.log(file);
        //var file = e.target.files[0]
        if(file == null){
            return;
        }

        // Create a new tus upload
        var upload = new tus.Upload(file, {
            endpoint: "https://localhost:44304/api/UploadFilesController/UploadFiles",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
            metadata: {
                filename: file.name,
                filetype: file.type
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

            console.log( upload);
            // Start the upload
            upload.start()
        })

    };





    return(<div>

        <input
            type={'file'}
            onChange={(e)=>{setFile(e.target.files[0])}}
            multiple={true}
        />
        <button
            type={'button'}
            onClick={UploadFiles}
        >
            Upload

        </button>
    </div>);

};
