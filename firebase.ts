import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
const firebaseConfig = {
    databaseURL:
        "https://rocket-test-2933b-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

interface Tokens {
    access_token: string;
    refresh_token: string;
}

export async function getTokens(): Promise<any> {
    const dbRef = ref(database);
    get(child(dbRef, `/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val())
                return snapshot.val();
            } else {
                return "No data available";
            }
        })
        .catch((error) => {
            return error;
        });
}
