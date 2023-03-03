import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
const firebaseConfig = {
    databaseURL:
        "https://rocket-test-2933b-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app);

interface Tokens {
    access_token: string;
    refresh_token: string;
}

export let tokens: Tokens = {
    access_token: null,
    refresh_token: null
};

const tokensRef = ref(database, '/' );
onValue(tokensRef, (snapshot) => {
    tokens = snapshot.val();
})

async function updateTokens(access_token, refresh_token) {
    set(ref(database, '/'), {
        access_token: tokensResponseJson.access_token,
        refresh_token: tokensResponseJson.refresh_token
    })
    .then(() => {
        fetch(process.env.AMO_API_URL + "api/v4/leads", {
            headers: {
                Authorization: `Bearer ${tokensResponseJson.access_token}`
                }
            })

        if (leads.status !== 401) {
            return leads.ok ? leads.json() : `Response error: ${leads.status}`
        }
    })
    .catch((error) => {
    // The write failed...
    });
}
