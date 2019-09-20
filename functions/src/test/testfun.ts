import admin from "../config";
const { Logging } = require('@google-cloud/logging');

// import * as functions from 'firebase-functions';

// const path = require('path');
// const os = require('os');
// const fs = require('fs');
// const Busboy = require('busboy');



export const filterTest = async (request: any, response: any) => {
    try {
        response.status(200).send({
            data: { success: true, messge: request.body }
        });
        return;
    } catch (error) {
        response.status(500).send({
            data: { success: false, error, messge: request.body }
        });
        return;
    }
}
export const filter = async (request: any, response: any, next: any) => {
    console.log("request filter", request.body.data.procedureId);
    if (request.method == "POST") {
        next();
    } else if (request.method == "GET") {
        next();
    } else {
        response.status(500).send({
            data: { success: false }
        });
    }
}
export const auth = async (request: any, response: any, next: any) => {
    console.log("request auth", request);

    const token = request.headers && request.headers["authorization"];
    if (!token) {
        return response.status(401).send("Access denied.");
    } else {
        next()
    }
}

export const logs = async (request: any, response: any, next: any) => {
    console.log('LOGGED', request.path)
    next()
}
// export const upload = async (req: any, res: any) => {
//     console.log('hehehehhehehehehhereere')
//     console.info(functions.storage.object())
//     if (req.method === 'POST') {
//         const busboy = new Busboy({ headers: req.headers });

//         await busboy.on('file', async (fieldname: any, file: any, filename: any, encoding: any, mimetype: any) => {
//             console.log("fieldname of ", fieldname);
//             console.log("filename of", filename);
//             console.log("file of ", file);
//             console.log("encoding of ", encoding);
//             console.log("mimetype of", mimetype);


//             const fstream = await fs.createWriteStream(path.join(os.tmpdir(), filename));
//             // Pipe it trough
//             await file.pipe(fstream);


//             // const storage = new Storage();
//             const bucketName = "testmehko.appspot.com";
//             // const bucket = storage.bucket(bucketName);
//             // console.log("fstream of", fstream);
//             // const storageName = admin.storage().bucket().name;
//             const bucket = admin.storage().bucket(bucketName);
//             // console.log("storageName", storageName);
//             // console.log("bucket", bucket);
//             const tempLocalFile = path.join(os.tmpdir(), filename);
//             // console.log("tempLocalFile", tempLocalFile);

//             // await bucket.upload(tempLocalFile).then((data: any) => {
//             //     console.log("data = ", data);
//             // }).catch((e: any) => {
//             //     console.log("error = ", e);

//             // })
//             // const newFile = bucket.file(filename);
//             // await newFile.download({ destination: tempLocalFile });

//             await bucket.upload(tempLocalFile, { destination: tempLocalFile }).then((data: any) => {
//                 console.log("data = ", data);
//             }).catch((e: any) => {
//                 console.log("error = ", e);

//             });


//             // On finish of the upload
//             fstream.on('close', () => {
//                 console.log(`Upload of '${filename}' finished`);
//                 res.redirect('back');
//             });

//         });

//         busboy.end(req.rawBody);
//     } else {
//         // Client error - only support POST
//         res.status(405).end();
//     }


// }