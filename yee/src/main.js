import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { firebaseConfig} from "./util/dbConfig";
import { initializeApp}from "firebase/app";
import { getFirestore, doc, getDoc }from "firebase/firestore";

loadFonts();

const firebaseApp = initializeApp(firebaseConfig);
const dbFirestore =getFirestore(firebaseApp);

async function getDocument(){
    const docRef = doc(dbFirestore , "youtest" , "1")
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
}
getDocument();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
