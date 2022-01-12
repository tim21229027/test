import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { firebaseConfig} from "./util/dbConfig";
import { initializeApp}from "firebase/app";
import { getFirestore, doc, getDoc,}from "firebase/firestore";
import{getPlaceList,getPlace,addPlace,updatePlace,deletePlace,getMyPlaceList,addEntrances,getEntrancesList,getEntrance,updateEntrances,deleteEntrances,addAttachPlace,getAttachPlaceList,updateAttachPlace,getAttachPlace,deleteAttachPlace,addAttachEntrances,getAttachEntrancesList,updateAttachEntrance,deletedateAttachEntrance,searchPlaceList,addResident,getResident,updateResident,getEntrancesHwList,getAttachEntrancesHwList,} from "./model/places";
var createTime = new Date();
var updateTime = new Date();
// var privacy =Boolean();
// const resident={
//     uId:"djhkjadnfabv",//UserID
//     create_time:createTime.toISOString(),//創建時間
//     displayName: "允",//LINE名稱
//     pictureUrl:" src",//圖片
//     privacy:privacy.toString(),//隱私
//     chineseName:"呂允成",//中文名稱
//     originalName: "jack lu",//原文名稱
//     nhiCard:"dskfnaksfn",//健保卡
//     rpIdentifyId:"hlkjaskjdl",//在台關係人身分證
//     relation: "傅子",//關係人關係
//     identifyId: "H12432532",//場所負責人身分證
//     cellphone: "0888667",//場所負責人手機
//     address: "在桃園",//戶籍地址
//     residentialAddress: "在內壢",//居住地址
//     telephone: "897987987",//場所電話
//     workPlace: "中原大學",//就職就學地點
//     email: "ajhv@gmail.com",//Email   
 
// }
// const upResident={
//     uId:"djhkjadnf;lkjakjl",//UserID
//     update_time:updateTime.toISOString(),//更新時間
//     displayName: "允",//LINE名稱
//     pictureUrl:" src",//圖片
//     privacy:privacy.toString(),//隱私
//     chineseName:"呂允成",//中文名稱
//     originalName: "jack lu",//原文名稱
//     nhiCard:"dskfnaksfn",//健保卡
//     rpIdentifyId:"hlkjaskjdl",//在台關係人身分證
//     relation: "傅子",//關係人關係
//     identifyId: "H12432532",//場所負責人身分證
//     cellphone: "0888667",//場所負責人手機
//     address: "在桃園",//戶籍地址
//     residentialAddress: "在內壢",//居住地址
//     telephone: "897987987",//場所電話
//     workPlace: "中原大學",//就職就學地點
//     email: "ajhv@gmail.com",//Email   
 
// }
const place={
    type: "大型場所",//場所類型
    name: "中原大學",//場所名稱
    identifyId: "H1234567890",//場所負責人身分證
    cellphone: "09876543210",//場所負責人手機
    address:"桃園市中壢區中北路200號",//場所地址
    taxId:"45002502",//統編
    contactAddress:"桃園市中壢區中北路200號",//聯絡地址
    telephone:"03-4818741",//場所電話
    carId:"BEN-8888",//車牌/編號
    status: "審核完成",//狀態
    create_time:createTime.toISOString(),//創建時間
    uId:"DLKFJGLKDSGLKDWFLKS",//UserID
    update_time:updateTime.toISOString(),
}
const udPlace={
    pId: 10,
    type: "大型場所",//場所類型
    name: "中原大學",//場所名稱
    identifyId: "09876543210",//場所負責人身分證
    cellphone: "桃園市中壢區中北路200號",//場所負責人手機
    address:"桃園市中壢區中北路200號",//場所地址
    taxId:"45002502",//統編
    contactAddress:"09876543210",//聯絡地址
    telephone:"03-4818741",//場所電話
    carId:"data.carId",//車牌/編號
    status: "審核完成",//狀態
    create_time:createTime.toISOString(),//創建時間
    uId:"DLKFJGLKDSGLKDWFLKS",//UserID
    update_time:updateTime.toISOString(),
}
const entrances={
    pId: 1,
    hwId:"AA",
    note:"商學小門-1",
    eName:"商學校門",
    create_time:createTime.toISOString(),//創建時間
}
const upentrances={
    eId: 2, //document.getElementById("123").text 場所ID
    pId: 2,
    hwId:"AA",
    note:"商學小門-1",
    eName:"商學小門",
    create_time:createTime.toISOString(),//創建時間
}
const attachPlace={
    pId:2,
    apType: "固定場所",//場所類型
    apName: "資管樓",//場所名稱
    apIdentifyId: "h1235678903",//場所負責人身分證
    apCellphone: "09876543210",//場所負責人手機
    apAddress: "桃園市中壢區中北路200號",//場所地址
    apTaxId: "45002502",//統編
    apContactAddress: "桃園市中壢區中北路200號",//聯絡地址
    apTelephone: "03-4817878",//場所電話
    apCarId: "BEN-9999",//車牌/編號
    apStatus: "審核完成",//狀態
    create_time:createTime.toISOString(),//創建時間
    apUid:"DLKFJGLKDSGLKDWFLKS",//UserID
    update_time:updateTime.toISOString(),
}
const upAttachPlace={
    apId:2, //document.getElementById("123").text 場所ID
    pId:2,
    apType: "固定場所",//場所類型
    apName: "資管樓",//場所名稱
    apIdentifyId: "h1235678903",//場所負責人身分證
    apCellphone: "09876543210",//場所負責人手機
    apAddress: "桃園市中壢區中北路200號",//場所地址
    apTaxId: "45002502",//統編
    apContactAddress: "桃園市中壢區中北路200號",//聯絡地址
    apTelephone: "03-4817878",//場所電話
    apCarId: "BEN-9999",//車牌/編號
    apStatus: "審核完成",//狀態
    create_time:createTime.toISOString(),//創建時間
    apUid:"DLKFJGLKDSGLKDWFLKS",//UserID
    update_time:updateTime.toISOString(),
}
const AttachEntrances={
   
      apId: 0,
      apehwId:"AB",
      apeNote:"前門-1",
      apeName:"前門",
      create_time:createTime.toISOString(),//創建時間
}
const udAttachEntrances={
    apeId:1,
    apId: 1,
    apehwId:"AB",
    apeNote:"前門-1",
    apeName:"前門",
    create_time:createTime.toISOString(),//創建時間
}
// getPlaceList().then((test)=>{
//     console.log("請求場所全部資料",test);
// });
// searchPlaceList("data.name").then((test)=>{
//     console.log("查詢場所資料",test);
// });
// getEntrancesList(2).then((test)=>{
//     console.log("請求場所出入口全部資料",test);
// });

