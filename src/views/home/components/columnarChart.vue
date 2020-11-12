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
import { computed, h } from 'vue'
import { createComponent } from 'echarts-for-vue'
import { defineComponent, ref, watch } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { useStore } from 'vuex'
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
  setup() {
    const store = useStore()
    const mainColor = computed(() => store.state.settings.themeColor)
    const secColor = computed(
      () =>
        `#${store.state.settings.themeColor
          .split('#')[1]
          .split('')
          .reverse()
          .join('')}`
    )
    watch(
      () => store.state.settings.themeColor,
      (color) => {
        option.value = {
          grid: {
            left: '2%',
            right: '2%',
            bottom: '0%',
            top: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月'
              ],
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgb(183, 188, 189)',
                  width: 1,
                  type: 'solid'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: 'rgb(183, 188, 189)'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false,
                lineStyle: {
                  color: 'rgb(183, 188, 189)',
                  width: 1,
                  type: 'solid'
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: 'rgb(245, 247, 249)'
                }
              }
            }
          ],
          series: [
            {
              type: 'bar',
              data: [
                15220,
                11050,
                11180,
                11158,
                11183,
                1168,
                1517,
                1180,
                11142,
                11166,
                3413,
                5413
              ],
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: color
                    },
                    {
                      offset: 1,
                      color: `#${color
                        .split('#')[1]
                        .split('')
                        .reverse()
                        .join('')}`
                    }
                  ]),
                  opacity: 1
                }
              }
            }
          ]
        }
      }
    )
    const option = ref({
      grid: {
        left: '2%',
        right: '2%',
        bottom: '0%',
        top: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgb(183, 188, 189)',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgb(183, 188, 189)'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgb(183, 188, 189)',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgb(245, 247, 249)'
            }
          }
        }
      ],
      series: [
        {
          type: 'bar',
          data: [
            15220,
            11050,
            11180,
            11158,
            11183,
            1168,
            1517,
            1180,
            11142,
            11166,
            3413,
            5413
          ],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: mainColor
                },
                {
                  offset: 1,
                  color: secColor
                }
              ]),
              opacity: 1
            }
          }
        }
      ]
    })
    return {
      option
    }
  }
})
</script>
