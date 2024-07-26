const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.transferData = functions.pubsub.schedule('every 5 minutes').onRun(async (context) => {
    const sourceRef = admin.database().ref('/path-to-source-data'); // Ajusta el path según tu estructura
    const destinationRef = admin.firestore().collection('Metricas');

    try {
        const snapshot = await sourceRef.once('value');
        const data = snapshot.val();

        if (data) {
            const batch = admin.firestore().batch();
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const docRef = destinationRef.doc(key);
                    batch.set(docRef, data[key]);
                }
            }
            await batch.commit();
            console.log('Data transfer complete.');
        } else {
            console.log('No data available to transfer.');
        }
    } catch (error) {
        console.error('Error transferring data:', error);
    }
});