// getAttachPlaceList(2).then((test)=>{
//     console.log("請求附屬場所全部資料",test);
// });

// getAttachEntrancesList(1).then((test)=>{
//     console.log("請求附屬場出入口所全部資料",test);
// });

// getMyPlaceList("www").then((test)=>{
//     console.log("請求我的場所資料",test);
// });
// getEntrancesHwList("data.HwId").then((test)=>{
//     console.log("請求場所hw資料",test);
// });
// getAttachEntrancesHwList("data.apehwId").then((test)=>{
//     console.log("請求附屬場所hw資料",test);
// });
// getPlace(2).then((test)=>{
//     console.log("請求場所詳細資料(pid,type,name)",test);
// });
// getPlace(2).then((test)=>{
//     console.log("請求場所詳細資料(全部)",test);
// });
// getPlace(2).then((test)=>{
//     console.log("請求場所詳細資料(全部)",test);
// });
// getEntrance(2).then((test)=>{
//     console.log("請求出入口詳細資料(全部)",test);
// });
// getAttachPlace(2).then((test)=>{
//     console.log("請求附屬場所詳細資料(全部)",test);
// });
// getResident("djhkjadnf;lkjakjl").then((test)=>{
//     console.log("請求住民詳細資料(全部)",test);
// });

// addPlace(place).then((test)=>{
//     console.log("新增場所",test);
// });
// addResident(resident).then((test)=>{
//     console.log("新增住民",test);
// });
// addEntrances(entrances).then((test)=>{
//     console.log("新增場所出入口",test);
// });
// addAttachPlace(attachPlace).then((test)=>{
//     console.log("新增附屬場所",test);
// });
// addAttachEntrances(AttachEntrances).then((test)=>{
//     console.log("新增附屬場所出入口",test);
// });

// updatePlace(udPlace).then((test)=>{
//     console.log("更新場所",test);
// });
// updateResident(upResident).then((test)=>{
//     console.log("更新場所",test);
// });
// updateEntrances(upentrances).then((test)=>{
//     console.log("更新場所出入口",test);
// });
// updateAttachPlace(upAttachPlace).then((test)=>{
//     console.log("更新附屬場所",test);
// });
// updateAttachEntrance(udAttachEntrances).then((test)=>{
//     console.log("更新附屬場所出入口",test);
// });

// deletePlace(1).then((test)=>{
//     console.log("刪除場所",test);
// });
// deleteEntrances(1).then((test)=>{
//     console.log("刪除場所出入口",test);
// });
// deleteAttachPlace(1).then((test)=>{
//     console.log("刪除附屬場所",test);
// });
// deletedateAttachEntrance(1).then((test)=>{
//     console.log("刪除附屬場所出入口",test);
// });
loadFonts();

const firebaseApp = initializeApp(firebaseConfig);
const dbFirestore =getFirestore(firebaseApp);

async function getDocument(){
    const docRef = doc(dbFirestore , "YOUTEST" , 
    "7nhjw9ym6jIHrJwTJJND")
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
}
getDocument();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
