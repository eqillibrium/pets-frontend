<template>
  <div class="row content-center justify-center q-pa-md">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        filled
        label="Ориентировочный адрес *"
        hint="Например, г. Сочи, ул. Горькова, д. 22"
        lazy-rules
        v-model="newApp.address"
        :rules="[ val => val && val.length > 0 || 'Пожалуйста, укажите адрес']"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="showMap = !showMap"/>
        </template>
      </q-input>

      <q-input
        filled
        label="Что требуется сделать *"
        hint="Например, отвезти котика к ветеринару"
        lazy-rules
        v-model="newApp.description"
        :rules="[
          val => val && val.length > 0 && val.length < 100 || 'Укажите, что требуется сделать  '
        ]"
      />

      <q-input
        filled
        type="number"
        label="Вознаграждение исполнителю *"
        hint="Например, 1000"
        lazy-rules
        v-model="newApp.price"
        :rules="[ val => val && val > 0 || 'Пожалуйста, предложите хоть что-то']"
      />

      <div>
        <q-btn label="Создать" type="submit" color="primary"/>
        <q-btn label="Очистить поля" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <q-dialog v-model="showMap">
      <div class="col-9">
        <yandex-map
          style="width: 600px; height: 600px"
          ymap-class="map-box"
          :coords="coords"
          :zoom="11"
          :controls="controls"
          :scroll-zoom="scrollZoom"
          :settings="settings"
          :draggable="true"
          @map-was-initialized="initHandlers"
          @click="info"
        >
          <ymap-marker
            v-for="marker in getMarkers"
            :key="marker.id"
            marker-type="placemark"
            :coords="marker.coords"
            :markerId="marker.id"
            :balloon="{header: 'header', body: 'body', footer: 'footer'}"
            :icon="{color: 'green', glyph: 'cinema'}"
            @click="getAddress"
          />
        </yandex-map>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { Message } from '@/utils/Message'

export default {
  components: { yandexMap, ymapMarker },
  setup () {
    const store = useStore()
    const settings = {
      apiKey: 'bfdec8dc-bae1-4841-b07f-64fbc8c9c2c9',
      lang: 'ru_RU',
      coordorder: 'latlong',
      enterprise: false,
      version: '2.1'
    }
    const apps = computed(() => store.getters['apps/apps'])
    const markers = ref([])
    const getMarkers = computed(() => markers.value)
    const coords = ref([56.01, 92.86])
    const properties = ref({})
    const options = ref({})
    const clusterName = ref('1')
    const controls = ref(['fullscreenControl', 'searchControl', 'zoomControl'])
    const scrollZoom = ref(true)

    const newApp = reactive({
      address: 'г. Сочи, ул. Горькова, д. 22',
      description: 'отвезти котика к ветеринару',
      price: 1000
    })

    onBeforeMount(async () => {
      try {
        await store.dispatch('apps/getApps')
      } catch (e) {
      }
    })

    return {
      coords,
      properties,
      options,
      clusterName,
      controls,
      scrollZoom,
      settings,
      getMarkers,
      showMap: ref(false),
      info: () => console.log(markers.value),
      initHandlers: async (e) => {
        // markers.value = apps.value.map(e => {
        //   return {
        //     id: Math.random() * 1000,
        //     coords: e.address
        //   }
        // })
        for (const e of apps.value) {
          try {
            const str1 = e.address.replaceAll(',', '')
            const str2 = str1.replaceAll(' ', '+')
            const { data } = await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=bfdec8dc-bae1-4841-b07f-64fbc8c9c2c9&sco=latlong&geocode=${str2}`)
            // console.log(data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos)
            const coords = ((data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos).split(' ')).map(e => Number(e))
            const reverseCoords = [coords[0], coords[1]] = [coords[1], coords[0]]
            getMarkers.value.push({ id: Math.random() * 1000, coords: reverseCoords })
          } catch (e) {
            console.log(e)
          }
        }
        e.events.add('click', async (e) => {
          getMarkers.value.push({ id: Math.random() * 1000, coords: e.get('coords') })
          const coords = e.get('coords')
          const string = coords.map(e => e.toFixed(6)).join(',')
          console.log(string)
          try {
            const { data } = await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=bfdec8dc-bae1-4841-b07f-64fbc8c9c2c9&sco=latlong&geocode=${string}`)
            newApp.address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted
          } catch (e) {
            console.log(e)
          }
        })
      },
      getAddress: async (e) => {
        const coords = e.get('coords').join(',')
        console.log(coords)
        try {
          const { data } = await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=bfdec8dc-bae1-4841-b07f-64fbc8c9c2c9&sco=latlong&geocode=${coords}`)
          console.log(data)
        } catch (e) {
          console.log(e)
        }
      },
      newApp,
      onSubmit: async () => {
        try {
          await store.dispatch('apps/createApp', newApp)
          Message.success('Заявка была успешно создана!')
        } catch (e) {

        }
      },
      onReset: () => {
        console.log(newApp)
      }
    }
  }
}
</script>

<style>
.map-box {
  width: 100%;
  height: 600px;
}
</style>
