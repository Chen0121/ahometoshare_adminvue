<template>
  <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex>
            <v-parallax
              height="100"
              dark
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            >
              <v-layout
                align-center
                column
                justify-center
              >
                <h2 class="display-2 font-weight-strong mb-3">Welcome to A Home To Share dashboard </h2>
              </v-layout>
            </v-parallax>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md4>
            <v-layout row wrap>
              <v-flex md12>
                <v-card color="green" class="white--text">
                  <v-layout>
                    <v-flex xs12>
                      <v-card-text class="font-weight-medium subheading">
                        Total registered hosts: <span>{{hostData.totalRegisteredHost}}</span>
                      </v-card-text>
                      <v-divider light></v-divider>
                      <v-card-text class="font-weight-medium subheading">
                        Active hosts for last quarter: <span>{{hostData.quarterlyActiveHost}}</span>
                      </v-card-text>
                      <v-divider light></v-divider>
                      <v-card-text class="font-weight-medium subheading">
                        Active hosts for last 30 days: <span>{{hostData.monthlyActiveHost}}</span>
                      </v-card-text>
                      <v-divider light></v-divider>
                      <v-card-text class="font-weight-medium subheading">
                        Active hosts for last 7 days: <span>{{hostData.weeklyActiveHost}}</span>
                      </v-card-text>
                    </v-flex>
                    
                  </v-layout>
                  <v-divider light></v-divider>
                  <v-card-actions class="pa-3">
                    <v-spacer></v-spacer>
                    <div>
                      <div class="headline">Host Data</div>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex md12>
                <v-card
                  class="mx-auto text-xs-center"
                  color="green"
                  dark
                >
                  <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                      <v-sparkline
                        :value="hostActiveness"
                        :fill="fill"
                        :gradient="gradient"
                        :smooth="radius || false"
                        :padding="padding"
                        :line-width="width"
                        :stroke-linecap="lineCap"
                        :gradient-direction="gradientDirection"
                        height="100"
                        auto-draw
                      ></v-sparkline>
                    </v-sheet>
                  </v-card-text>

                  <v-card-text>
                    <div class="display-1 font-weight-thin">Active hosts for last 12 months</div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="justify-center">
                    <v-btn block flat @click="routerToHostManagement">Go to host management</v-btn>
                  </v-card-actions>
                </v-card>     
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 md4>
            <v-layout row wrap>
              <v-flex md12>
                <v-card color="cyan darken-2" class="white--text">
                  <v-layout>
                    <v-flex xs12>
                      <v-card-text class="font-weight-medium subheading">
                        Total registered renters: <span>{{renterData.totalRegisteredRenter}}</span>
                      </v-card-text>
                      <v-divider light></v-divider>
                      <v-card-text class="font-weight-medium subheading">
                        Active renters for last quarter: <span>{{renterData.quarterlyActiveRenter}}</span>
                      </v-card-text>
                      <v-divider light></v-divider>
                      <v-card-text class="font-weight-medium subheading">
                        Active renters for last 30 days: <span>{{renterData.monthlyActiveRenter}}</span>
                      </v-card-text>
                      <v-divider light></v-divider>
                      <v-card-text class="font-weight-medium subheading">
                        Active renters for last 7 days: <span>{{renterData.weeklyActiveRenter}}</span>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                  <v-divider light></v-divider>
                  <v-card-actions class="pa-3">
                    <v-spacer></v-spacer>
                    <div>
                      <div class="headline">Renter Data</div>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex md12>
                <v-card
                  class="mx-auto text-xs-center"
                  color="cyan darken-2"
                  dark
                >
                  <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                      <v-sparkline
                        :value="renterActiveness"
                        :fill="fill"
                        :gradient="gradient"
                        :smooth="radius || false"
                        :padding="padding"
                        :line-width="width"
                        :stroke-linecap="lineCap"
                        :gradient-direction="gradientDirection"
                        height="100"
                        auto-draw
                      ></v-sparkline>
                    </v-sheet>
                  </v-card-text>

                  <v-card-text>
                    <div class="display-1 font-weight-thin">Active renters for last 12 months</div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="justify-center" >
                    <v-btn block flat @click="routerToRenterManagement">Go to renter management</v-btn>
                  </v-card-actions>
                </v-card>     
              </v-flex>
            </v-layout>
            
            
          </v-flex>

          <v-flex xs12 md4>
            <v-chart :options="referralSource"/>
          </v-flex>
        </v-layout>
        
        <v-layout justify-center ma-2 row wrap>
          <v-flex md12>
            
          </v-flex>
          <v-flex md6>
            <v-layout wrap md12>
              <v-flex xs12>
                <v-layout>

                </v-layout>
              </v-flex>
              
              <v-flex md12>
                <v-card>
                  <v-layout wrap row justify-center>
                    <v-flex xs12 md12>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">Control Panel</div>
                          <span>Change settings to vivify sparklines</span>
                        </div>
                      </v-card-title>
                    </v-flex>
                  </v-layout>
                  <v-divider light></v-divider>
                  <v-layout wrap row justify-center>
                    <v-flex xs12 md5>
                      <v-layout fill-height align-center>
                        <v-item-group v-model="gradient" mandatory>
                          <v-layout>
                            <v-item v-for="(gradient, i) in gradients" :key="i" :value="gradient">
                              <v-card
                                slot-scope="{ active, toggle }"
                                :style="{
                                  background: gradient.length > 1
                                    ? `linear-gradient(0deg, ${gradient})`
                                    : gradient[0],
                                  border: '2px solid',
                                  borderColor: active ? '#222' : 'white'
                                }"
                                width="30"
                                height="30"
                                class="mr-2"
                                @click.native="toggle"
                              ></v-card>
                            </v-item>
                          </v-layout>
                        </v-item-group>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 md5>
                      <v-slider v-model="width" label="Width" min="0.1" max="10" step="0.1" thumb-label></v-slider>
                    </v-flex>

                    <v-flex xs12 md5>
                      <v-layout fill-height align-center>
                        <v-switch v-model="fill" label="Filled"></v-switch>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 md5>
                      <v-slider v-model="radius" label="Radius" min="0" max="25" thumb-label></v-slider>
                    </v-flex>
                    <v-flex xs12 md5 offset-md5>
                      <v-slider v-model="padding" label="Padding" min="0" max="25" thumb-label small></v-slider>
                    </v-flex>

                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
