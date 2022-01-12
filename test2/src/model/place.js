import { initializeApp } from "firebase/app";
import { 
    getDocs,
    getFirestore,
    collection,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

import { firebaseConfig } from "../util/dbConfig";

const firebaseApp= initializeApp(firebaseConfig);
const dbFirestore =getFirestore(firebaseApp);

export async function getPlaceList(){
    var placelist=[];
    const col =collection(dbFirestore,"Place");
    const querySnapshot = await getDocs(col);
    querySnapshot.forEach((doc)=>  {
        placelist.push(doc.data());
    });
    return placelist;
}

export async function getPlace(id){
    var place="";
    const docRef =doc(dbFirestore,"Place",id.toString());
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        place=docSnap.data();
    }else{
        console.log("No such document!")
    }
    return place;
}

export async function addPlace(data) {
    var addStatus = false;
    var createTime = new Date();
    await setDoc(doc(dbFirestore, "Place", data.pId.toString()), {
      pId: data.pId, //document.getElementById("123").text
      type: data.type,
      name: data.name,
      identifyId: data.identifyId,
      cellphone: data.cellphone,
      address: data.address,
      taxId: data.taxId,
      cotactAddress: data.cotactAddress,
      telephone: data.telephone,
      carId: data.carId,
      uId: data.uId,
      status: "審核通過",
      create_time:createTime.toISOString(),
      
    });
    addStatus=true;
    return addStatus ;
}

export async function updatePlace(data) {
    var Status = false;
    const place=await getPlace(data.pId);
    var updateTime = new Date();
    if(place !="")
    {
     await updateDoc(doc(dbFirestore, "Place", data.pId.toString()), {
      pId: data.pId, //document.getElementById("123").text
      type: data.type,
      name: data.name,
      identifyId: data.identifyId,
      cellphone: data.cellphone,
      address: data.address,
      taxId: data.taxId,
      cotactAddress: data.cotactAddress,
      telephone: data.telephone,
      carId: data.carId,
      uId: data.uId,
      status: "審核通過",
      update_time:updateTime.toISOString(),
     });
     Status=true;
    }
    return Status ;

}
