<template>
  <ECharts
    ref="chart"
    :option="option"
    :id="id"
    :class="className"
    :style="{ height: height }"
  ></ECharts>
</template>
<script>
import echarts from 'echarts'
import { h } from 'vue'
import { createComponent } from 'echarts-for-vue'
import { defineComponent, ref } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  components: {
    ECharts: createComponent({ echarts, h, ResizeObserver })
  },
  setup(props) {
    const hexToRgba = (hex, opacity) => {
      let rgbaColor = ''
      const reg = /^#[\da-f]{6}$/i
      if (reg.test(hex)) {
        rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt(
          '0x' + hex.slice(3, 5)
        )},${parseInt('0x' + hex.slice(5, 7))},${opacity})`
      }
      return rgbaColor
    }
    const option = ref({
      grid: {
        left: '2%',
        right: '2%',
        bottom: '0%',
        top: '0%',
        containLabel: false
      },
      legend: {
        show: false
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: '#ffffff',
            shadowColor: 'rgba(225,225,225,1)',
            shadowBlur: 5
          }
        }
      },
      xAxis: [
        {
          type: 'category',
          show: false,
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#D9D9D9'
            }
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false,
          axisLabel: {
            textStyle: {
              color: '#666'
            }
          },
          nameTextStyle: {
            color: '#666',
            fontSize: 12,
            lineHeight: 40
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#E9E9E9'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '2018',
          type: 'line',
          smooth: true,
          symbolSize: 8,
          zlevel: 3,
          lineStyle: {
            normal: {
              color: '#0090FF',
              shadowBlur: 3,
              shadowColor: hexToRgba('#0090FF', 0.5),
              shadowOffsetY: 8
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: hexToRgba('#0090FF', 0.3)
                  },
                  {
                    offset: 1,
                    color: hexToRgba('#0090FF', 0.1)
                  }
                ],
                false
              ),
              shadowColor: hexToRgba('#0090FF', 0.1),
              shadowBlur: 10
            }
          },
          data: ['132', '24', '42', '51', '22', '51', '32']
        }
      ]
    })
    return {
      option
    }
  }
})
</script>
<style lang="less" scoped>
</style>
