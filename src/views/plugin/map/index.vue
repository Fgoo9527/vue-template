<template>
  <div id="container" />
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { defineComponent, onMounted } from 'vue'
import { notification } from 'ant-design-vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      AMapLoader.load({
        'key': '0a8a58ce6e3776f3c9dbd69d962a7acf', // 申请好的Web端开发者Key，首次调用 load 时必填
        'version': '2.0' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      // 'plugins': [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        const map = new AMap.Map('container', {
          resizeEnable: true, // 是否监控地图容器尺寸变化
          zoom: 12 // 初始化地图层级
        // center: [116.397428, 39.90923] // 初始化地图中心点
        })
        // 精确定位
        AMap.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 5000,
            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new AMap.Pixel(10, 20),
            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true,
            //  定位按钮的排放位置,  RB表示右下
            buttonPosition: 'RB'
          })

          geolocation.getCurrentPosition(function(status, result) {
            if (status === 'complete') {
              onComplete(result)
            } else {
              onError(result)
            }
          })

          function onComplete(data) {
          // data是具体的定位信息
          // console.log(data)
            map.setZoomAndCenter(20, [data.position.pos.lng, data.position.pos.lat])
          }

          function onError(data) {
          // 定位出错
          // console.log(data)
          }
        })
        // 定位城市
        AMap.plugin('AMap.CitySearch', function() {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            // console.log(result)
            // 天气插件
              AMap.plugin('AMap.Weather', function() {
              // 创建天气查询实例
                var weather = new AMap.Weather()
                // 执行实时天气信息查询
                weather.getLive(result.city, function(err, data) {
                  console.log(err, data)
                  notification.open({
                    message: `${result.city}今日天气预报`,
                    duration: 10,
                    style: {
                      top: '100px'
                    },
                    description: `今日天气${data.weather},温度:${data.temperature},风向${data.windDirection},风力大小为${data.windPower}`
                  })
                })
              })
            }
          })
        })
      }).catch(e => {
        console.log(e)
      })
    })
    return {}
  }
})
</script>

<style lang='less' scoped>
::v-deep.ant-notification{
  top: 100px;
}
#container{
  width: 100%;
  height: calc(100vh - 120px);
}
</style>
