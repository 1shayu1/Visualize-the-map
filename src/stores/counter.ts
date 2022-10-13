import { defineStore } from 'pinia'
import { server } from '@/api'
import type {RootObject,Children,ChinaTotal,ChinaAdd,StatisGradeCityDetail} from '../type'
const list = defineStore('list',{
  state:()=>{
    return{
    num:<RootObject>{},
    item:<Children[]>[],
    chinaAdd:<ChinaAdd>{},
    chinaTotal:<ChinaTotal>{},
    cityDetail:<StatisGradeCityDetail[]>[]
    }
  },
  actions:{
  async List(){
  let list = await server()
  console.log(list)
  this.$state.num = list.data
  this.$state.chinaAdd = list.data.data.diseaseh5Shelf.chinaAdd
  this.$state.chinaTotal = list.data.data.diseaseh5Shelf.chinaTotal
  this.$state.cityDetail = list.data.data.statisGradeCityDetail.slice(0,10)
  }  
  }
})

export default list