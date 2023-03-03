import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, DatabaseReference, Database, DataSnapshot } from "firebase/database";
import { Tokens } from "interfaces";

const firebaseConfig = {
    databaseURL:
        "https://rocket-test-2933b-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const database: Database = getDatabase(app);

export let tokens: Tokens = {
    access_token: null,
    refresh_token: null
};

const tokensRef: DatabaseReference = ref(database, '/' );
onValue(tokensRef, (snapshot: DataSnapshot): void => {
    tokens = snapshot.val();
});

export async function updateTokens(access_token: string, refresh_token: string): Promise<void> {
    set(ref(database, '/'), {
        access_token: access_token,
        refresh_token: refresh_token
    })
};