</template>


<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import router from "../router";

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      hostData : {
        monthlyActiveHost: 2,
        quarterlyActiveHost: 2,
        totalRegisteredHost: 1,
        weeklyActiveHost: 2,
        },
      renterData : {
        monthlyActiveRenter: 2,
        quarterlyActiveRenter: 2,
        totalRegisteredRenter: 1,
        weeklyActiveRenter: 2
      },
      hostActiveness : [0,0],
      renterActiveness : [0,0],
      referralSource : {
      title : {
              text: 'Referral Sources',
              subtext: 'Nightingale Rose Diagram',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              x : 'center',
              y : 'bottom',
              data:['newspaper','tv','searchEngine','directlyVisit','videoAds','emailAds','friends','others']
          },
          toolbox: {
              show : true,
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                      show: true,
                      type: ['pie', 'funnel']
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          calculable : true,
          series : [
              {
                  name:'Radius Mode',
                  type:'pie',
                  radius : [20, 110],
                  center : ['25%', '50%'],
                  roseType : 'radius',
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  lableLine: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  data:[
                      {value:10, name:'newspaper'},
                      {value:5, name:'tv'},
                      {value:15, name:'searchEngine'},
                      {value:25, name:'directlyVisit'},
                      {value:20, name:'videoAds'},
                      {value:35, name:'emailAds'},
                      {value:30, name:'friends'},
                      {value:40, name:'others'}
                  ]
              },
              {
                  name:'Area Mode',
                  type:'pie',
                  radius : [30, 110],
                  center : ['75%', '50%'],
                  roseType : 'area',
                  data:[
                      {value:10, name:'newspaper'},
                      {value:5, name:'tv'},
                      {value:15, name:'searchEngine'},
                      {value:25, name:'directlyVisit'},
                      {value:20, name:'videoAds'},
                      {value:35, name:'emailAds'},
                      {value:30, name:'friends'},
                      {value:40, name:'others'}
                  ]
              }
          ]
      },
      width: 2,
      fill: false,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      gradientDirection: 'top',
      gradients

    }
  },
  methods:{
    initData(){
      this.api.get("admin/referralSourceAggregation").then(data =>{
        let tempData = [];
        for(let key in data.data){
          let referralSource = new Object();
          referralSource.name = key
          referralSource.value = data.data[key];
          tempData.push(referralSource);
        }
        for(let key in this.referralSource.series){
          this.referralSource.series[key].data = tempData;
        }
      });
      this.api.get("admin/hostLoginRecordGroupByMonth").then(data => {
        let tempHostActiveness = [];
        for(let key in data.data){
          tempHostActiveness.push(data.data[key]);
        }
        let lenghtOfArray = tempHostActiveness.length;
        if(lenghtOfArray<12){
          for(let i=0;i<12-lenghtOfArray;i++){
            tempHostActiveness.unshift(0);
          }
        }
        this.hostActiveness = tempHostActiveness;
      });
      this.api.get("admin/renterLoginRecordGroupByMonth").then(data =>{
        let tempRenterActiveness = [];
        for(let key in data.data){
          tempRenterActiveness.push(data.data[key]);
        }
        let lenghtOfArray = tempRenterActiveness.length;
        if(lenghtOfArray<12){
          for(let i=0;i<12-lenghtOfArray;i++){
            tempRenterActiveness.unshift(0);
          }
        }
        this.renterActiveness = tempRenterActiveness;
      });
      this.api.get("admin/hostAggregatedData").then(data=>{
        for( let key in this.hostData){
          this.hostData[key] = data.data[key];  
        }
      });
      this.api.get("admin/renterAggregatedData").then(data=>{
        for( let key in this.renterData){
          this.renterData[key] = data.data[key];  
        }
      });
    },
    routerToHostManagement(){
      router.push({
        path:"hostManagement",
      });
    },
    routerToRenterManagement(){
      router.push({
        path:"renterManagement",
      });
    }
  },

  created(){
    this.initData();
  },
}

  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea']
  ]


</script>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
