<template>
  <div><el-button @click="addstrategy">新增自动交易产品</el-button></div>
  <el-dialog
      v-model="dialogVisible"
  >
    <el-autocomplete
        v-model="additem.instid"
        :fetch-suggestions="filterproduct"
        clearable
        placeholder="要自动交易的产品"
        @select="handleSelectinstId"
    />
    <div>
      <span>开单仓位：</span><el-input-number v-model="additem.positionrat" :min="5" :max="100"  />
      <span>开多杠杆：</span><el-input-number v-model="additem.longleverage" :min="1" :max="100"  />
      <span>开空杠杆：</span><el-input-number v-model="additem.shortleverage" :min="1" :max="100"  />

    </div>

    <div>
      <div>止损策略：</div>
      <div v-for="(obj,index) of additem.stoploss" :key="index">
        <div><span>亏损</span><el-input-number v-model="obj.withdrawal" :min="1" :max="100"  /><span>卖出</span><el-input-number v-model="obj.percent" :min="1" :max="100"  /></div>
      </div>
      <div><el-button @click="addstoploss">新增止损规则</el-button></div>
      <div>止赢策略：</div>
      <div v-for="(obj,index) of additem.stopwin" :key="index">
        <div><span>回撤</span><el-input-number v-model="obj.withdrawal" :min="1" :max="100"  /><span>卖出</span><el-input-number v-model="obj.percent" :min="1" :max="100"  /></div>
      </div>
      <div><el-button @click="addstopwin">新增止赢规则</el-button></div>
    </div>




    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitstrategy"
        >确定</el-button
        >
      </span>
  </template>
  </el-dialog>


  <div v-for="(item,index) in strategies" :key="index">
    <div>
      <span>{{item.instid}}</span>  <span><span>开多</span>{{item.longleverage}}</span>  <span><span>开空</span>{{item.shortleverage}}</span>
    </div>
    <div>
      <div>止损策略：</div>
      <div v-for="(obj,index) of item.stoploss" :key="index">
        <div>损失{{obj.withdrawal}}卖出{{obj.percent}}</div>
      </div>
    </div>

    <div>
      <div>止盈策略：</div>
      <div v-for="(obj,index) of item.stopwin" :key="index">
        <div>回撤{{obj.withdrawal}}卖出{{obj.percent}}</div>
      </div>
    </div>

  </div>

</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import request from "@/request";
import {ElMessage} from "element-plus";
const dialogVisible=ref(false)
const allproducts=ref([])
const strategies=reactive({})
const additem=reactive({instid:null,stoploss:[],stopwin:[],enablepress:false,pressstrategy:{},longleverage:3,shortleverage:3,positionrat:20,ctval:0.1})
const filterproduct=(keyword,cb)=>{
  const results = keyword
      ? allproducts.value.filter(item=>{return item.instId.toLowerCase().startsWith(keyword.toLowerCase())})
      : allproducts.value
  // call callback function to return suggestions
  cb(results)
}
const addstoploss=()=>{
  let tmp=additem.stoploss.length ? additem.stoploss[additem.stoploss.length-1] : {withdrawal:3,percent:15}
  additem.stoploss.push({withdrawal:tmp.withdrawal+2,percent:tmp.percent+10})
}
const addstopwin=()=>{
  let tmp=additem.stopwin.length ? additem.stopwin[additem.stopwin.length-1] : {withdrawal:5,percent:15}
  additem.stopwin.push({withdrawal:tmp.withdrawal+2,percent:tmp.percent+10})
}
const submitstrategy=()=>{
  dialogVisible.value = false
  request.request({method:'post',data:additem}).then(ret=>{
    if(ret.status==0){
      ElMessage.success("添加策略成功")
    }
  })
}
const handleSelectinstId=(item)=>{

  additem.ctval=parseFloat(item.ctVal)
}
onMounted(()=>{

  request.request({method:'get',url:"/api/getallswapproducts"}).then(ret=>{
    ret.data.forEach(item=>{
      item.value=item.instId
    })
    allproducts.value=ret.data
 })
  request.request({method:'get',url:'/api/getstrategies'}).then(ret=>{
    Object.assign(strategies,ret.data)
    console.log('strategies:',strategies)
  })
})
const addstrategy=()=>{
  dialogVisible.value=true
}
</script>
