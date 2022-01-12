<template>
  <div>
   <!--<div>
    <HelloWorld /></div>-->
    <div v-for="(data,index) in placeData" :key="index" @click="goToPlacePage(data.pId)">
       {{data}}
       <h1>{{index}}</h1>
       <h2>{{data.name}}</h2>
    </div>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import{getPlaceList,getPlace,addPlace,updatePlace} from "../model/place";
import{onMounted, ref} from "vue"
export default {
  name: "Home",

  components: {
    HelloWorld,
  } ,
  setup(){
    onMounted(async() => {
      await getPlaceList().then((res)=>{
        console.log(26, res);
        Object.assign(placeData.value, res);
      });
      console.log(29, placeData.value);
    });
    const placeData = ref([]);
    async function goToPlacePage(pId){
      console.log(42, pId);

      await getPlace(pId).then((res)=>{
        console.log(44, res);
      })
    }
    return{placeData, goToPlacePage};
  }
};
</script>
