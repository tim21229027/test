import { firebaseConfig } from "../util/dbConfig";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const dbFirestore = getFirestore(firebaseApp);

// Get a list of cities from your database
export async function getPlaceList() {
  var placelist = [];
  const q = collection(dbFirestore, "places");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    placelist.push(doc.data());
  });
  return placelist;
}

// Get a list of cities from your database
export async function getAttachPlaceList(pId) {
  var placelist = [];
  const q = collection(dbFirestore, "places", pId.toString(), "attachPlaces");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    placelist.push(doc.data());
  });
  return placelist;
}

export async function getPlace(id) {
  var place = "";
  const docRef = doc(dbFirestore, "places", id.toString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    place = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return place;
}

export async function getAttachPlace(pId, attachId) {
  var att_place = "";
  const docRef = doc(
    dbFirestore,
    "places",
    pId.toString(),
    "attachPlaces",
    attachId.toString()
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    att_place = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return att_place;
}

export async function getPlaceEntrance(pId, enterId) {
  var enter = "";
  const docRef = doc(
    dbFirestore,
    "places",
    pId.toString(),
    "entrance",
    enterId.toString()
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    enter = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return enter;
}

export async function getAttachPlaceEntrance(pId, attachId, enterId) {
  var att_enter = "";
  const docRef = doc(
    dbFirestore,
    "places",
    pId.toString(),
    "attachPlaces",
    attachId.toString(),
    "attachEntrance",
    enterId.toString()
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    att_enter = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return att_enter;
}

async function getCount(docName) {
  var counter = 0;
  const docRef = doc(dbFirestore, "counters", docName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    counter = docSnap.data().count;
    await setDoc(doc(dbFirestore, "counters", docName), {
      count: (docSnap.data().count += 1),
    });
  }
  return counter;
}

export async function addPlace(data) {
  var addStatus = false;
  var createTime = new Date();
  await getCount("places").then((count) => {
    setDoc(doc(dbFirestore, "places", count.toString()), {
      pId: count, //document.getElementById("123").text
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
      create_time: createTime.toISOString(),
    });
    addStatus = true;
  });
  return addStatus;
}

export async function addPlaceAttachPlaces(pId, data) {
  var addStatus = false;
  var createTime = new Date();
  await getCount("attachPlaces").then((count) => {
    setDoc(
      doc(
        dbFirestore,
        "places",
        pId.toString(),
        "attachPlaces",
        count.toString()
      ),
      {
        attachId: count, //document.getElementById("123").text
        pId: pId,
        att_type: data.type,
        att_name: data.name,
        att_identifyId: data.identifyId,
        att_cellphone: data.cellphone,
        att_address: data.address,
        att_taxId: data.taxId,
        att_cotactAddress: data.cotactAddress,
        att_telephone: data.telephone,
        att_carId: data.carId,
        att_uId: data.uId,
        att_status: "審核通過",
        create_time: createTime.toISOString(),
      }
    );
    addStatus = true;
  });
  return addStatus;
}

export async function addPlaceEntrance(pId, hwid, note) {
  var createTime = new Date();
  await getCount("attachEntrances").then((count) => {
    setDoc(
      doc(dbFirestore, "places", pId.toString(), "entrance", count.toString()),
      {
        id: count, //document.getElementById("123").text
        pId: pId,
        hwid: hwid,
        note: note,
        create_time: createTime.toISOString(),
      }
    );
  });
}

export async function addAttachPlaceEntrance(pId, attachId, hwid, note) {
  var createTime = new Date();
  await getCount("attachEntrances").then((count) => {
    setDoc(
      doc(
        dbFirestore,
        "places",
        pId.toString(),
        "attachPlaces",
        attachId.toString(),
        "attachEntrance",
        count.toString()
      ),
      {
        id: count, //document.getElementById("123").text
        attachId: attachId,
        hwid: hwid,
        note: note,
        create_time: createTime.toISOString(),
      }
    );
  });
}

export async function deletePlace(id) {
  var status = false;
  const place = await getPlace(id);
  if (place != "") {
    deleteDoc(doc(dbFirestore, "places", id.toString()));
    status = true;
  }
  return status;
}

export async function deleteAttachPlace(pId, attachId) {
  var status = false;
  const place = await getAttachPlace(pId, attachId);
  if (place != "") {
    deleteDoc(
      doc(
        dbFirestore,
        "places",
        pId.toString(),
        "attachPlaces",
        attachId.toString()
      )
    );
    status = true;
  }
  return status;
}

export async function updatePlace(data) {
  var status = false;
  const place = await getPlace(data.pId);
  var updateTime = new Date();
  if (place != "") {
    await updateDoc(doc(dbFirestore, "places", data.pId.toString()), {
      pId: data.pId,
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
      update_time: updateTime.toISOString(),
    });
    status = true;
  }
  return status;
}

export async function updateAttachPlace(att_doc) {
  var status = false;
  var updateTime = new Date();
  const place = await getAttachPlace(att_doc.pId, att_doc.attachId);
  if (place != "") {
    await updateDoc(
      doc(
        dbFirestore,
        "places",
        att_doc.pId.toString(),
        "attachPlaces",
        att_doc.attachId.toString()
      ),
      {
        att_type: att_doc.type,
        att_name: att_doc.name,
        att_identifyId: att_doc.identifyId,
        att_cellphone: att_doc.cellphone,
        att_address: att_doc.address,
        att_taxId: att_doc.taxId,
        att_cotactAddress: att_doc.cotactAddress,
        att_telephone: att_doc.telephone,
        att_carId: att_doc.carId,
        att_uId: att_doc.uId,
        att_status: "審核通過",
        update_time: updateTime.toISOString(),
      }
    );
    status = true;
  }
  return status;
}

export async function updateEntrance(pId, enterId, beacon) {
  var status = false;
  var updateTime = new Date();
  const place = await getPlaceEntrance(pId, enterId);
  if (place != "") {
    await updateDoc(
      doc(
        dbFirestore,
        "places",
        pId.toString(),
        "entrance",
        enterId.toString()
      ),
      {
        hwid: beacon.hwid,
        note: beacon.note,
        update_time: updateTime.toISOString(),
      }
    );
    status = true;
  }
  return status;
}

export async function updateAttachEntrance(pId, attachId, enterId, beacon) {
  var status = false;
  const place = await getAttachPlaceEntrance(pId, attachId, enterId);
  var updateTime = new Date();
  if (place != "") {
    await updateDoc(
      doc(
        dbFirestore,
        "places",
        pId.toString(),
        "attachPlaces",
        attachId.toString(),
        "attachEntrance",
        enterId.toString()
      ),
      {
        hwid: beacon.hwid,
        note: beacon.note,
        update_time: updateTime.toISOString(),
      }
    );
    status = true;
  }
  return status;
}
