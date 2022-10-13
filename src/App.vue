<template>
  <div class="box">
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+{{list.chinaAdd.localConfirmH5}}</div>
          <div>{{list.chinaTotal.localConfirm}}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+{{list.chinaAdd.nowConfirm}}</div>
          <div>{{list.chinaTotal.nowConfirm}}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+{{list.chinaAdd.confirm}}</div>
          <div>{{list.chinaTotal.confirm}}</div>
          <div>累积确诊</div>
        </section>
        <section>
          <div>较上日+{{list.chinaAdd.noInfect}}</div>
          <div>{{list.chinaTotal.noInfect}}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+{{list.chinaAdd.importedCase}}</div>
          <div>{{list.chinaTotal.importedCase}}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+{{list.chinaAdd.dead}}</div>
          <div>{{list.chinaTotal.dead}}</div>
          <div>累积死亡</div>
        </section>
      </div>
      <div class="box-left-pie">

      </div>
      <div class="box-left-line">

      </div>
    </div>
    <div id="china" class="box-center"></div>
    <div style="color:white" class="box-right">
      <table cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInX">
          <tr v-for="item in list.item" :key="item.name">
            <td align="center">{{item.name}}</td>
            <td align="center">{{item.today.confirm}}</td>
            <td align="center">{{item.total.confirm}}</td>
            <td align="center">{{item.total.heal}}</td>
            <td align="center">{{item.total.dead}}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import pinia from './stores/counter'
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import './assets/china'
import { geoCoordMap } from './assets/geoMap'
import 'animate.css'
let list = pinia()
onMounted(async () => {
  await list.List()
  initCharts()
  initPie()
  initLine()
})
const initCharts = () => {
  const ciyu = list.num.data.diseaseh5Shelf.areaTree[0].children
  console.log(list.num.data.diseaseh5Shelf.areaTree[0].children)
  const data = ciyu.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })
  const charts = echarts.init(document.querySelector('#china') as HTMLElement)

  charts.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        //  normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },

      },
      emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2]
          }
        },
        itemStyle: {
          color: '#1E90FF', //标志颜色
        },
        data: data,
      },
    ],
  })
  charts.on('click', (e: any) => {
    list.item = e.data.children
    console.log(e)
  })
}
const initPie = () => {
  const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
  charts.setOption({
    backgroundColor: '#223651',
    tooltip: {
      trigger: 'item'
    },
    /* legend: {
      top: '5%',
      left: 'center'
    }, */
    series: [
      {
        /*  name: 'Access From', */
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          /*           position: 'center' */
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        /* labelLine: {
          show: false
        }, */
        data: list.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }
    ]
  })

}
const initLine = () => {
  const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
  charts.setOption({
    backgroundColor: '#223651',
    xAxis: {
      type: 'category',
      data: list.cityDetail.map(v => v.city),
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    label: {
      show: true
    },
    series: [
      {
        data: list.cityDetail.map(v => v.nowConfirm),
        type: 'line',
        smooth: true
      }
    ]
  })
}
</script>
<style lang="less">
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.box {
  display: flex;
  height: 100%;
  background: url(./assets/4.jpg) no-repeat;
  background-size: 100% 100%;

  &-left {
    width: 370px;

    &-pie {
      height: 30%;
      margin-top: 20px;
    }

    &-line {
      height: 30%;
      margin-top: 20px;
    }

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        font-size: 12px;

        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 300px;

    table {
      font-size: 12px;
      background: #212028;
      width: 100%;

      td {
        padding: 4px 5px;
      }
    }
  }
}
</style>