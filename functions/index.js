const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4')

const gcconfig = {
    projectId: 'scoutx-1523612790305',
    keyFilename: 'scoutx.json'
}

const gcs = require('@google-cloud/storage')(gcconfig);

exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', error => {
            console.log(error);
            return response.status(500).json({error: error})
        });
        const bucket = gcs.bucket('scoutx-1523612790305.appspot.com');
        const uuid = UUID();

        bucket.upload('/tmp/uploaded-image.jpg', {
            uploadType: 'media',
            destination: '/places/' + uuid + '.jpg',
            metadata: {
                metadata: {
                    contentType: 'image/jpeg',
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }, (error, file) => {
            if (!error) {
                response.status(201).json({
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
                    bucket.name +
                    '/o/' +
                    encodeURIComponent(file.name) +
                    '?alt=media&token=' +
                    uuid
                });
            } else {
                console.log(error);
                response.status(500).json({error: error})
            }
        });
    });

});